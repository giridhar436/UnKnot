import * as React from "react";
import Link from "next/link";
import {
  Files,
  FileText,
  Image as ImageIcon,
  AlignLeft,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { getDocuments, getCategories } from "@/lib/services/documents";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/layout/search-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { AmountDisplay } from "@/components/ui/amount-display";
import { formatDate } from "@/lib/utils";

interface DocumentsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams?.category || "";
  const searchQuery = resolvedParams?.search || "";

  const [documents, categories] = await Promise.all([
    getDocuments({
      category: selectedCategory || undefined,
      search: searchQuery || undefined,
    }),
    getCategories(),
  ]);

  const hasDuplicateNotice = documents.some((d) => d.duplicateStatus === "possible");

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFDBD1]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111414]">
            Stored Documents &amp; Records
          </h1>
          <p className="text-xs sm:text-sm text-[#5C615E] mt-0.5">
            Organized knowledge extracted from your PDFs, photos, receipts, and notes.
          </p>
        </div>
      </div>

      {/* Duplicate Detection Notice with Terracotta Accent */}
      {hasDuplicateNotice && (
        <div className="p-3.5 bg-[#FDF1EC] border border-[#B85D3B]/25 rounded-xl text-xs flex items-start gap-2.5 text-[#111414] shadow-xs">
          <AlertTriangle className="w-4 h-4 text-[#B85D3B] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-[#B85D3B] block">
              Duplicate Detection Notice
            </span>
            <p className="text-[#5C615E] text-[11px] leading-relaxed">
              UnKnot matches records based on extracted document content, merchant identifiers, amounts, and document dates—not file upload timestamps. Potential duplicates are flagged for your review.
            </p>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <SearchBar
            initialValue={searchQuery}
            placeholder="Search by title, merchant, product, or amount..."
          />
        </div>
      </div>

      {/* Category Filter Line Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scroll-fade-x scrollbar-none border-b border-[#DFDBD1]">
        <Link
          href="/documents"
          className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors relative ${
            !selectedCategory
              ? "text-[#064038] font-bold after:absolute after:bottom-[-1px] after:left-2 after:right-2 after:h-[2px] after:bg-[#064038] after:rounded-full"
              : "text-[#5C615E] hover:text-[#111414]"
          }`}
        >
          All Records ({categories.reduce((acc, c) => acc + c.count, 0)})
        </Link>
        {categories
          .filter((c) => c.count > 0)
          .map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <Link
                key={cat.id}
                href={`/documents?category=${encodeURIComponent(cat.name)}`}
                className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors relative ${
                  isSelected
                    ? "text-[#064038] font-bold after:absolute after:bottom-[-1px] after:left-2 after:right-2 after:h-[2px] after:bg-[#064038] after:rounded-full"
                    : "text-[#5C615E] hover:text-[#111414]"
                }`}
              >
                {cat.name} ({cat.count})
              </Link>
            );
          })}
      </div>

      {/* Document List */}
      {documents.length === 0 ? (
        <EmptyState
          icon={Files}
          title="No documents found"
          description={
            searchQuery || selectedCategory
              ? "No stored records matched your current filter criteria."
              : "You haven't added any documents or receipts yet."
          }
        />
      ) : (
        <div className="bg-white rounded-xl border border-[#DFDBD1] divide-y divide-[#DFDBD1]/60 overflow-hidden shadow-xs">
          {documents.map((doc) => {
            return (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  {/* File Type Icon */}
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#DFDBD1] text-[#064038] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 sm:mt-0">
                    {doc.type === "pdf" && <FileText className="w-4 h-4" />}
                    {doc.type === "image" && <ImageIcon className="w-4 h-4" />}
                    {doc.type === "text" && <AlignLeft className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-[#111414] group-hover:text-[#064038] transition-colors truncate">
                        {doc.title}
                      </h3>
                      <Badge size="xs" variant="default">
                        {doc.category}
                      </Badge>
                      {doc.duplicateStatus === "possible" && (
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-semibold text-[#B85D3B] bg-[#FDF1EC] px-1.5 py-0.2 rounded border border-[#B85D3B]/25">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          Possible Duplicate
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 text-xs text-[#5C615E] flex-wrap font-mono">
                      <span>
                        <strong className="font-medium text-[#111414]">
                          Doc Date:
                        </strong>{" "}
                        {formatDate(doc.documentDate)}
                      </span>
                      <span className="text-[#DFDBD1] hidden sm:inline">&bull;</span>
                      <span className="hidden sm:inline text-[#888E8A]">
                        Uploaded: {formatDate(doc.uploadedAt)}
                      </span>
                      <span className="text-[#DFDBD1]">&bull;</span>
                      <span className="uppercase text-[9.5px] font-medium tracking-wider text-[#888E8A]">
                        {doc.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#DFDBD1]/50 shrink-0">
                  {doc.amount ? (
                    <AmountDisplay amount={doc.amount} size="md" />
                  ) : (
                    <div className="text-xs font-mono text-[#888E8A]">No amount</div>
                  )}
                  <span className="text-xs text-[#064038] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform mt-0.5">
                    <span>View record</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
