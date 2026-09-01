import * as React from "react";
import Link from "next/link";
import { AlertCircle, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reminder } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ImportantTodayProps {
  reminders: Reminder[];
}

export function ImportantToday({ reminders }: ImportantTodayProps) {
  if (reminders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#A66A00]" />
          <span>Needs Attention & Important Dates</span>
        </h2>
        <Link
          href="/reminders"
          className="text-xs text-[#004643] hover:underline font-medium flex items-center gap-1"
        >
          <span>View all ({reminders.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {reminders.slice(0, 3).map((item) => {
          const isExpired = item.status === "completed";

          return (
            <div
              key={item.id}
              className="p-4 bg-white rounded-xl border border-[#D8D5CC] flex flex-col justify-between space-y-3 hover:border-[#004643]/40 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-[#A66A00] uppercase">
                    {item.type.replace("_", " ")}
                  </span>
                  <span className="text-xs font-medium text-[#5F625F]">
                    {formatDate(item.date)}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#080B10] leading-snug">
                  {item.title}
                </h4>
                {item.source && (
                  <p className="text-[11px] text-[#5F625F] truncate">
                    Source: {item.source}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#F0EDE5] flex items-center justify-between">
                <span className="text-[11px] text-[#5F625F]">
                  {isExpired ? "Status: Passed" : "Action: Pending"}
                </span>
                {item.sourceDocumentId && (
                  <Link
                    href={`/documents/${item.sourceDocumentId}`}
                    className="text-xs text-[#004643] font-medium hover:underline flex items-center gap-1"
                  >
                    <span>View record</span>
                    <ArrowRight className="w-3 h-3" />
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
