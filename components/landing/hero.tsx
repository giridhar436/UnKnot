import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ProductPreview } from "./product-preview";

export function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#D8D5CC]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Text Center */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3F0EE] border border-[#004643]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#004643]"></span>
            <span className="text-xs font-semibold text-[#004643] tracking-wider uppercase">
              Your Information, Unknotted
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#080B10] leading-[1.12]">
            Everything important in your life.{" "}
            <span className="text-[#004643] block sm:inline">Finally in one place.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-[#5F625F] leading-relaxed max-w-2xl mx-auto">
            Receipts, documents, bills, warranties, investments and everyday records
            are scattered everywhere. UnKnot brings them together, understands what matters,
            and helps you find the right information when you need it.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl bg-[#004643] text-white text-base font-semibold shadow-md hover:bg-[#003633] transition-all active:scale-[0.98]"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-[#080B10] border border-[#D8D5CC] text-sm font-medium hover:bg-[#F0EDE5] transition-all"
            >
              <span>See how it works</span>
              <ChevronDown className="w-4 h-4 text-[#5F625F]" />
            </a>
          </div>

          {/* Subtle note */}
          <div className="pt-2 text-xs text-[#5F625F]">
            <span>No convoluted setup · Instant workspace · Privacy-focused</span>
          </div>
        </div>

        {/* Product Visual Mock */}
        <div id="preview" className="mt-14 sm:mt-18 scroll-mt-20">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
