"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Reminder } from "@/lib/types";

export function NotificationBell() {
  const [reminders, setReminders] = React.useState<Reminder[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [permission, setPermission] = React.useState<NotificationPermission>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });

  React.useEffect(() => {
    // Fetch reminders
    async function fetchReminders() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("reminders")
        .select("*")
        .eq("user_id", user.id)
        .in("status", ["upcoming", "today", "overdue"])
        .order("reminder_date", { ascending: true });

      if (data) {
        setReminders(data.map(r => ({
          id: r.id,
          title: r.title,
          date: r.reminder_date,
          status: r.status as Reminder["status"],
          type: r.type as Reminder["type"],
          sourceDocumentId: r.record_id || undefined,
        })));
      }
    }

    fetchReminders();
    const interval = setInterval(fetchReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Check for due reminders and show browser notification
    if (permission === "granted" && reminders.length > 0) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const dueReminders = reminders.filter(r => {
        const reminderDate = new Date(r.date);
        reminderDate.setHours(0, 0, 0, 0);
        return reminderDate.getTime() === now.getTime() || r.status === "overdue";
      });

      dueReminders.forEach(reminder => {
        // Only show notification once per reminder per session
        const notifiedKey = `notified-${reminder.id}`;
        if (!sessionStorage.getItem(notifiedKey)) {
          new Notification("UnKnot Reminder", {
            body: reminder.title,
            icon: "/favicon.ico",
          });
          sessionStorage.setItem(notifiedKey, "true");
        }
      });
    }
  }, [reminders, permission]);

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  const dueCount = reminders.filter(r => r.status === "today" || r.status === "overdue").length;
  const upcomingCount = reminders.filter(r => r.status === "upcoming").length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#5C615E] hover:text-[#111414] hover:bg-[#F2EFEB] rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {dueCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B85D3B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {dueCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#DFDBD1] shadow-lg z-50 overflow-hidden">
            <div className="p-4 border-b border-[#DFDBD1] bg-[#FAF8F5]">
              <h3 className="text-sm font-semibold text-[#111414]">Reminders</h3>
              <p className="text-[11px] text-[#5C615E] mt-0.5">
                {dueCount} due, {upcomingCount} upcoming
              </p>
            </div>

            {permission !== "granted" && (
              <div className="p-3 bg-[#FDF1EC] border-b border-[#DFDBD1]">
                <p className="text-[11px] text-[#5C615E] mb-2">
                  Enable browser notifications to get alerted when reminders are due.
                </p>
                <button
                  onClick={requestPermission}
                  className="text-[11px] font-semibold text-[#064038] hover:underline"
                >
                  Enable Notifications
                </button>
              </div>
            )}

            <div className="max-h-96 overflow-y-auto">
              {reminders.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#888E8A]">
                  No pending reminders
                </div>
              ) : (
                <div className="divide-y divide-[#DFDBD1]/60">
                  {reminders.map(reminder => (
                    <div
                      key={reminder.id}
                      className="p-3 hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#111414] truncate">
                            {reminder.title}
                          </p>
                          <p className="text-[10px] text-[#5C615E] font-mono mt-0.5">
                            {new Date(reminder.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          reminder.status === "overdue"
                            ? "bg-[#FDF0EE] text-[#BA2D25]"
                            : reminder.status === "today"
                            ? "bg-[#FDF1EC] text-[#B85D3B]"
                            : "bg-[#FAF8F5] text-[#5C615E]"
                        }`}>
                          {reminder.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-[#DFDBD1] bg-[#FAF8F5]">
              <a
                href="/reminders"
                className="text-[11px] font-semibold text-[#064038] hover:underline flex items-center gap-1"
                onClick={() => setIsOpen(false)}
              >
                View all reminders →
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
