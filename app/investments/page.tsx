import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getInvestments } from "@/lib/services/finance";
import { InvestmentCard } from "@/components/finance/investment-card";
import { AmountDisplay } from "@/components/ui/amount-display";

export default async function InvestmentsPage() {
  const investments = await getInvestments();
  const totalAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="page-container space-y-6 max-w-5xl">
      {/* Back to Finance */}
      <Link
        href="/finance"
        className="text-xs font-semibold text-[#064038] hover:underline flex items-center gap-1.5 min-h-[44px]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Finance Overview</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFDBD1]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111414]">
            Verified Investments &amp; Assets
          </h1>
          <p className="text-xs sm:text-sm text-[#5C615E] mt-0.5">
            Structured records of your Mutual Fund SIPs, PPF contributions, and Fixed Deposits.
          </p>
        </div>

        <div className="bg-white px-4 py-2.5 rounded-xl border border-[#DFDBD1] shrink-0 shadow-xs">
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-[#5C615E] block">
            Total Recorded Assets
          </span>
          <AmountDisplay amount={totalAmount} size="lg" trend="investment" />
        </div>
      </div>

      {/* Verified Facts Banner */}
      <div className="p-4 bg-[#E3ECE8]/60 border border-[#064038]/20 rounded-xl text-xs text-[#111414] flex items-start gap-2.5 shadow-xs">
        <ShieldCheck className="w-4 h-4 text-[#1D7A58] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#064038] block">Verified Financial Context</span>
          <p className="text-[#5C615E] text-[11px] mt-0.5 leading-relaxed">
            UnKnot recognizes your existing investment portfolios when answering decision queries. These are distinguished as assets, not outgoing expenses.
          </p>
        </div>
      </div>

      {/* Investment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {investments.map((inv) => (
          <InvestmentCard key={inv.id} investment={inv} />
        ))}
      </div>
    </div>
  );
}
