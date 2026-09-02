import * as React from "react";
import Link from "next/link";
import { FolderTree, ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/services/documents";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="page-container space-y-6 max-w-5xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#DFDBD1] space-y-1">
        <div className="flex items-center gap-2 text-[10.5px] font-mono font-semibold text-[#064038] uppercase tracking-widest">
          <FolderTree className="w-3.5 h-3.5" />
          <span>Information Hierarchy</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111414]">
          Categories &amp; Domains
        </h1>
        <p className="text-xs sm:text-sm text-[#5C615E]">
          Structured information domains organizing your receipts, medical bills, warranties, and financial statements.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/documents?category=${encodeURIComponent(cat.name)}`}
            className="p-5 bg-white hover:bg-[#FAF8F5] rounded-xl border border-[#DFDBD1] hover:border-[#064038]/50 transition-all flex flex-col justify-between space-y-4 group shadow-xs"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#064038] uppercase tracking-wider">
                  {cat.name}
                </span>
                <span className="text-xs font-mono font-medium text-[#111414] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DFDBD1] tabular-nums">
                  {cat.count} {cat.count === 1 ? "record" : "records"}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#111414] group-hover:text-[#064038] transition-colors">
                {cat.name}
              </h3>

              {cat.subcategories && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="text-[10.5px] font-mono text-[#5C615E] bg-[#F2EFEB] px-2 py-0.5 rounded"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#DFDBD1]/60 flex items-center justify-between text-xs text-[#064038] font-semibold">
              <span>View category records</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
