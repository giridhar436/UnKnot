import * as React from "react";
import Link from "next/link";
import { Link2, ArrowRight } from "lucide-react";
import { Document } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface RelatedDocumentsProps {
  relatedDocs: Document[];
}

export function RelatedDocuments({ relatedDocs }: RelatedDocumentsProps) {
  if (relatedDocs.length === 0) {
    return (
      <div className="p-4 bg-white border border-[#D8D5CC] rounded-xl text-center text-xs text-[#8A8D8A]">
        No directly connected secondary documents linked yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Link2 className="w-4 h-4 text-[#004643]" />
        <h3 className="text-sm font-semibold text-[#080B10]">
          Connected Records ({relatedDocs.length})
        </h3>
      </div>

      <div className="space-y-2">
        {relatedDocs.map((doc) => (
          <Link
            key={doc.id}
            href={`/documents/${doc.id}`}
            className="flex items-center justify-between p-3 bg-white hover:bg-[#F7F5EF] border border-[#D8D5CC] rounded-xl text-xs transition-colors group"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#080B10] group-hover:text-[#004643] truncate">
                  {doc.title}
                </span>
                <Badge size="sm" variant="default">
                  {doc.category}
                </Badge>
              </div>
              <p className="text-[11px] text-[#5F625F]">
                Document Date: {formatDate(doc.documentDate)}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8A8D8A] group-hover:text-[#004643] transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
