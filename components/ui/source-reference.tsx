import * as React from "react";
import Link from "next/link";
import { FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface SourceReferenceProps {
  documentId?: string;
  documentTitle: string;
  documentDate?: string | null;
  category?: string;
  detail?: string;
  verified?: boolean;
}

export function SourceReference({
  documentId,
  documentTitle,
  documentDate,
  category,
  detail,
  verified = true,
}: SourceReferenceProps) {
  const content = (
    <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#DFDBD1] hover:border-[#064038]/40 transition-colors flex flex-col justify-between space-y-2.5 group">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          {category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#064038] bg-[#E3ECE8] px-2 py-0.5 rounded-md">
              {category}
            </span>
          )}
          {verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1D7A58]">
              <CheckCircle2 className="w-3 h-3" />
              Verified Record
            </span>
          )}
        </div>

        <div className="flex items-start gap-2.5 pt-0.5">
          <FileText className="w-4 h-4 text-[#064038] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-[#111414] group-hover:text-[#064038] transition-colors truncate">
              {documentTitle}
            </h4>
            {detail && <p className="text-[11px] text-[#5C615E] mt-0.5 leading-relaxed">{detail}</p>}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#DFDBD1]/60 flex items-center justify-between text-[11px] text-[#5C615E]">
        <span className="font-mono text-[10px] text-[#888E8A]">
          Doc Date: {formatDate(documentDate || null)}
        </span>
        {documentId && (
          <span className="text-[#064038] font-semibold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );

  if (documentId) {
    return <Link href={`/documents/${documentId}`}>{content}</Link>;
  }

  return content;
}
