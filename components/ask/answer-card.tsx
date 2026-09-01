import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  FileCheck,
  ArrowRight,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { Analysis } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface AnswerCardProps {
  analysis: Analysis;
}

export function AnswerCard({ analysis }: AnswerCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#D8D5CC] p-6 space-y-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] animate-in fade-in duration-200">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[#F0EDE5] pb-4">
        <div>
          <span className="text-[11px] font-semibold text-[#004643] uppercase tracking-wider block">
            Query Asked
          </span>
          <h2 className="text-lg font-bold text-[#080B10] mt-0.5">
            {analysis.question}
          </h2>
        </div>
        {analysis.isAnalysis && (
          <Badge variant="brand" size="md">
            Decision Analysis
          </Badge>
        )}
      </div>

      {/* Structured Answer */}
      <div className="bg-[#E3F0EE]/50 border border-[#004643]/20 rounded-xl p-5 space-y-2">
        <span className="text-xs font-semibold text-[#004643] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          Synthesized Answer
        </span>
        <p className="text-base font-semibold text-[#080B10] leading-relaxed">
          {analysis.answer}
        </p>
      </div>

      {/* Considered Factors / Context */}
      {analysis.consideredFactors && analysis.consideredFactors.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#080B10]">
            Context & Factors Considered
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
        <div className="p-3.5 bg-[#FEF7EA] border border-[#A66A00]/20 rounded-xl text-xs space-y-1">
          <span className="font-semibold text-[#A66A00] flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Unknown or Missing Information
          </span>
          <p className="text-[#5F625F]">
            {analysis.unknowns.join("; ")}
          </p>
        </div>
      )}

      {/* Supporting Records / Evidence */}
      {analysis.evidence && analysis.evidence.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#080B10] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#004643]" />
              Supporting Records ({analysis.evidence.length})
            </h4>
            <span className="text-[11px] text-[#5F625F]">
              Direct Evidence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {analysis.evidence.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#F7F5EF] rounded-xl border border-[#D8D5CC] flex flex-col justify-between space-y-2"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[#5F625F] block">
                    {item.type}
                  </span>
                  <p className="text-xs font-semibold text-[#080B10]">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#5F625F] mt-0.5">
                    {item.detail}
                  </p>
                </div>

                {item.documentId && (
                  <Link
                    href={`/documents/${item.documentId}`}
                    className="text-[11px] text-[#004643] font-medium hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>View original record</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Action */}
      {analysis.suggestedAction && (
        <div className="pt-2 border-t border-[#F0EDE5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <span className="text-[#5F625F]">
            <strong className="text-[#080B10]">Suggested next step:</strong>{" "}
            {analysis.suggestedAction}
          </span>
        </div>
      )}
    </div>
  );
}
