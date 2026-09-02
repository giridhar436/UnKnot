import * as React from "react";
import Link from "next/link";
import { Files, ArrowRight, FileText, Image as ImageIcon, AlignLeft, AlertTriangle } from "lucide-react";
import { Document } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { AmountDisplay } from "@/components/ui/amount-display";
import { formatDate } from "@/lib/utils";

interface RecentDocumentsProps {
  documents: Document[];
}

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#080B10] flex items-center gap-2">
          <Files className="w-4 h-4 text-[#004643]" />
          <span>Recent Documents</span>
        </h2>
        <Link
          href="/documents"
          className="text-xs text-[#004643] hover:underline font-medium flex items-center gap-1"
        >
          <span>View all ({documents.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#D8D5CC] divide-y divide-[#F0EDE5] overflow-hidden shadow-xs">
        {documents.slice(0, 5).map((doc) => {
          return (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="p-4 flex items-center justify-between gap-3 hover:bg-[#F7F5EF]/80 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* File Type Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#E3F0EE] text-[#004643] flex items-center justify-center shrink-0 font-bold text-xs">
                  {doc.type === "pdf" && <FileText className="w-5 h-5" />}
                  {doc.type === "image" && <ImageIcon className="w-5 h-5" />}
                  {doc.type === "text" && <AlignLeft className="w-5 h-5" />}
                </div>

                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold text-[#080B10] group-hover:text-[#004643] transition-colors truncate">
                      {doc.title}
                    </h4>
                    <Badge size="sm" variant="default">
                      {doc.category}
                    </Badge>
                    {doc.duplicateStatus === "possible" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#A66A00] bg-[#FEF7EA] px-2 py-0.5 rounded-full border border-[#A66A00]/20">
                        <AlertTriangle className="w-3 h-3" />
                        Possible Duplicate
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#5F625F]">
                    <span className="font-mono text-[11px]">
                      Doc Date: {formatDate(doc.documentDate)}
                    </span>
                    <span className="text-[#D8D5CC]">&bull;</span>
                    <span className="uppercase text-[10px] font-medium tracking-wider text-[#8A8D8A] font-mono">
                      {doc.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                {doc.amount ? (
                  <AmountDisplay amount={doc.amount} size="sm" />
                ) : (
                  <div className="text-xs text-[#8A8D8A]">Record</div>
                )}
                <span className="text-[11px] text-[#004643] font-medium opacity-0 group-hover:opacity-100 transition-opacity block">
                  View &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
