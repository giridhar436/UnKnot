import * as React from "react";
import { Sparkles, Info } from "lucide-react";
import { getSuggestedQuestions } from "@/lib/services/ask";
import { AskView } from "@/components/ask/ask-view";

export default async function AskPage() {
  const suggestedQuestions = await getSuggestedQuestions();

  return (
    <div className="page-container space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#D8D5CC] space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#004643] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Decision & Context Engine</span>
        </div>
        <h1 className="text-2xl font-bold text-[#080B10]">
          Ask UnKnot
        </h1>
        <p className="text-xs sm:text-sm text-[#5F625F]">
          Get answers and decision guidance based on your stored receipts, bills, warranties, and financial records.
        </p>
      </div>

      {/* Interactive Ask View */}
      <AskView initialSuggested={suggestedQuestions} />

      {/* Trust & Non-Authoritative Guidance Note */}
      <div className="p-4 bg-[#F0EDE5] rounded-xl border border-[#D8D5CC] text-xs text-[#5F625F] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#004643] flex-shrink-0 mt-0.5" />
        <p leading-relaxed>
          UnKnot answers queries using extracted facts from your uploaded documents. Recommendations are decision-support insights and do not replace certified financial or medical counsel.
        </p>
      </div>
    </div>
  );
}
