import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Investment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { AmountDisplay } from "@/components/ui/amount-display";
import { formatDate } from "@/lib/utils";

interface InvestmentCardProps {
  investment: Investment;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#DFDBD1] flex flex-col justify-between space-y-4 shadow-xs hover:border-[#064038]/40 transition-all">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Badge variant="brand" size="xs">
            {investment.type}
          </Badge>
          {investment.frequency && (
            <span className="text-[10px] font-mono text-[#5C615E] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DFDBD1]">
              {investment.frequency}
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-bold text-[#111414]">
          {investment.name}
        </h3>

        <div className="pt-1 space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C615E] block">
            {investment.frequency === "Monthly" ? "SIP Contribution" : "Tracked Holding Value"}
          </span>
          <div className="flex items-baseline gap-1">
            <AmountDisplay
              amount={investment.amount}
              size="lg"
              trend="investment"
            />
            {investment.frequency === "Monthly" && (
              <span className="text-xs font-mono text-[#5C615E]"> / mo</span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#DFDBD1]/60 flex items-center justify-between text-xs text-[#5C615E]">
        <span className="font-mono text-[10.5px] text-[#888E8A]">
          Recorded: {formatDate(investment.date)}
        </span>
        {investment.documentId ? (
          <Link
            href={`/documents/${investment.documentId}`}
            className="text-[#064038] font-semibold hover:underline flex items-center gap-1 group text-xs"
          >
            <span>Statement</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <span className="text-[10.5px] font-mono text-[#1D7A58]">Verified</span>
        )}
      </div>
    </div>
  );
}
