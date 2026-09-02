"use client";

import * as React from "react";
import { Check, Trash2 } from "lucide-react";
import { updateReminderStatus, deleteReminder } from "@/lib/actions/reminders";
import { useRouter } from "next/navigation";

interface ReminderActionsProps {
  reminderId: string;
  status: string;
}

export function ReminderActions({ reminderId, status }: ReminderActionsProps) {
  const router = useRouter();
  const [isCompleting, setIsCompleting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    const result = await updateReminderStatus(reminderId, "completed");
    setIsCompleting(false);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to mark complete");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Dismiss this reminder? It will be permanently removed.")) {
      return;
    }
    setIsDeleting(true);
    const result = await deleteReminder(reminderId);
    setIsDeleting(false);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to dismiss");
    }
  };

  return (
    <div className="flex items-center gap-1">
      {status !== "completed" && (
        <button
          type="button"
          onClick={handleComplete}
          disabled={isCompleting}
          className="p-1.5 text-[#5C615E] hover:text-[#064038] hover:bg-[#F2EFEB] rounded-md transition-colors disabled:opacity-50"
          aria-label="Mark as complete"
          title="Mark as complete"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-1.5 text-[#5C615E] hover:text-[#B85D3B] hover:bg-[#FDF1EC] rounded-md transition-colors disabled:opacity-50"
        aria-label="Dismiss reminder"
        title="Dismiss"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
