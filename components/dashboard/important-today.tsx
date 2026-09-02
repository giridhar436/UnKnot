import * as React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, CreditCard, RefreshCw, FileText } from "lucide-react";
import { Reminder } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ImportantTodayProps {
  reminders: Reminder[];
}

export function ImportantToday({ reminders }: ImportantTodayProps) {
  if (reminders.length === 0) {
    return null;
  }

  const getTypeMeta = (type: string) => {
    switch (type) {
      case "warranty_expiry":
        return {
          icon: ShieldAlert,
          label: "Warranty",
          badgeClass: "bg-[#FDF1EC] text-[#B85D3B] border-[#B85D3B]/25",
        };
      case "bill_due":
      case "payment":
        return {
          icon: CreditCard,
          label: "Bill Due",
          badgeClass: "bg-[#FDF1EC] text-[#B85D3B] border-[#B85D3B]/25",
        };
      case "subscription_renewal":
        return {
          icon: RefreshCw,
          label: "Renewal",
          badgeClass: "bg-[#EDF5FA] text-[#23587B] border-[#23587B]/25",
        };
      default:
        return {
          icon: FileText,
          label: "Document",
          badgeClass: "bg-[#E3ECE8] text-[#064038] border-[#064038]/25",
        };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-[#DFDBD1]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B85D3B]"></span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
            Needs Attention &bull; Important Dates
          </h2>
        </div>
        <Link
          href="/reminders"
          className="text-xs text-[#064038] hover:underline font-semibold flex items-center gap-1"
        >
          <span>View all ({reminders.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {reminders.slice(0, 3).map((item) => {
          const meta = getTypeMeta(item.type);
          const Icon = meta.icon;
          const isExpired = item.status === "completed";

          return (
            <div
              key={item.id}
              className="p-4 bg-white rounded-xl border border-[#DFDBD1] flex flex-col justify-between space-y-3 hover:border-[#064038]/40 transition-all shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border uppercase tracking-wider flex items-center gap-1 ${meta.badgeClass}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{meta.label}</span>
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#111414] font-semibold">
                    {formatDate(item.date)}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#111414] leading-snug">
                  {item.title}
                </h4>

                {item.source && (
                  <p className="text-[11px] text-[#5C615E] truncate font-mono">
                    From: {item.source}
                  </p>
                )}
              </div>

              <div className="pt-2.5 border-t border-[#DFDBD1]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[10.5px] text-[#888E8A]">
                  {isExpired ? "Passed" : "Action Pending"}
                </span>
                {item.sourceDocumentId && (
                  <Link
                    href={`/documents/${item.sourceDocumentId}`}
                    className="text-[#064038] font-semibold hover:underline flex items-center gap-1 group"
                  >
                    <span>View record</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
