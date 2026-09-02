import * as React from "react";
import {
  FileCheck,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { Analysis } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { SourceReference } from "@/components/ui/source-reference";

interface AnswerCardProps {
  analysis: Analysis;
}

export function AnswerCard({ analysis }: AnswerCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#D8D5CC] p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[#F0EDE5] pb-4">
        <div>
          <span className="text-[10px] font-semibold text-[#004643] uppercase tracking-wider block">
            Query Asked
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#080B10] mt-0.5">
            &ldquo;{analysis.question}&rdquo;
          </h2>
        </div>
        {analysis.isAnalysis && (
          <Badge variant="brand" size="md">
            Decision Analysis
          </Badge>
        )}
      </div>

      {/* Structured Answer */}
      <div className="bg-[#E3F0EE] border border-[#004643]/20 rounded-xl p-5 space-y-2">
        <span className="text-xs font-semibold text-[#004643] flex items-center gap-1.5 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#167A5B]" />
          Direct Answer
        </span>
        <p className="text-base font-semibold text-[#080B10] leading-relaxed">
          {analysis.answer}
        </p>
      </div>

      {/* Supporting Records / Evidence */}
      {analysis.evidence && analysis.evidence.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#080B10] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#004643]" />
              Supporting Sources &amp; Evidence ({analysis.evidence.length})
            </h4>
            <span className="text-[11px] text-[#5F625F]">
              Verified in Workspace
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysis.evidence.map((item) => (
              <SourceReference
                key={item.id}
                documentId={item.documentId}
                documentTitle={item.title}
                category={item.type}
                detail={item.detail}
                verified={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Considered Factors / Context */}
      {analysis.consideredFactors && analysis.consideredFactors.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#F0EDE5]">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#080B10]">
            Context &amp; Factors Considered
          </h4>
          <ul className="space-y-1.5 text-xs text-[#5F625F] list-disc list-inside">
            {analysis.consideredFactors.map((factor, idx) => (
              <li key={idx} className="leading-relaxed">
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Unknowns / Caveats */}
      {analysis.unknowns && analysis.unknowns.length > 0 && (
        <div className="p-3.5 bg-[#FEF7EA] border border-[#A66A00]/25 rounded-xl text-xs space-y-1">
          <span className="font-semibold text-[#A66A00] flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Unknown or Missing Information
          </span>
          <p className="text-[#5F625F]">
            {analysis.unknowns.join("; ")}
          </p>
        </div>
      )}

      {/* Suggested Action */}
      {analysis.suggestedAction && (
        <div className="pt-3 border-t border-[#F0EDE5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <span className="text-[#5F625F]">
            <strong className="text-[#080B10]">Suggested next step:</strong>{" "}
            {analysis.suggestedAction}
          </span>
        </div>
      )}
    </div>
  );
}
