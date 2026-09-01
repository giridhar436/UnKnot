import * as React from "react";
import Link from "next/link";
import { Wallet, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { FinanceSummary, Investment } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface FinancialSnapshotProps {
  summary: FinanceSummary;
  investments: Investment[];
}

export function FinancialSnapshot({ summary, investments }: FinancialSnapshotProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
          <Wallet className="w-4 h-4 text-[#004643]" />
          <span>Financial Snapshot</span>
        </h2>
        <Link
          href="/finance"
          className="text-xs text-[#004643] hover:underline font-medium flex items-center gap-1"
        >
          <span>Full finance overview</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Monthly Expenses */}
        <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-2">
          <span className="text-xs text-[#5F625F] font-medium">
            August 2026 Expenses
          </span>
          <div className="text-xl font-bold text-[#080B10]">
            {formatCurrency(summary.totalExpensesThisMonth)}
          </div>
          <p className="text-[11px] text-[#5F625F]">
            From {summary.expenseCount} recorded bills & purchases
          </p>
        </div>

        {/* Active Investments */}
        <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#5F625F] font-medium">
              Active Investments
            </span>
            <span className="text-[10px] font-semibold text-[#167A5B] bg-[#EBF7F2] px-2 py-0.5 rounded-full">
              {investments.length} Active
            </span>
          </div>
          <div className="text-xl font-bold text-[#080B10]">
            {formatCurrency(summary.totalInvestments)}
          </div>
          <p className="text-[11px] text-[#5F625F]">
            Includes SIP (Mutual Fund), PPF, and FD
          </p>
        </div>

        {/* Upcoming Payments */}
        <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-2">
          <span className="text-xs text-[#5F625F] font-medium">
            Next Upcoming Payment
          </span>
          {summary.upcomingPayments.length > 0 ? (
            <div>
              <div className="text-xl font-bold text-[#080B10]">
                {formatCurrency(summary.upcomingPayments[0].amount)}
              </div>
              <p className="text-[11px] text-[#5F625F] truncate">
                {summary.upcomingPayments[0].title} &bull; Due {formatDate(summary.upcomingPayments[0].dueDate)}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#5F625F]">No upcoming payments due</p>
          )}
        </div>
      </div>
    </div>
  );
}
