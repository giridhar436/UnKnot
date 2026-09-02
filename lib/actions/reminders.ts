"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateReminderStatus(
  reminderId: string,
  status: "upcoming" | "today" | "overdue" | "completed"
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  // Verify ownership
  const { data: reminder, error: fetchError } = await supabase
    .from("reminders")
    .select("id")
    .eq("id", reminderId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !reminder) {
    return { success: false, error: "Reminder not found" };
  }

  const { error } = await supabase
    .from("reminders")
    .update({ status })
    .eq("id", reminderId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/reminders");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteReminder(
  reminderId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  const { error } = await supabase
    .from("reminders")
    .delete()
    .eq("id", reminderId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/reminders");
  revalidatePath("/dashboard");
  return { success: true };
}
