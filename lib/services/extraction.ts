import { z } from "zod";

/**
 * Fireworks AI entity extraction service.
 * Takes extracted text and returns structured data.
 */

export const extractedEntitySchema = z.object({
  category: z.enum([
    "Finance",
    "Investments",
    "Medical",
    "Warranty",
    "Purchases",
    "Repairs",
    "Documents",
    "Subscriptions",
    "Other",
  ]),
  record_type: z.enum([
    "purchase",
    "warranty",
    "repair",
    "medical",
    "bill",
    "investment",
    "document",
    "subscription",
    "income",
    "payment",
    "other",
  ]),
  subcategory: z.string().nullable().optional(),
  title: z.string(),
  merchant: z.string().nullable().optional(),
  product: z.string().nullable().optional(),
  amount: z.number().nullable().optional(),
  currency: z.string().default("INR"),
  document_date: z.string().nullable().optional(), // ISO date string
  invoice_number: z.string().nullable().optional(),
  warranty_expiry: z.string().nullable().optional(), // ISO date string
  investment_type: z.string().nullable().optional(),
  is_investment: z.boolean().default(false),
  description: z.string().nullable().optional(),
  entities: z
    .array(
      z.object({
        type: z.string(),
        label: z.string(),
        value: z.string(),
      })
    )
    .default([]),
  confidence: z.number().min(0).max(1).default(0.8),
  reminder_dates: z
    .array(
      z.object({
        title: z.string(),
        date: z.string(), // ISO date
        type: z.enum([
          "warranty_expiry",
          "bill_due",
          "subscription_renewal",
          "payment",
          "document_expiry",
          "other",
        ]),
      })
    )
    .default([]),
});

export type ExtractedEntity = z.infer<typeof extractedEntitySchema>;

const EXTRACTION_PROMPT = `You are an entity extraction engine for a personal information management system called UnKnot.

Given text extracted from a document (receipt, bill, warranty, invoice, medical record, investment statement, etc.), extract structured information.

Return a JSON object with these fields:
- category: one of ["Finance", "Investments", "Medical", "Warranty", "Purchases", "Repairs", "Documents", "Subscriptions", "Other"]
- record_type: one of ["purchase", "warranty", "repair", "medical", "bill", "investment", "document", "subscription", "income", "payment", "other"]
- subcategory: optional string for more specific classification
- title: a concise descriptive title for this record
- merchant: the merchant/provider/organization name (or null)
- product: the product/service name (or null)
- amount: numeric amount in the document's currency (or null if not found)
- currency: ISO currency code (default "INR")
- document_date: the date the document/event occurred, in YYYY-MM-DD format (or null)
- invoice_number: invoice/receipt/bill number (or null)
- warranty_expiry: warranty end date in YYYY-MM-DD format (or null)
- investment_type: type of investment like "Mutual Fund", "PPF", "Fixed Deposit", "Stocks" etc (or null)
- is_investment: true if this record represents an investment (NOT an expense)
- description: a brief description of the record
- entities: array of {type, label, value} for all important extracted data points
- confidence: 0-1 confidence score for the extraction
- reminder_dates: array of {title, date (YYYY-MM-DD), type} for important dates that should generate reminders

IMPORTANT RULES:
1. Investments are NOT expenses. If the document shows an investment (mutual fund, PPF, FD, stocks), set is_investment=true.
2. Use the DOCUMENT DATE, not today's date. If no date is found, set document_date to null.
3. Do not fabricate information. If a field is not present in the text, set it to null.
4. Parse amounts as numbers (no currency symbols or commas).
5. Dates must be in YYYY-MM-DD format.
6. Extract as many useful entities as possible for the entities array.

Return ONLY valid JSON. No markdown, no commentary.`;

export async function extractEntities(text: string): Promise<ExtractedEntity> {
  const apiKey = process.env.FIREWORKS_API_KEY;
  if (!apiKey) {
    throw new Error("FIREWORKS_API_KEY is required for entity extraction");
  }

  const response = await fetch(
    "https://api.fireworks.ai/inference/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/glm-5p3-flash",
        messages: [
          { role: "system", content: EXTRACTION_PROMPT },
          {
            role: "user",
            content: `Extract structured information from this document text:\n\n${text}`,
          },
        ],
        max_tokens: 2048,
        temperature: 0.1,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Fireworks AI extraction failed: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Fireworks AI returned empty response");
  }

  // Strip markdown code fences if present
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse Fireworks AI JSON response");
  }

  // Validate with Zod
  const result = extractedEntitySchema.safeParse(parsed);

  if (!result.success) {
    // Return a minimal valid result with low confidence rather than throwing
    console.warn("Entity extraction validation failed:", result.error.issues);
    return {
      category: "Other",
      record_type: "other",
      title: "Unprocessed Document",
      currency: "INR",
      is_investment: false,
      confidence: 0.1,
      entities: [],
      reminder_dates: [],
    };
  }

  return result.data;
}
