import { createClient } from "@/lib/supabase/server";

/**
 * Relationship engine.
 * Creates rule-based relationships between records based on extracted metadata.
 */

export async function createRelationships(
  userId: string,
  recordId: string,
  recordType: string,
  product: string | null,
  merchant: string | null
): Promise<void> {
  const supabase = await createClient();

  if (!product && !merchant) return;

  // Find existing records that might be related
  const { data: existingRecords } = await supabase
    .from("records")
    .select(
      `
      id,
      record_type,
      category,
      extracted_data!inner(
        product,
        merchant
      )
    `
    )
    .eq("user_id", userId)
    .neq("id", recordId);

  if (!existingRecords || existingRecords.length === 0) return;

  const relationships: {
    user_id: string;
    from_record_id: string;
    to_record_id: string;
    relationship_type: string;
  }[] = [];

  for (const existing of existingRecords) {
    const extracted = Array.isArray(existing.extracted_data)
      ? existing.extracted_data[0]
      : existing.extracted_data;

    if (!extracted) continue;

    const productMatch =
      product &&
      extracted.product &&
      fuzzyMatch(product, extracted.product);

    const merchantMatch =
      merchant &&
      extracted.merchant &&
      fuzzyMatch(merchant, extracted.merchant);

    if (!productMatch && !merchantMatch) continue;

    // Rule: Purchase → Warranty
    if (recordType === "purchase" && existing.record_type === "warranty") {
      relationships.push({
        user_id: userId,
        from_record_id: recordId,
        to_record_id: existing.id,
        relationship_type: "purchase_warranty",
      });
    }

    // Rule: Warranty → Purchase (reverse)
    if (recordType === "warranty" && existing.record_type === "purchase") {
      relationships.push({
        user_id: userId,
        from_record_id: recordId,
        to_record_id: existing.id,
        relationship_type: "purchase_warranty",
      });
    }

    // Rule: Purchase → Repair
    if (recordType === "purchase" && existing.record_type === "repair") {
      relationships.push({
        user_id: userId,
        from_record_id: recordId,
        to_record_id: existing.id,
        relationship_type: "purchase_repair",
      });
    }

    // Rule: Repair → Purchase
    if (recordType === "repair" && existing.record_type === "purchase") {
      relationships.push({
        user_id: userId,
        from_record_id: recordId,
        to_record_id: existing.id,
        relationship_type: "purchase_repair",
      });
    }

    // Rule: Bill → Payment
    if (recordType === "bill" && existing.record_type === "payment") {
      relationships.push({
        user_id: userId,
        from_record_id: recordId,
        to_record_id: existing.id,
        relationship_type: "bill_payment",
      });
    }

    // Rule: Investment → Investment Statement
    if (
      recordType === "investment" &&
      existing.category === "Investments"
    ) {
      relationships.push({
        user_id: userId,
        from_record_id: recordId,
        to_record_id: existing.id,
        relationship_type: "investment_statement",
      });
    }

    // Rule: Generic related (same product, no specific rule)
    if (productMatch && relationships.length === 0) {
      relationships.push({
        user_id: userId,
        from_record_id: recordId,
        to_record_id: existing.id,
        relationship_type: "related",
      });
    }
  }

  // Insert relationships (ignore duplicates via unique constraint)
  for (const rel of relationships) {
    await supabase.from("relationships").insert(rel);
  }
}

function fuzzyMatch(a: string, b: string): boolean {
  const normA = a.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  const normB = b.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

  if (normA === normB) return true;
  if (normA.includes(normB) || normB.includes(normA)) return true;

  // Simple word overlap check
  const wordsA = new Set(normA.split(/\s+/));
  const wordsB = new Set(normB.split(/\s+/));
  let overlap = 0;
  for (const w of wordsA) {
    if (w.length > 2 && wordsB.has(w)) overlap++;
  }
  return overlap >= 1;
}
