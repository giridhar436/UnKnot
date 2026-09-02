import * as React from "react";
import Link from "next/link";
import {
  CalendarClock,
  ShieldAlert,
  CreditCard,
  RefreshCw,
  FileText,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { getReminders } from "@/lib/services/reminders";
import { Badge } from "@/components/ui/badge";
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
    <div className="page-container space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D5CC]">
        <div>
          <h1 className="text-2xl font-bold text-[#080B10]">
            Reminders &amp; Important Dates
          </h1>
          <p className="text-xs sm:text-sm text-[#5F625F] mt-1">
            Critical dates automatically identified and extracted from your bills, warranties, and statements.
          </p>
        </div>
      </div>

      {/* Group 1: Due Soon & Action Items */}
      {dueSoonReminders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-[#B42318]" />
            <span>Due Soon &amp; Immediate Action ({dueSoonReminders.length})</span>
          </h2>

          <div className="bg-white rounded-xl border border-[#D8D5CC] divide-y divide-[#F0EDE5] overflow-hidden shadow-xs">
            {dueSoonReminders.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F5EF]/60 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#E3F0EE] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-semibold text-[#080B10]">
                        {item.title}
                      </h3>
                      <Badge size="sm" variant="outline">
                        {item.type.replace("_", " ")}
                      </Badge>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 text-[#B42318] border border-red-200">
                        Action Required
                      </span>
                    </div>
                    {item.source && (
                      <p className="text-xs text-[#5F625F] truncate font-mono">
                        Extracted from: {item.source}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#F0EDE5] shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-[#080B10] font-mono">
                    {formatDate(item.date)}
                  </span>
                  {item.sourceDocumentId && (
                    <Link
                      href={`/documents/${item.sourceDocumentId}`}
                      className="text-xs text-[#004643] hover:underline font-semibold flex items-center gap-1 mt-0.5 group"
                    >
                      <span>View document</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group 2: Upcoming Expiries & Schedules */}
      {otherUpcoming.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-[#004643]" />
            <span>Upcoming Expirations &amp; Milestones ({otherUpcoming.length})</span>
          </h2>

          <div className="bg-white rounded-xl border border-[#D8D5CC] divide-y divide-[#F0EDE5] overflow-hidden shadow-xs">
            {otherUpcoming.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F7F5EF]/60 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#E3F0EE] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-semibold text-[#080B10]">
                        {item.title}
                      </h3>
                      <Badge size="sm" variant="default">
                        {item.type.replace("_", " ")}
                      </Badge>
                    </div>
                    {item.source && (
                      <p className="text-xs text-[#5F625F] truncate font-mono">
                        Extracted from: {item.source}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#F0EDE5] shrink-0">
                  <span className="text-xs sm:text-sm font-semibold text-[#080B10] font-mono">
                    {formatDate(item.date)}
                  </span>
                  {item.sourceDocumentId && (
                    <Link
                      href={`/documents/${item.sourceDocumentId}`}
                      className="text-xs text-[#004643] hover:underline font-semibold flex items-center gap-1 mt-0.5 group"
                    >
                      <span>View document</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group 3: Passed / Historical Dates */}
      {passedReminders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#5F625F] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#8A8D8A]" />
            <span>Passed &amp; Expired Dates ({passedReminders.length})</span>
          </h2>

          <div className="bg-white/70 rounded-xl border border-[#D8D5CC] divide-y divide-[#F0EDE5]">
            {passedReminders.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-[#080B10]">{item.title}</p>
                  <p className="text-[11px] text-[#5F625F] font-mono">
                    Date: {formatDate(item.date)} &bull; {item.source}
                  </p>
                </div>
                {item.sourceDocumentId && (
                  <Link
                    href={`/documents/${item.sourceDocumentId}`}
                    className="text-[#004643] hover:underline font-medium"
                  >
                    View record &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
