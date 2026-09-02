import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { processRecord } from "@/lib/services/processing";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const textContent = formData.get("text") as string | null;
    const title = formData.get("title") as string | null;

    // Text input mode
    if (textContent && textContent.trim()) {
      // Create record
      const { data: record, error: recordError } = await supabase
        .from("records")
        .insert({
          user_id: user.id,
          title: title || "Text Record",
          source_type: "text",
          status: "uploaded",
          record_type: "other",
          category: "Other",
        })
        .select()
        .single();

      if (recordError || !record) {
        return NextResponse.json(
          { success: false, error: { code: "DB_ERROR", message: "Failed to create record" } },
          { status: 500 }
        );
      }

      // Process text (no file upload needed)
      const result = await processRecord({
        recordId: record.id,
        userId: user.id,
        sourceType: "text",
        textContent: textContent.trim(),
      });

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            recordId: record.id,
            error: { code: "PROCESSING_FAILED", message: result.error },
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        recordId: record.id,
        status: "completed",
        extracted: result.extracted,
      });
    }

    // File upload mode
    if (!file) {
      return NextResponse.json(
        { success: false, error: { code: "NO_FILE", message: "No file provided" } },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_TYPE",
            message: `File type ${file.type} not supported. Allowed: PDF, JPG, PNG, WEBP`,
          },
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "FILE_TOO_LARGE",
            message: "File exceeds 10MB limit",
          },
        },
        { status: 400 }
      );
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Determine source type
    const sourceType: "pdf" | "image" = file.type === "application/pdf" ? "pdf" : "image";

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(fileBuffer, {
      folder: "unknot",
      resourceType: sourceType === "pdf" ? "raw" : "image",
      originalFilename: file.name,
    });

    // Create record
    const { data: record, error: recordError } = await supabase
      .from("records")
      .insert({
        user_id: user.id,
        title: title || file.name || "Uploaded Document",
        source_type: sourceType,
        status: "uploaded",
        record_type: "other",
        category: "Other",
      })
      .select()
      .single();

    if (recordError || !record) {
      return NextResponse.json(
        { success: false, error: { code: "DB_ERROR", message: "Failed to create record" } },
        { status: 500 }
      );
    }

    // Create file record
    await supabase.from("files").insert({
      user_id: user.id,
      record_id: record.id,
      cloudinary_public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      resource_type: uploadResult.resource_type,
      format: uploadResult.format,
      original_filename: uploadResult.original_filename,
      file_size: uploadResult.bytes,
      mime_type: file.type,
    });

    // Process the record
    const result = await processRecord({
      recordId: record.id,
      userId: user.id,
      sourceType,
      fileUrl: uploadResult.secure_url,
      fileBuffer: sourceType === "pdf" ? fileBuffer : undefined,
    });

    if (!result.success) {
      return NextResponse.json({
        success: true,
        recordId: record.id,
        status: "needs_review",
        warning: result.error,
      });
    }

    return NextResponse.json({
      success: true,
      recordId: record.id,
      status: "completed",
      extracted: result.extracted,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        },
      },
      { status: 500 }
    );
  }
}
