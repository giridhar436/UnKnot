import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Verify ownership
    const { data: record, error } = await supabase
      .from("records")
      .select("id")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !record) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Record not found" } },
        { status: 404 }
      );
    }

    // Get associated files for Cloudinary cleanup
    const { data: files } = await supabase
      .from("files")
      .select("cloudinary_public_id")
      .eq("record_id", id)
      .eq("user_id", user.id);

    // Delete from Cloudinary
    if (files) {
      for (const file of files) {
        try {
          await deleteFromCloudinary(file.cloudinary_public_id);
        } catch {
          // Non-fatal: continue even if Cloudinary delete fails
          console.warn(`Failed to delete Cloudinary file: ${file.cloudinary_public_id}`);
        }
      }
    }

    // Delete record (cascades to files, extracted_data, relationships, reminders)
    const { error: deleteError } = await supabase
      .from("records")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      return NextResponse.json(
        { success: false, error: { code: "DB_ERROR", message: "Failed to delete record" } },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete record error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to delete record" },
      },
      { status: 500 }
    );
  }
}
