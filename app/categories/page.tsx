import * as React from "react";
import Link from "next/link";
import { FolderTree, ArrowRight, FileText } from "lucide-react";
import { getCategories } from "@/lib/services/documents";
import { Badge } from "@/components/ui/badge";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="page-container space-y-6 max-w-5xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#D8D5CC] space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#004643] uppercase tracking-wider">
          <FolderTree className="w-4 h-4" />
          <span>Information Hierarchy</span>
        </div>
        <h1 className="text-2xl font-bold text-[#080B10]">
          Categories & Domains
        </h1>
        <p className="text-xs sm:text-sm text-[#5F625F]">
          Extensible categorization system organizing your scattered receipts, medical bills, warranties, and financial records.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/documents?category=${encodeURIComponent(cat.name)}`}
            className="p-5 bg-white hover:bg-[#F7F5EF] rounded-xl border border-[#D8D5CC] hover:border-[#004643]/50 transition-all flex flex-col justify-between space-y-4 group shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#004643] uppercase tracking-wide">
                  {cat.name}
                </span>
                <span className="text-xs font-semibold text-[#080B10] bg-[#F0EDE5] px-2.5 py-0.5 rounded-full border border-[#D8D5CC]">
                  {cat.count} {cat.count === 1 ? "record" : "records"}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#080B10] group-hover:text-[#004643] transition-colors">
                {cat.name}
              </h3>

              {cat.subcategories && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="text-[11px] text-[#5F625F] bg-[#F0EDE5]/60 px-2 py-0.5 rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#F0EDE5] flex items-center justify-between text-xs text-[#004643] font-semibold">
              <span>View category records</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
