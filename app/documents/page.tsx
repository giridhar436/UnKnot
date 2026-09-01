import * as React from "react";
import Link from "next/link";
import {
  Files,
  FileText,
  Image as ImageIcon,
  AlignLeft,
  Filter,
  Plus,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { getDocuments, getCategories } from "@/lib/services/documents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/layout/search-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatDate } from "@/lib/utils";

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

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D5CC]">
        <div>
          <h1 className="text-2xl font-bold text-[#080B10]">
            Stored Documents & Records
          </h1>
          <p className="text-xs sm:text-sm text-[#5F625F] mt-1">
            Organized records extracted from your PDFs, photos, receipts, and notes.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <SearchBar
            initialValue={searchQuery}
            placeholder="Search by title, merchant, product, or amount..."
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/documents"
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
            !selectedCategory
              ? "bg-[#004643] text-white border-[#004643]"
              : "bg-white text-[#080B10] border-[#D8D5CC] hover:bg-[#F0EDE5]"
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
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  isSelected
                    ? "bg-[#004643] text-white border-[#004643]"
                    : "bg-white text-[#080B10] border-[#D8D5CC] hover:bg-[#F0EDE5]"
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
        <div className="bg-white rounded-xl border border-[#D8D5CC] divide-y divide-[#F0EDE5] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          {documents.map((doc) => {
            return (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F7F5EF]/80 transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  {/* File Type Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#E3F0EE] text-[#004643] flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5 sm:mt-0">
                    {doc.type === "pdf" && <FileText className="w-5 h-5" />}
                    {doc.type === "image" && <ImageIcon className="w-5 h-5" />}
                    {doc.type === "text" && <AlignLeft className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-semibold text-[#080B10] group-hover:text-[#004643] transition-colors truncate">
                        {doc.title}
                      </h3>
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

                    <div className="flex items-center gap-2 sm:gap-4 text-xs text-[#5F625F] flex-wrap">
                      <span>
                        <strong className="font-medium text-[#080B10]">
                          Doc Date:
                        </strong>{" "}
                        {formatDate(doc.documentDate)}
                      </span>
                      <span className="text-[#D8D5CC] hidden sm:inline">&bull;</span>
                      <span className="hidden sm:inline">
                        <strong className="font-medium text-[#080B10]">
                          Uploaded:
                        </strong>{" "}
                        {formatDate(doc.uploadedAt)}
                      </span>
                      <span className="text-[#D8D5CC]">&bull;</span>
                      <span className="uppercase text-[10px] font-medium tracking-wider text-[#8A8D8A]">
                        {doc.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#F0EDE5] flex-shrink-0">
                  {doc.amount ? (
                    <div className="text-base font-bold text-[#080B10]">
                      {formatCurrency(doc.amount)}
                    </div>
                  ) : (
                    <div className="text-xs text-[#8A8D8A]">No amount</div>
                  )}
                  <span className="text-xs text-[#004643] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View details</span>
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
