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
        className="text-xs font-semibold text-[#004643] hover:underline flex items-center gap-1.5 min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Finance Overview</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D5CC]">
        <div>
          <h1 className="text-2xl font-bold text-[#080B10]">
            Verified Investments
          </h1>
          <p className="text-xs sm:text-sm text-[#5F625F] mt-1">
            Structured records of your Mutual Fund SIPs, PPF contributions, and Fixed Deposits.
          </p>
        </div>

        <div className="bg-white px-4 py-2.5 rounded-xl border border-[#D8D5CC] shrink-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5F625F] block">
            Total Recorded Assets
          </span>
          <AmountDisplay amount={totalAmount} size="lg" trend="investment" />
        </div>
      </div>

      {/* Note distinguishing facts from recommendations */}
      <div className="p-4 bg-[#E3F0EE]/60 border border-[#004643]/20 rounded-xl text-xs text-[#080B10] flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#004643] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block">Verified Financial Facts</span>
          <p className="text-[#5F625F] text-[11px] mt-0.5 leading-relaxed">
            UnKnot recognizes your existing investment portfolios when answering financial queries. You are already actively investing across Mutual Funds and Government instruments.
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
