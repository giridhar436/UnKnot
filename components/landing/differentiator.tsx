import * as React from "react";
import { ArrowRight, ArrowDown, Check, X, ShieldAlert, Sparkles } from "lucide-react";

export function Differentiator() {
  return (
    <section id="difference" className="py-20 md:py-28 bg-[#F7F5EF] border-b border-[#D8D5CC]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-[#004643] tracking-wider uppercase">
            Product Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080B10]">
            Not another place to store things.
          </h2>
          <p className="text-base sm:text-lg text-[#5F625F] leading-relaxed">
            UnKnot doesn&rsquo;t stop at storing your files. It turns scattered information into structured records that can be searched, connected, and understood in context.
          </p>
        </div>

        {/* Transformation Comparison Layout */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Left Column: Raw Scattered Files */}
          <div className="md:col-span-5 p-6 bg-white rounded-2xl border border-[#D8D5CC] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B42318] flex items-center gap-1.5">
                <X className="w-4 h-4 text-[#B42318]" />
                Traditional Cloud Drives & Notes
              </span>
              <span className="text-[11px] text-[#5F625F]">Static Storage</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]/60 flex items-center justify-between">
                <span className="text-[#080B10] font-medium">Receipt.jpg</span>
                <span className="text-[10px] text-[#5F625F]">Unindexed image pixels</span>
              </div>
              <div className="p-2.5 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]/60 flex items-center justify-between">
                <span className="text-[#080B10] font-medium">Policy_Document_v2.pdf</span>
                <span className="text-[10px] text-[#5F625F]">18 pages of raw legal text</span>
              </div>
              <div className="p-2.5 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]/60 flex items-center justify-between">
                <span className="text-[#080B10] font-medium">Screenshot_2025.png</span>
                <span className="text-[10px] text-[#5F625F]">Dead screenshot in photo roll</span>
              </div>
              <div className="p-2.5 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]/60 flex items-center justify-between">
                <span className="text-[#080B10] font-medium">Bank_Statement.pdf</span>
                <span className="text-[10px] text-[#5F625F]">Locked numbers, no queries</span>
              </div>
            </div>

            <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 text-[11px] text-[#B42318] flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>You still have to manually re-read every file whenever you need an answer.</span>
            </div>
          </div>

          {/* Transformation Indicator */}
          <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
            <div className="w-10 h-10 rounded-full bg-[#004643] text-white flex items-center justify-center shadow-md">
              <ArrowRight className="w-5 h-5 hidden md:block" />
              <ArrowDown className="w-5 h-5 md:hidden" />
            </div>
            <span className="text-[10px] font-bold text-[#004643] uppercase tracking-wider mt-1.5 hidden md:block">
              UnKnot
            </span>
          </div>

          {/* Right Column: One Connected Record */}
          <div className="md:col-span-5 p-6 bg-white rounded-2xl border-2 border-[#004643] shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#004643] flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#004643]" />
                One Connected Record
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E3F0EE] text-[#004643] text-[10px] font-semibold">
                Decision Ready
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F5EF]">
                <span className="font-semibold text-[#5F625F]">Category:</span>
                <span className="font-medium text-[#080B10]">Electronics & Warranties</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F5EF]">
                <span className="font-semibold text-[#5F625F]">Key Dates:</span>
                <span className="font-medium text-[#167A5B]">Warranty active till Oct 2026</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F5EF]">
                <span className="font-semibold text-[#5F625F]">Financials:</span>
                <span className="font-medium text-[#080B10]">₹1,99,900 (GST Claimable)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F5EF]">
                <span className="font-semibold text-[#5F625F]">Context Linked:</span>
                <span className="font-medium text-[#080B10]">Invoice + AppleCare + Serial #</span>
              </div>
            </div>

            <div className="p-3 bg-[#E3F0EE] rounded-xl border border-[#004643]/20 text-[11px] text-[#004643] flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Queryable instantly in natural language or reviewed on your dashboard.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
