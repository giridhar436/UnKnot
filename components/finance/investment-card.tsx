import * as React from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
import { Investment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface InvestmentCardProps {
  investment: Investment;
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#D8D5CC] flex flex-col justify-between space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-[#004643]/40 transition-all">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="brand" size="sm">
            {investment.type}
          </Badge>
          {investment.frequency && (
            <span className="text-[11px] font-medium text-[#5F625F] bg-[#F0EDE5] px-2 py-0.5 rounded-full border border-[#D8D5CC]">
              {investment.frequency}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-[#080B10]">
          {investment.name}
        </h3>

        <div className="pt-1">
          <span className="text-xs text-[#5F625F] block">
            {investment.frequency === "Monthly" ? "SIP Contribution" : "Invested Amount"}
          </span>
          <span className="text-xl font-bold text-[#080B10]">
            {formatCurrency(investment.amount)}
            {investment.frequency === "Monthly" && (
              <span className="text-xs font-normal text-[#5F625F]"> / mo</span>
            )}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-[#F0EDE5] flex items-center justify-between text-xs text-[#5F625F]">
        <span>Recorded: {formatDate(investment.date)}</span>
        {investment.documentId ? (
          <Link
            href={`/documents/${investment.documentId}`}
            className="text-[#004643] font-semibold hover:underline flex items-center gap-1"
          >
            <span>Statement</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <span className="text-[11px] text-[#8A8D8A]">Verified record</span>
        )}
      </div>
    </div>
  );
}
