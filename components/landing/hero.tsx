import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ProductPreview } from "./product-preview";

export function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#DFDBD1]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Text Center */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3ECE8] border border-[#064038]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064038]"></span>
            <span className="text-[11px] font-mono font-medium text-[#064038] tracking-wider uppercase">
              Decision Utility
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#111414] leading-[1.12]">
            Everything important in your life.{" "}
            <span className="text-[#064038] block sm:inline">Finally connected.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#5C615E] leading-relaxed max-w-2xl mx-auto font-normal">
            Receipts, documents, bills, warranties, investments, medical records, purchases, repairs, and important dates already exist.
            The problem is that they are scattered, disconnected, and difficult to act on. UnKnot turns them into organized records you can search, understand, and decide with.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-[#064038] text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-[#032B25] transition-all active:scale-[0.985]"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-lg bg-white text-[#111414] border border-[#DFDBD1] text-xs sm:text-sm font-medium hover:bg-[#F2EFEB] transition-all"
            >
              <span>See how it works</span>
              <ChevronDown className="w-4 h-4 text-[#5C615E]" />
            </a>
          </div>

          {/* Calm Guarantee */}
          <div className="pt-1 text-[11px] text-[#888E8A] font-mono">
            <span>Private repository &bull; No public AI training &bull; Structured for decision-making</span>
          </div>
        </div>

        {/* Product Visual Mock with real connections */}
        <div id="preview" className="mt-12 sm:mt-16 scroll-mt-20">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
