import * as React from "react";
import Link from "next/link";
import { FilePlus, Sparkles, BellRing } from "lucide-react";
import { ActivityItem } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-[#DFDBD1]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#064038]"></span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
            Recent Activity &bull; Audit Trail
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#DFDBD1] p-4 space-y-4 shadow-xs">
        {activities.map((act) => {
          const isAnalysis = act.type === "analysis_completed";
          const isReminder = act.type === "reminder_created";

          return (
            <div key={act.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#DFDBD1] text-[#064038] flex items-center justify-center shrink-0 mt-0.5">
                {isAnalysis ? (
                  <Sparkles className="w-3.5 h-3.5" />
                ) : isReminder ? (
                  <BellRing className="w-3.5 h-3.5" />
                ) : (
                  <FilePlus className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-xs font-semibold text-[#111414] truncate">
                    {act.title}
                  </p>
                  <span className="text-[10px] font-mono text-[#888E8A] shrink-0">
                    {formatRelativeDate(act.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-[#5C615E] mt-0.5 leading-relaxed">
                  {act.description}
                </p>
                {act.documentId && (
                  <Link
                    href={`/documents/${act.documentId}`}
                    className="text-[11px] font-mono text-[#064038] hover:underline font-semibold inline-block mt-1"
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
