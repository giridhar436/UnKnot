import { createClient } from "@/lib/supabase/server";
import type { Analysis, Evidence } from "@/lib/types";

/**
 * Context Engine — retrieves relevant user data and sends it to Fireworks AI
 * for grounded, evidence-based answers.
 */

const CONTEXT_ENGINE_MODEL = "accounts/fireworks/models/glm-5p3-flash";

const CONTEXT_SYSTEM_PROMPT = `You are UnKnot, a personal information and decision-support assistant.

You answer questions based ONLY on the user's stored records and documents provided in the context below.

CRITICAL RULES:
1. NEVER fabricate information. If data is not in the context, say it is not available.
2. NEVER invent purchases, amounts, dates, warranties, investments, or bills.
3. Distinguish between: Known (from records), Unknown (not in records), Inferred (logically derived from records).
4. Investments are NOT expenses. If the user has investments, acknowledge them as assets, not spending.
5. When providing financial information, clearly separate expenses from investments.
6. Always cite which records your answer is based on.
7. If information conflicts between records, flag the conflict.
8. For medical/financial decisions, recommend professional advice where appropriate.

Response format:
- Start with a direct answer to the question
- List the evidence/supporting records
- Note any unknowns or missing information
- Suggest next steps if applicable

Keep answers concise and practical.`;

export async function askContextEngine(
  userId: string,
  question: string
): Promise<Analysis> {
  const supabase = await createClient();

  console.log("[ContextEngine] Question received:", question);

  // Step 1: Get user's records for context
  const { data: records, error: recordsError } = await supabase
    .from("records")
    .select(
      `
      id,
      title,
      category,
      record_type,
      document_date,
      metadata,
      extracted_data(
        merchant,
        product,
        amount,
        currency,
        invoice_number,
        warranty_expiry,
        investment_type,
        is_investment,
        entities
      )
    `
    )
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("document_date", { ascending: false })
    .limit(50);

  if (recordsError) {
    console.error("[ContextEngine] Supabase records query error:", recordsError);
    throw new Error(`Failed to retrieve records: ${recordsError.message}`);
  }

  // Step 2: Build context from records
  const contextRecords = records || [];
  console.log(
    `[ContextEngine] Retrieved ${contextRecords.length} record(s):`,
    contextRecords.map((r) => `${r.id.slice(0, 8)}… "${r.title}"`)
  );

  let contextText = "USER'S STORED RECORDS:\n\n";

  if (contextRecords.length === 0) {
    contextText += "No records found in the user's account.\n";
  } else {
    for (const record of contextRecords) {
      const extracted = Array.isArray(record.extracted_data)
        ? record.extracted_data[0]
        : record.extracted_data;

      contextText += `--- Record: ${record.title} ---\n`;
      contextText += `Category: ${record.category}\n`;
      contextText += `Type: ${record.record_type}\n`;
      contextText += `Date: ${record.document_date || "Unknown"}\n`;

      if (extracted) {
        if (extracted.merchant)
          contextText += `Merchant: ${extracted.merchant}\n`;
        if (extracted.product)
          contextText += `Product: ${extracted.product}\n`;
        if (extracted.amount)
          contextText += `Amount: ${extracted.currency || "INR"} ${extracted.amount}\n`;
        if (extracted.invoice_number)
          contextText += `Invoice: ${extracted.invoice_number}\n`;
        if (extracted.warranty_expiry)
          contextText += `Warranty Expiry: ${extracted.warranty_expiry}\n`;
        if (extracted.investment_type)
          contextText += `Investment Type: ${extracted.investment_type}\n`;
        if (extracted.is_investment)
          contextText += `** This is an INVESTMENT (not an expense) **\n`;
      }
      contextText += "\n";
    }
  }

  // Step 3: Get relationships for context
  const { data: relationships, error: relError } = await supabase
    .from("relationships")
    .select("relationship_type, from_record_id, to_record_id")
    .eq("user_id", userId)
    .limit(20);

  if (relError) {
    console.warn("[ContextEngine] Relationships query error (non-fatal):", relError);
  }

  if (relationships && relationships.length > 0) {
    // Fetch titles for related records
    const recordIds = [
      ...new Set(relationships.flatMap((r) => [r.from_record_id, r.to_record_id])),
    ];
    const { data: relatedRecords } = await supabase
      .from("records")
      .select("id, title")
      .in("id", recordIds)
      .eq("user_id", userId);

    const titleMap = new Map(
      (relatedRecords || []).map((r) => [r.id, r.title])
    );

    contextText += "\nRELATED RECORDS:\n";
    for (const rel of relationships) {
      const fromTitle = titleMap.get(rel.from_record_id) || "Unknown";
      const toTitle = titleMap.get(rel.to_record_id) || "Unknown";
      contextText += `${fromTitle} → ${toTitle} (${rel.relationship_type})\n`;
    }
  }

  // Step 4: Send to Fireworks AI
  const apiKey = process.env.FIREWORKS_API_KEY;
  if (!apiKey) {
    throw new Error("FIREWORKS_API_KEY is not configured");
  }

  console.log(`[ContextEngine] Calling Fireworks model: ${CONTEXT_ENGINE_MODEL}`);

  const response = await fetch(
    "https://api.fireworks.ai/inference/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CONTEXT_ENGINE_MODEL,
        messages: [
          { role: "system", content: CONTEXT_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Context:\n${contextText}\n\nUser Question: ${question}`,
          },
        ],
        max_tokens: 2048,
        temperature: 0.3,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `[ContextEngine] Fireworks HTTP ${response.status}:`,
      errorBody
    );
    throw new Error(
      `Fireworks AI returned HTTP ${response.status}: ${errorBody}`
    );
  }

  const data = await response.json();
  console.log("[ContextEngine] Fireworks response received successfully");

  const answer =
    data.choices?.[0]?.message?.content?.trim() ||
    "I could not generate an answer at this time.";

  // Step 5: Build evidence list from context records
  const evidence: Evidence[] = contextRecords.slice(0, 10).map((r) => {
    const extracted = Array.isArray(r.extracted_data)
      ? r.extracted_data[0]
      : r.extracted_data;

    let detail = `Category: ${r.category}`;
    if (extracted?.amount) detail += `, Amount: ${extracted.currency || "INR"} ${extracted.amount}`;
    if (r.document_date) detail += `, Date: ${r.document_date}`;

    return {
      id: r.id,
      type: r.record_type,
      title: r.title,
      documentId: r.id,
      detail,
    };
  });

  // Step 6: Store analysis
  const { error: insertError } = await supabase.from("analyses").insert({
    user_id: userId,
    question,
    answer,
    evidence: evidence.map((e) => ({
      id: e.id,
      type: e.type,
      title: e.title,
      detail: e.detail,
    })),
    source_record_ids: contextRecords.slice(0, 10).map((r) => r.id),
  });

  if (insertError) {
    console.error(
      "[ContextEngine] Failed to store analysis (non-fatal):",
      insertError
    );
    // Don't throw — the answer is still valid even if storage failed
  } else {
    console.log("[ContextEngine] Analysis stored successfully");
  }

  return {
    id: `analysis-${Date.now()}`,
    question,
    answer,
    evidence,
    suggestedAction: evidence.length > 0 ? "View related documents" : undefined,
  };
}
