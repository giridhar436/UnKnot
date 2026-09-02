import * as React from "react";
import Link from "next/link";
import { Wallet, ArrowRight, TrendingUp } from "lucide-react";
import { FinanceSummary, Investment } from "@/lib/types";
import { AmountDisplay } from "@/components/ui/amount-display";
import { formatDate } from "@/lib/utils";

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
          <span>Full financial view</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Monthly Expenses */}
        <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-2">
          <span className="text-xs text-[#5F625F] font-medium uppercase tracking-wider block">
            This Month&rsquo;s Outflow
          </span>
          <div>
            <AmountDisplay
              amount={summary.totalExpensesThisMonth}
              size="xl"
              trend="expense"
            />
          </div>
          <p className="text-[11px] text-[#5F625F]">
            Extracted from {summary.expenseCount} recorded bills &amp; purchases
          </p>
        </div>

        {/* Active Investments */}
        <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#5F625F] font-medium uppercase tracking-wider block">
              Active Investments
            </span>
            <span className="text-[10px] font-semibold text-[#167A5B] bg-[#E3F0EE] px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {investments.length} Active
            </span>
          </div>
          <div>
            <AmountDisplay
              amount={summary.totalInvestments}
              size="xl"
              trend="investment"
            />
          </div>
          <p className="text-[11px] text-[#5F625F]">
            Structured across SIPs, PPF, and Fixed Deposits
          </p>
        </div>

        {/* Upcoming Obligations */}
        <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-2">
          <span className="text-xs text-[#5F625F] font-medium uppercase tracking-wider block">
            Next Upcoming Due
          </span>
          {summary.upcomingPayments.length > 0 ? (
            <div>
              <div>
                <AmountDisplay
                  amount={summary.upcomingPayments[0].amount}
                  size="xl"
                  trend="neutral"
                />
              </div>
              <p className="text-[11px] text-[#5F625F] truncate mt-1">
                {summary.upcomingPayments[0].title} &bull;{" "}
                <span className="font-mono">
                  Due {formatDate(summary.upcomingPayments[0].dueDate)}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#5F625F] pt-2">No pending dues</p>
          )}
        </div>
      </div>
    </div>
  );
}
