import { createClient } from "@/lib/supabase/server";

/**
 * Duplicate detection service.
 * Uses document metadata (date, merchant, amount, invoice number, product)
 * rather than upload timestamps.
 */

export interface DuplicateCheckInput {
  userId: string;
  documentDate: string | null;
  merchant: string | null;
  product: string | null;
  amount: number | null;
  invoiceNumber: string | null;
}

export interface DuplicateResult {
  status: "none" | "possible" | "high_confidence";
  matchedRecordId?: string;
  score: number;
}

export async function checkDuplicates(
  input: DuplicateCheckInput
): Promise<DuplicateResult> {
  const supabase = await createClient();

  // Get existing records for this user that have any matching signals
  const { data: existingRecords, error } = await supabase
    .from("records")
    .select(
      `
      id,
      document_date,
      metadata,
      extracted_data!inner(
        merchant,
        product,
        amount,
        invoice_number
      )
    `
    )
    .eq("user_id", input.userId)
    .neq("status", "failed");

  if (error || !existingRecords || existingRecords.length === 0) {
    return { status: "none", score: 0 };
  }

  let bestMatch: { id: string; score: number } | null = null;

  for (const record of existingRecords) {
    let score = 0;
    const extracted = Array.isArray(record.extracted_data)
      ? record.extracted_data[0]
      : record.extracted_data;

    if (!extracted) continue;

    // Document date match (strongest signal)
    if (
      input.documentDate &&
      record.document_date &&
      input.documentDate === record.document_date
    ) {
      score += 40;
    }

    // Invoice/receipt number match (very strong signal)
    if (
      input.invoiceNumber &&
      extracted.invoice_number &&
      normalizeText(input.invoiceNumber) ===
        normalizeText(extracted.invoice_number)
    ) {
      score += 50;
    }

    // Merchant match
    if (
      input.merchant &&
      extracted.merchant &&
      normalizeText(input.merchant) === normalizeText(extracted.merchant)
    ) {
      score += 20;
    }

    // Product match
    if (
      input.product &&
      extracted.product &&
      normalizeText(input.product) === normalizeText(extracted.product)
    ) {
      score += 15;
    }

    // Amount match
    if (input.amount && extracted.amount) {
      const existingAmount = Number(extracted.amount);
      if (Math.abs(input.amount - existingAmount) < 0.01) {
        score += 15;
      }
    }

    if (bestMatch === null || score > bestMatch.score) {
      bestMatch = { id: record.id, score };
    }
  }

  if (!bestMatch || bestMatch.score < 30) {
    return { status: "none", score: bestMatch?.score || 0 };
  }

  if (bestMatch.score >= 70) {
    return {
      status: "high_confidence",
      matchedRecordId: bestMatch.id,
      score: bestMatch.score,
    };
  }

  return {
    status: "possible",
    matchedRecordId: bestMatch.id,
    score: bestMatch.score,
  };
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}
