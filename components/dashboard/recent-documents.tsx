import * as React from "react";
import Link from "next/link";
import { Files, ArrowRight, FileText, Image as ImageIcon, AlignLeft } from "lucide-react";
import { Document } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

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
          <span>View all documents ({documents.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#D8D5CC] divide-y divide-[#F0EDE5] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        {documents.slice(0, 5).map((doc) => {
          return (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="p-4 flex items-center justify-between gap-3 hover:bg-[#F7F5EF]/80 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* File Type Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#E3F0EE] text-[#004643] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  {doc.type === "pdf" && <FileText className="w-5 h-5" />}
                  {doc.type === "image" && <ImageIcon className="w-5 h-5" />}
                  {doc.type === "text" && <AlignLeft className="w-5 h-5" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold text-[#080B10] group-hover:text-[#004643] transition-colors truncate">
                      {doc.title}
                    </h4>
                    <Badge size="sm" variant="default">
                      {doc.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#5F625F] mt-0.5">
                    <span>Doc date: {formatDate(doc.documentDate)}</span>
                    <span className="text-[#D8D5CC]">&bull;</span>
                    <span className="uppercase text-[10px] font-medium tracking-wider text-[#8A8D8A]">
                      {doc.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                {doc.amount ? (
                  <div className="text-sm font-semibold text-[#080B10]">
                    {formatCurrency(doc.amount)}
                  </div>
                ) : (
                  <div className="text-xs text-[#8A8D8A]">Structured record</div>
                )}
                <span className="text-[11px] text-[#004643] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
