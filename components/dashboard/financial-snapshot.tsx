import * as React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
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
      <div className="flex items-center justify-between pb-1 border-b border-[#DFDBD1]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#064038]"></span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
            Financial Snapshot &bull; Assets vs Outflow
          </h2>
        </div>
        <Link
          href="/finance"
          className="text-xs text-[#064038] hover:underline font-semibold flex items-center gap-1"
        >
          <span>Full financial view</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Monthly Expenses / Outflow */}
        <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-2 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C615E] font-medium block">
            This Month Outflow (Aug)
          </span>
          <div>
            <AmountDisplay
              amount={summary.totalExpensesThisMonth}
              size="xl"
              trend="expense"
            />
          </div>
          <p className="text-[11px] text-[#5C615E]">
            From {summary.expenseCount} recorded bills &amp; purchases
          </p>
        </div>

        {/* Active Investments */}
        <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C615E] font-medium block">
              Verified Investments
            </span>
            <span className="text-[10px] font-mono font-semibold text-[#064038] bg-[#E3ECE8] px-2 py-0.5 rounded flex items-center gap-1">
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
          <p className="text-[11px] text-[#5C615E]">
            Mutual Fund SIPs, PPF &amp; Fixed Deposits
          </p>
        </div>

        {/* Upcoming Obligations */}
        <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-2 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C615E] font-medium block">
            Upcoming Due
          </span>
          {summary.upcomingPayments.length > 0 ? (
            <div>
              <div>
                <AmountDisplay
                  amount={summary.upcomingPayments[0].amount}
                  size="xl"
                  trend="terracotta"
                />
              </div>
              <p className="text-[11px] text-[#5C615E] truncate mt-1">
                {summary.upcomingPayments[0].title} &bull;{" "}
                <span className="font-mono text-[#111414] font-medium">
                  Due {formatDate(summary.upcomingPayments[0].dueDate)}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#888E8A] pt-2">No pending obligations</p>
          )}
        </div>
      </div>
    </div>
  );
}
