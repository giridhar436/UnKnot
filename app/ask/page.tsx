import * as React from "react";
import { Sparkles, Info } from "lucide-react";
import { getSuggestedQuestions } from "@/lib/services/ask";
import { AskView } from "@/components/ask/ask-view";

export default async function AskPage() {
  const suggestedQuestions = await getSuggestedQuestions();

  return (
    <div className="page-container space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#DFDBD1] space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-[#064038] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Decision & Context Engine</span>
        </div>
        <h1 className="text-2xl font-bold text-[#111414]">
          Ask UnKnot
        </h1>
        <p className="text-xs sm:text-sm text-[#5A605C]">
          Get answers and decision guidance based on your stored receipts, bills, warranties, and financial records.
        </p>
      </div>

      {/* Interactive Ask View */}
      <AskView initialSuggested={suggestedQuestions} />

      {/* Trust & Non-Authoritative Guidance Note */}
      <div className="p-4 bg-[#F2EFEB] rounded-xl border border-[#DFDBD1] text-xs text-[#5A605C] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#064038] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          UnKnot answers queries using extracted facts from your uploaded documents. Recommendations are decision-support insights and do not replace certified financial or medical counsel.
        </p>
      </div>
    </div>
  );
}
