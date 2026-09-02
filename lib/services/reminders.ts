import { createClient } from "@/lib/supabase/server";
import type { Reminder } from "@/lib/types";

function mapReminderStatus(
  reminderDate: string,
  dbStatus: string
): Reminder["status"] {
  if (dbStatus === "completed") return "completed";

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const date = new Date(reminderDate);
  date.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "today";
  return "upcoming";
}

export async function getReminders(): Promise<Reminder[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: reminders } = await supabase
    .from("reminders")
    .select("id, title, reminder_date, type, status, record_id")
    .eq("user_id", user.id)
    .order("reminder_date", { ascending: true });

  if (!reminders) return [];

  return reminders.map((r) => ({
    id: r.id,
    title: r.title,
    date: r.reminder_date,
    status: mapReminderStatus(r.reminder_date, r.status),
    type: r.type as Reminder["type"],
    sourceDocumentId: r.record_id || undefined,
  }));
}

export async function getUpcomingReminders(limit: number = 4): Promise<Reminder[]> {
  const all = await getReminders();
  return all
    .filter((r) => r.status !== "completed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}
