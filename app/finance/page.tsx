import * as React from "react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Receipt,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  getExpenses,
  getInvestments,
  getFinanceSummary,
  getUpcomingPayments,
} from "@/lib/services/finance";
import { InvestmentCard } from "@/components/finance/investment-card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D5CC]">
        <div>
          <h1 className="text-2xl font-bold text-[#080B10]">
            Financial Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#5F625F] mt-1">
            Structured records of your expenses, active investments, and upcoming obligations.
          </p>
        </div>

        <Link
          href="/investments"
          className="text-xs font-semibold text-[#004643] hover:underline flex items-center gap-1.5 min-h-[44px]"
        >
          <span>View Dedicated Investments View</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-xl border border-[#D8D5CC] space-y-1">
          <span className="text-xs font-medium text-[#5F625F]">
            August Recorded Expenses
          </span>
          <div className="text-2xl font-bold text-[#080B10]">
            {formatCurrency(summary.totalExpensesThisMonth)}
          </div>
          <span className="text-[11px] text-[#5F625F] block">
            {expenses.length} tracked items
          </span>
        </div>

        <div className="p-5 bg-white rounded-xl border border-[#D8D5CC] space-y-1">
          <span className="text-xs font-medium text-[#5F625F]">
            Active Investments Recorded
          </span>
          <div className="text-2xl font-bold text-[#080B10]">
            {formatCurrency(summary.totalInvestments)}
          </div>
          <span className="text-[11px] text-[#167A5B] block font-medium">
            {investments.length} verified investment accounts
          </span>
        </div>

        <div className="p-5 bg-white rounded-xl border border-[#D8D5CC] space-y-1">
          <span className="text-xs font-medium text-[#5F625F]">
            Upcoming Obligations
          </span>
          <div className="text-2xl font-bold text-[#080B10]">
            {formatCurrency(
              upcomingPayments.reduce((sum, p) => sum + p.amount, 0)
            )}
          </div>
          <span className="text-[11px] text-[#5F625F] block">
            {upcomingPayments.length} upcoming dues
          </span>
        </div>
      </div>

      {/* Section 1: Active Investments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#004643]" />
              <span>Active Investments ({investments.length})</span>
            </h2>
            <p className="text-xs text-[#5F625F] mt-0.5">
              Extracted facts from your statements and deposit certificates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {investments.map((inv) => (
            <InvestmentCard key={inv.id} investment={inv} />
          ))}
        </div>
      </div>

      {/* Section 2: Recent Expenses List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#004643]" />
            <span>Tracked Purchases & Expenses</span>
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-[#D8D5CC] divide-y divide-[#F0EDE5] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-[#F7F5EF]/50 transition-colors"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-[#080B10] truncate">
                    {exp.title}
                  </span>
                  <Badge size="sm" variant="default">
                    {exp.category}
                  </Badge>
                </div>
                <p className="text-xs text-[#5F625F]">
                  Date: {formatDate(exp.date)}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-[#080B10] block">
                  {formatCurrency(exp.amount)}
                </span>
                {exp.documentId && (
                  <Link
                    href={`/documents/${exp.documentId}`}
                    className="text-[11px] text-[#004643] hover:underline font-medium"
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
