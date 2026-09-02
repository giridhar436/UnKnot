import * as React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CreditCard,
  RefreshCw,
  FileText,
  ArrowRight,
} from "lucide-react";
import { getReminders } from "@/lib/services/reminders";
import { Badge } from "@/components/ui/badge";
import { ReminderActions } from "@/components/reminders/reminder-actions";
import { formatDate } from "@/lib/utils";

export default async function RemindersPage() {
  const reminders = await getReminders();

  const dueSoonReminders = reminders.filter(
    (r) => r.status === "today" || r.status === "overdue" || (r.status === "upcoming" && r.type === "bill_due")
  );
  const otherUpcoming = reminders.filter(
    (r) => r.status === "upcoming" && r.type !== "bill_due"
  );
  const passedReminders = reminders.filter((r) => r.status === "completed");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warranty_expiry":
        return <ShieldAlert className="w-4 h-4 text-[#B85D3B]" />;
      case "bill_due":
      case "payment":
        return <CreditCard className="w-4 h-4 text-[#B85D3B]" />;
      case "subscription_renewal":
        return <RefreshCw className="w-4 h-4 text-[#23587B]" />;
      default:
        return <FileText className="w-4 h-4 text-[#064038]" />;
    }
  };

  return (
    <div className="page-container space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFDBD1]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111414]">
            Reminders &amp; Important Dates
          </h1>
          <p className="text-xs sm:text-sm text-[#5C615E] mt-0.5">
            Critical dates automatically identified and extracted from your bills, warranties, and statements.
          </p>
        </div>
      </div>

      {/* Group 1: Immediate Action Items (Terracotta Accent) */}
      {dueSoonReminders.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#DFDBD1]/60">
            <span className="w-2 h-2 rounded-full bg-[#B85D3B]"></span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
              Immediate Action &amp; Dues ({dueSoonReminders.length})
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-[#DFDBD1] divide-y divide-[#DFDBD1]/60 overflow-hidden shadow-xs">
            {dueSoonReminders.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#DFDBD1] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-semibold text-[#111414]">
                        {item.title}
                      </h3>
                      <Badge size="xs" variant="terracotta">
                        Action Required
                      </Badge>
                    </div>
                    {item.source && (
                      <p className="text-[11px] text-[#5C615E] truncate font-mono">
                        Extracted from: {item.source}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#DFDBD1]/50 shrink-0 gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#111414] font-mono">
                    {formatDate(item.date)}
                  </span>
                  <div className="flex items-center gap-2">
                    <ReminderActions reminderId={item.id} status={item.status} />
                    {item.sourceDocumentId && (
                      <Link
                        href={`/documents/${item.sourceDocumentId}`}
                        className="text-xs text-[#064038] hover:underline font-semibold flex items-center gap-1 mt-0.5 group"
                      >
                        <span>View record</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group 2: Upcoming Expiries & Schedules */}
      {otherUpcoming.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#DFDBD1]/60">
            <span className="w-2 h-2 rounded-full bg-[#064038]"></span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
              Upcoming Expirations &amp; Milestones ({otherUpcoming.length})
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-[#DFDBD1] divide-y divide-[#DFDBD1]/60 overflow-hidden shadow-xs">
            {otherUpcoming.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F5] transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#DFDBD1] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-semibold text-[#111414]">
                        {item.title}
                      </h3>
                      <Badge size="xs" variant="default">
                        {item.type.replace("_", " ")}
                      </Badge>
                    </div>
                    {item.source && (
                      <p className="text-[11px] text-[#5C615E] truncate font-mono">
                        Extracted from: {item.source}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#DFDBD1]/50 shrink-0 gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-[#111414] font-mono">
                    {formatDate(item.date)}
                  </span>
                  <div className="flex items-center gap-2">
                    <ReminderActions reminderId={item.id} status={item.status} />
                    {item.sourceDocumentId && (
                      <Link
                        href={`/documents/${item.sourceDocumentId}`}
                        className="text-xs text-[#064038] hover:underline font-semibold flex items-center gap-1 mt-0.5 group"
                      >
                        <span>View record</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group 3: Passed / Historical Dates */}
      {passedReminders.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#DFDBD1]/60">
            <span className="w-2 h-2 rounded-full bg-[#888E8A]"></span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#888E8A]">
              Historical &amp; Past Milestones ({passedReminders.length})
            </h2>
          </div>

          <div className="bg-white/80 rounded-xl border border-[#DFDBD1] divide-y divide-[#DFDBD1]/60">
            {passedReminders.map((item) => (
              <div
                key={item.id}
                className="p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="font-semibold text-[#111414]">{item.title}</p>
                  <p className="text-[11px] text-[#5C615E] font-mono">
                    Date: {formatDate(item.date)} &bull; {item.source}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ReminderActions reminderId={item.id} status={item.status} />
                  {item.sourceDocumentId && (
                    <Link
                      href={`/documents/${item.sourceDocumentId}`}
                      className="text-[#064038] hover:underline font-semibold font-mono text-xs"
                    >
                      View record &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
