import { Reminder } from "@/lib/types";
import { mockReminders } from "@/lib/mock-data/reminders";

/**
 * Get all reminders
 */
export async function getReminders(): Promise<Reminder[]> {
  return [...mockReminders].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/**
 * Get upcoming reminders (for dashboard / alerts)
 */
export async function getUpcomingReminders(limit: number = 4): Promise<Reminder[]> {
  const active = mockReminders.filter((r) => r.status !== "completed");
  return active
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}
