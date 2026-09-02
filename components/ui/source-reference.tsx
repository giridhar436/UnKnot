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
    <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#D8D5CC] hover:border-[#004643]/40 transition-colors flex flex-col justify-between space-y-2 group">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          {category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#004643] bg-[#E3F0EE] px-2 py-0.5 rounded">
              {category}
            </span>
          )}
          {verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#167A5B]">
              <CheckCircle2 className="w-3 h-3" />
              Verified Record
            </span>
          )}
        </div>

        <div className="flex items-start gap-2 pt-1">
          <FileText className="w-4 h-4 text-[#004643] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#080B10] group-hover:text-[#004643] transition-colors truncate">
              {documentTitle}
            </h4>
            {detail && <p className="text-[11px] text-[#5F625F] mt-0.5">{detail}</p>}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E5E2DA] flex items-center justify-between text-[11px] text-[#5F625F]">
        <span className="font-mono text-[10px]">
          Doc Date: {formatDate(documentDate || null)}
        </span>
        {documentId && (
          <span className="text-[#004643] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
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
