import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's display name
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const displayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "User";

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
      <div className="flex flex-col gap-4 pb-4 border-b border-[#DFDBD1]">
        <div>
          <span className="text-[10.5px] font-semibold tracking-widest text-[#064038] uppercase font-mono">
            {todayStr} &bull; Workspace Active
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111414] mt-0.5 tracking-tight">
            {greeting}, {displayName}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C615E] mt-0.5">
            Information command center &bull; Review urgent actions, connected records, and financial context.
          </p>
        </div>

        {/* Quick Ask Banner */}
        <Link
          href="/ask"
          className="flex items-center gap-3 p-2.5 px-4 bg-[#064038] text-white rounded-xl hover:bg-[#032B25] transition-all shadow-xs group self-start sm:self-auto min-h-[44px]"
        >
          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#E3ECE8]" />
          </div>
          <div>
            <span className="text-xs font-semibold block leading-tight">Ask UnKnot</span>
            <span className="text-[10px] text-white/80 font-mono block">
              Query records &amp; decisions
            </span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </Link>
      </div>

      {/* 1. Needs Attention & Important Dates */}
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
