import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { getGreeting, formatDate } from "@/lib/utils";
import { getDocuments } from "@/lib/services/documents";
import { getFinanceSummary, getInvestments } from "@/lib/services/finance";
import { getReminders } from "@/lib/services/reminders";
import { getActivityItems } from "@/lib/services/ask";
import { ImportantToday } from "@/components/dashboard/important-today";
import { FinancialSnapshot } from "@/components/dashboard/financial-snapshot";
import { RecentDocuments } from "@/components/dashboard/recent-documents";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default async function DashboardPage() {
  const [documents, financeSummary, investments, reminders, activities] =
    await Promise.all([
      getDocuments(),
      getFinanceSummary(),
      getInvestments(),
      getReminders(),
      getActivityItems(),
    ]);

  const greeting = getGreeting();
  const todayStr = formatDate(new Date().toISOString());

  return (
    <div className="page-container space-y-8">
      {/* Dashboard Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D5CC]">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#004643] uppercase">
            {todayStr}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#080B10] mt-0.5">
            {greeting}, Giridhar
          </h1>
          <p className="text-xs sm:text-sm text-[#5F625F] mt-1">
            Here is what needs your attention and your recent connected records.
          </p>
        </div>

        {/* Quick Ask Banner */}
        <Link
          href="/ask"
          className="flex items-center gap-3 p-3 px-4 bg-[#004643] text-white rounded-xl hover:bg-[#003633] transition-all shadow-sm group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold block">Ask UnKnot</span>
            <span className="text-[11px] text-white/80 block">
              Query your records & decisions
            </span>
          </div>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 1. Important Today */}
      <ImportantToday reminders={reminders} />

      {/* 2. Financial Snapshot */}
      <FinancialSnapshot
        summary={financeSummary}
        investments={investments}
      />

      {/* 3. Recent Documents & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentDocuments documents={documents} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
}
