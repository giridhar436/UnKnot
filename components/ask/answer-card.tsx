import * as React from "react";
import {
  FileCheck,
  AlertCircle,
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
    <div className="bg-white rounded-xl border border-[#DFDBD1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-200">
      {/* Query Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[#DFDBD1]/60 pb-3">
        <div>
          <span className="text-[10px] font-mono font-semibold text-[#064038] uppercase tracking-wider block">
            Grounded Decision Query
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#111414] mt-0.5">
            &ldquo;{analysis.question}&rdquo;
          </h2>
        </div>
        {analysis.isAnalysis && (
          <Badge variant="brand" size="sm">
            Synthesized Verdict
          </Badge>
        )}
      </div>

      {/* Structured Direct Answer */}
      <div className="bg-[#E3ECE8]/70 border border-[#064038]/20 rounded-xl p-4 sm:p-5 space-y-1.5">
        <span className="text-[11px] font-mono font-semibold text-[#064038] flex items-center gap-1.5 uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1D7A58]" />
          Direct Verdict
        </span>
        <p className="text-sm font-semibold text-[#111414] leading-relaxed">
          {analysis.answer}
        </p>
      </div>

      {/* Supporting Records / Evidence */}
      {analysis.evidence && analysis.evidence.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414] flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-[#064038]" />
              Supporting Sources &amp; Evidence ({analysis.evidence.length})
            </h4>
            <span className="text-[10.5px] font-mono text-[#5C615E]">
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

      {/* Considered Factors */}
      {analysis.consideredFactors && analysis.consideredFactors.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#DFDBD1]/60">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
            Context &amp; Key Factors Considered
          </h4>
          <ul className="space-y-1 text-xs text-[#5C615E] list-disc list-inside">
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
        <div className="p-3.5 bg-[#FDF1EC] border border-[#B85D3B]/25 rounded-xl text-xs space-y-1">
          <span className="font-semibold text-[#B85D3B] flex items-center gap-1.5 font-mono text-[11px]">
            <AlertCircle className="w-3.5 h-3.5" />
            Missing or Unknown Information
          </span>
          <p className="text-[#5C615E] text-[11px] leading-relaxed">
            {analysis.unknowns.join("; ")}
          </p>
        </div>
      )}

      {/* Suggested Action */}
      {analysis.suggestedAction && (
        <div className="pt-3 border-t border-[#DFDBD1]/60 text-xs">
          <span className="text-[#5C615E]">
            <strong className="text-[#111414]">Suggested next step:</strong>{" "}
            {analysis.suggestedAction}
          </span>
        </div>
      )}
    </div>
  );
}
