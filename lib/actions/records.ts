"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function renameRecord(
  recordId: string,
  newTitle: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  if (!newTitle.trim()) {
    return { success: false, error: "Title cannot be empty" };
  }

  // Verify ownership
  const { data: record, error: fetchError } = await supabase
    .from("records")
    .select("id")
    .eq("id", recordId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !record) {
    return { success: false, error: "Record not found" };
  }

  const { error } = await supabase
    .from("records")
    .update({ title: newTitle.trim(), updated_at: new Date().toISOString() })
    .eq("id", recordId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/documents");
  revalidatePath("/dashboard");
  revalidatePath("/categories");
  revalidatePath(`/documents/${recordId}`);
  return { success: true };
}

export async function deleteRecord(
  recordId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  // Verify ownership and get file info
  const { data: record, error: fetchError } = await supabase
    .from("records")
    .select("id")
    .eq("id", recordId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !record) {
    return { success: false, error: "Record not found" };
  }

  // Get associated files for Cloudinary cleanup
  const { data: files } = await supabase
    .from("files")
    .select("cloudinary_public_id")
    .eq("record_id", recordId)
    .eq("user_id", user.id);

  // Delete from Cloudinary
  if (files && files.length > 0) {
    const { deleteFromCloudinary } = await import("@/lib/cloudinary");
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
  const { error } = await supabase
    .from("records")
    .delete()
    .eq("id", recordId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/documents");
  revalidatePath("/dashboard");
  revalidatePath("/categories");
  revalidatePath("/finance");
  revalidatePath("/reminders");
  return { success: true };
}
