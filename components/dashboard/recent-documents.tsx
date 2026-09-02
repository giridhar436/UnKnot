import * as React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Image as ImageIcon, AlignLeft, AlertTriangle } from "lucide-react";
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
      <div className="flex items-center justify-between pb-1 border-b border-[#DFDBD1]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#064038]"></span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
            Recent Documents &bull; Stored Records
          </h2>
        </div>
        <Link
          href="/documents"
          className="text-xs text-[#064038] hover:underline font-semibold flex items-center gap-1"
        >
          <span>View all ({documents.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#DFDBD1] divide-y divide-[#DFDBD1]/60 overflow-hidden shadow-xs">
        {documents.slice(0, 5).map((doc) => {
          return (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[#FAF8F5] transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* File Type Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DFDBD1] text-[#064038] flex items-center justify-center shrink-0 font-bold text-xs">
                  {doc.type === "pdf" && <FileText className="w-4 h-4" />}
                  {doc.type === "image" && <ImageIcon className="w-4 h-4" />}
                  {doc.type === "text" && <AlignLeft className="w-4 h-4" />}
                </div>

                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#111414] group-hover:text-[#064038] transition-colors truncate">
                      {doc.title}
                    </h4>
                    <Badge size="xs" variant="default">
                      {doc.category}
                    </Badge>
                    {doc.duplicateStatus === "possible" && (
                      <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-semibold text-[#B85D3B] bg-[#FDF1EC] px-1.5 py-0.2 rounded border border-[#B85D3B]/25">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        Duplicate Flag
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#5C615E] font-mono">
                    <span className="text-[10.5px]">
                      Doc Date: {formatDate(doc.documentDate)}
                    </span>
                    <span className="text-[#DFDBD1]">&bull;</span>
                    <span className="uppercase text-[9.5px] tracking-wider text-[#888E8A]">
                      {doc.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                {doc.amount ? (
                  <AmountDisplay amount={doc.amount} size="sm" />
                ) : (
                  <span className="text-[11px] font-mono text-[#888E8A]">Record</span>
                )}
                <span className="text-[11px] text-[#064038] font-semibold opacity-0 group-hover:opacity-100 transition-opacity block">
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
