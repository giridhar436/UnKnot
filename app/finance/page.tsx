import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getExpenses,
  getInvestments,
  getFinanceSummary,
  getUpcomingPayments,
} from "@/lib/services/finance";
import { InvestmentCard } from "@/components/finance/investment-card";
import { Badge } from "@/components/ui/badge";
import { AmountDisplay } from "@/components/ui/amount-display";
import { formatDate } from "@/lib/utils";

export default async function FinancePage() {
  const [expenses, investments, summary, upcomingPayments] = await Promise.all([
    getExpenses(),
    getInvestments(),
    getFinanceSummary(),
    getUpcomingPayments(),
  ]);

  return (
    <div className="page-container space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFDBD1]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111414]">
            Financial Context
          </h1>
          <p className="text-xs sm:text-sm text-[#5C615E] mt-0.5">
            Strict separation between everyday outflows, active investments, and upcoming obligations.
          </p>
        </div>

        <Link
          href="/investments"
          className="text-xs font-semibold text-[#064038] hover:underline flex items-center gap-1.5 min-h-[44px]"
        >
          <span>Dedicated Investments View</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#DFDBD1] space-y-1.5 shadow-xs">
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-[#5C615E] block">
            Recorded Outflow (Aug)
          </span>
          <div>
            <AmountDisplay
              amount={summary.totalExpensesThisMonth}
              size="xl"
              trend="expense"
            />
          </div>
          <span className="text-[11px] text-[#5C615E] block font-mono">
            {expenses.length} tracked items &bull; Everyday spending
          </span>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#DFDBD1] space-y-1.5 shadow-xs">
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-[#5C615E] block">
            Active Investments (Assets)
          </span>
          <div>
            <AmountDisplay
              amount={summary.totalInvestments}
              size="xl"
              trend="investment"
            />
          </div>
          <span className="text-[11px] text-[#064038] block font-mono font-medium">
            {investments.length} verified asset holdings
          </span>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#DFDBD1] space-y-1.5 shadow-xs">
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-[#5C615E] block">
            Upcoming Due Obligations
          </span>
          <div>
            <AmountDisplay
              amount={upcomingPayments.reduce((sum, p) => sum + p.amount, 0)}
              size="xl"
              trend="terracotta"
            />
          </div>
          <span className="text-[11px] text-[#5C615E] block font-mono">
            {upcomingPayments.length} upcoming dues
          </span>
        </div>
      </div>

      {/* Section 1: Active Investments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#DFDBD1]/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#064038]"></span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
              Active Investments &bull; Assets ({investments.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {investments.map((inv) => (
            <InvestmentCard key={inv.id} investment={inv} />
          ))}
        </div>
      </div>

      {/* Section 2: Recent Expenses List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#DFDBD1]/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111414]"></span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
              Tracked Purchases &amp; Expenses ({expenses.length})
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#DFDBD1] divide-y divide-[#DFDBD1]/60 overflow-hidden shadow-xs">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-semibold text-[#111414] truncate">
                    {exp.title}
                  </span>
                  <Badge size="xs" variant="default">
                    {exp.category}
                  </Badge>
                </div>
                <p className="text-[11px] text-[#5C615E] font-mono">
                  Date: {formatDate(exp.date)}
                </p>
              </div>

              <div className="text-right shrink-0">
                <AmountDisplay amount={exp.amount} size="md" />
                {exp.documentId && (
                  <Link
                    href={`/documents/${exp.documentId}`}
                    className="text-[11px] text-[#064038] hover:underline font-medium block mt-0.5"
                  >
                    View receipt &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
