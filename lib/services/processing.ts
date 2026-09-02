import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { parsePdf } from "./pdf-parser";
import { extractTextFromImage } from "./ocr";
import { extractEntities, type ExtractedEntity } from "./extraction";
import { checkDuplicates } from "./duplicates";
import { createRelationships } from "./relationships";

/**
 * Main processing pipeline orchestrator.
 * Handles the full flow: extract text → entities → duplicates → store → relationships → reminders.
 */

export interface ProcessingInput {
  recordId: string;
  userId: string;
  sourceType: "pdf" | "image" | "text";
  fileUrl?: string; // Cloudinary URL for OCR
  fileBuffer?: Buffer; // For PDF parsing
  textContent?: string; // For text input
}

export interface ProcessingResult {
  success: boolean;
  extracted?: ExtractedEntity;
  error?: string;
}

export async function processRecord(
  input: ProcessingInput
): Promise<ProcessingResult> {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  try {
    // Step 1: Update status to processing
    await supabase
      .from("records")
      .update({ status: "processing" })
      .eq("id", input.recordId);

    // Step 2: Extract text based on source type
    let extractedText = "";

    if (input.sourceType === "text" && input.textContent) {
      extractedText = input.textContent;
    } else if (input.sourceType === "pdf" && input.fileBuffer) {
      const pdfResult = await parsePdf(input.fileBuffer);
      extractedText = pdfResult.text;

      // If PDF has no useful text (scanned), fall back to OCR
      if (!pdfResult.hasUsefulText && input.fileUrl) {
        extractedText = await extractTextFromImage(input.fileUrl);
      }
    } else if (input.sourceType === "image" && input.fileUrl) {
      extractedText = await extractTextFromImage(input.fileUrl);
    }

    if (!extractedText.trim()) {
      await supabase
        .from("records")
        .update({ status: "needs_review" })
        .eq("id", input.recordId);

      return {
        success: false,
        error: "Could not extract any text from the document",
      };
    }

    // Step 3: Update status to extracting
    await supabase
      .from("records")
      .update({ status: "extracting" })
      .eq("id", input.recordId);

    // Step 4: Entity extraction via Fireworks AI
    const extracted = await extractEntities(extractedText);

    // Step 5: Duplicate detection
    const duplicateResult = await checkDuplicates({
      userId: input.userId,
      documentDate: extracted.document_date || null,
      merchant: extracted.merchant || null,
      product: extracted.product || null,
      amount: extracted.amount || null,
      invoiceNumber: extracted.invoice_number || null,
    });

    // Step 6: Store extracted data
    await serviceSupabase.from("extracted_data").insert({
      record_id: input.recordId,
      user_id: input.userId,
      extracted_text: extractedText,
      entities: extracted.entities,
      amount: extracted.amount,
      currency: extracted.currency,
      merchant: extracted.merchant,
      product: extracted.product,
      invoice_number: extracted.invoice_number,
      warranty_expiry: extracted.warranty_expiry,
      investment_type: extracted.investment_type,
      is_investment: extracted.is_investment,
    });

    // Step 7: Update record with extracted information
    const recordUpdate: Record<string, unknown> = {
      title: extracted.title,
      record_type: extracted.record_type,
      category: extracted.category,
      subcategory: extracted.subcategory,
      status: "completed",
      confidence: extracted.confidence,
      duplicate_status: duplicateResult.status,
      duplicate_of: duplicateResult.matchedRecordId || null,
      document_date: extracted.document_date || null,
      metadata: {
        description: extracted.description,
        currency: extracted.currency,
      },
      updated_at: new Date().toISOString(),
    };

    await supabase
      .from("records")
      .update(recordUpdate)
      .eq("id", input.recordId);

    // Step 8: Create relationships
    await createRelationships(
      input.userId,
      input.recordId,
      extracted.record_type,
      extracted.product || null,
      extracted.merchant || null
    );

    // Step 9: Create reminders from extracted dates
    if (extracted.reminder_dates.length > 0) {
      const reminders = extracted.reminder_dates.map((rd) => ({
        user_id: input.userId,
        record_id: input.recordId,
        title: rd.title,
        reminder_date: rd.date,
        type: rd.type,
        status: "upcoming" as const,
      }));

      await serviceSupabase.from("reminders").insert(reminders);
    }

    return { success: true, extracted };
  } catch (error) {
    console.error("Processing pipeline error:", error);

    // Update record status to failed
    await supabase
      .from("records")
      .update({ status: "failed" })
      .eq("id", input.recordId);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown processing error",
    };
  }
}
