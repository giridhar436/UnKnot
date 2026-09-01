import * as React from "react";
import Link from "next/link";
import { History, FilePlus, Sparkles, BellRing } from "lucide-react";
import { ActivityItem } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
        <History className="w-4 h-4 text-[#004643]" />
        <span>Recent Activity</span>
      </h2>

      <div className="bg-white rounded-xl border border-[#D8D5CC] p-4 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        {activities.map((act) => {
          const isAnalysis = act.type === "analysis_completed";
          const isReminder = act.type === "reminder_created";

          return (
            <div key={act.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E3F0EE] text-[#004643] flex items-center justify-center flex-shrink-0 mt-0.5">
                {isAnalysis ? (
                  <Sparkles className="w-4 h-4" />
                ) : isReminder ? (
                  <BellRing className="w-4 h-4" />
                ) : (
                  <FilePlus className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-xs font-semibold text-[#080B10]">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-[#8A8D8A] flex-shrink-0">
                    {formatRelativeDate(act.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-[#5F625F] mt-0.5">
                  {act.description}
                </p>
                {act.documentId && (
                  <Link
                    href={`/documents/${act.documentId}`}
                    className="text-[11px] text-[#004643] hover:underline font-medium inline-block mt-1"
                  >
                    View related document &rarr;
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
