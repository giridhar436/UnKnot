import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, ShieldAlert, CreditCard, RefreshCw, FileText } from "lucide-react";
import { Reminder } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ImportantTodayProps {
  reminders: Reminder[];
}

export function ImportantToday({ reminders }: ImportantTodayProps) {
  if (reminders.length === 0) {
    return null;
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warranty_expiry":
        return <ShieldAlert className="w-4 h-4 text-[#A66A00]" />;
      case "bill_due":
      case "payment":
        return <CreditCard className="w-4 h-4 text-[#B42318]" />;
      case "subscription_renewal":
        return <RefreshCw className="w-4 h-4 text-[#245B8F]" />;
      default:
        return <FileText className="w-4 h-4 text-[#004643]" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#B42318]" />
          <span>Needs Attention &amp; Important Dates</span>
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
              className="p-4 bg-white rounded-xl border border-[#D8D5CC] flex flex-col justify-between space-y-3 hover:border-[#004643]/40 transition-all shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FEF7EA] text-[#A66A00] border border-[#A66A00]/20 uppercase tracking-wider flex items-center gap-1">
                    {getTypeIcon(item.type)}
                    <span>{item.type.replace("_", " ")}</span>
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#080B10] font-medium">
                    {formatDate(item.date)}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#080B10] leading-snug">
                  {item.title}
                </h4>
                {item.source && (
                  <p className="text-[11px] text-[#5F625F] truncate font-mono">
                    Source: {item.source}
                  </p>
                )}
              </div>

              <div className="pt-2.5 border-t border-[#E5E2DA] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#5F625F]">
                  {isExpired ? "Status: Passed" : "Action: Pending"}
                </span>
                {item.sourceDocumentId && (
                  <Link
                    href={`/documents/${item.sourceDocumentId}`}
                    className="text-[#004643] font-semibold hover:underline flex items-center gap-1 group"
                  >
                    <span>View record</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
