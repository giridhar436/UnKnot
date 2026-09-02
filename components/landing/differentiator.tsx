import * as React from "react";
import { Check, X, Link2 } from "lucide-react";

export function Differentiator() {
  const comparisons = [
    {
      traditional: "Stores disconnected files in separate, isolated folders.",
      unknot: "Extracts facts and connects related records automatically.",
    },
    {
      traditional: "You search by filename and hope you remember what you called it.",
      unknot: "You ask direct questions about decisions, dates, and amounts.",
    },
    {
      traditional: "Important warranty deadlines and due dates are manually tracked.",
      unknot: "Dates are detected and surfaced before critical deadlines pass.",
    },
    {
      traditional: "Investments get lumped together with regular expenses.",
      unknot: "Assets and investments are strictly distinguished from everyday spending.",
    },
  ];

  const equations = [
    {
      title: "Warranty & Repair Decision",
      formula: [
        { label: "Purchase Receipt", tag: "₹79,999" },
        { label: "Warranty Policy", tag: "Active" },
        { label: "Repair Estimate", tag: "₹18,000" },
      ],
      result: "Action: Free claim under AppleCare+ before Oct 14",
    },
    {
      title: "Financial Context",
      formula: [
        { label: "Monthly SIP", tag: "₹5,000/mo" },
        { label: "PPF Deposit", tag: "₹1,50,000" },
        { label: "Tracked Expenses", tag: "₹38,200" },
      ],
      result: "Context: Active investor — distinct from monthly outflows",
    },
  ];

  return (
    <section id="why-unknot" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#DFDBD1]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-mono font-semibold text-[#064038] tracking-widest uppercase">
            The Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-[#111414]">
            Existing tools store files. <br className="hidden sm:inline" />
            <span className="text-[#064038]">UnKnot understands relationships.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C615E] leading-relaxed max-w-2xl mx-auto">
            A cloud drive simply holds a PDF. A note app just stores characters. UnKnot connects the facts inside them so you can understand what to do next.
          </p>
        </div>

        {/* 2 Interactive Equation Blocks */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {equations.map((eq, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl border border-[#DFDBD1] shadow-xs space-y-4 hover:border-[#064038]/50 transition-all"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#DFDBD1]/60">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111414]">
                  {eq.title}
                </span>
                <span className="text-[10px] font-mono text-[#064038] bg-[#E3ECE8] px-2 py-0.5 rounded">
                  Connection Formula
                </span>
              </div>

              {/* Connected tags */}
              <div className="flex flex-wrap items-center gap-2">
                {eq.formula.map((item, fIdx) => (
                  <React.Fragment key={fIdx}>
                    <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1] text-xs flex items-center gap-2">
                      <span className="font-semibold text-[#111414]">{item.label}</span>
                      <span className="font-mono text-[10px] bg-[#EAE6DE] px-1.5 py-0.2 rounded text-[#5C615E]">
                        {item.tag}
                      </span>
                    </div>
                    {fIdx < eq.formula.length - 1 && (
                      <span className="text-[#888E8A] font-bold text-sm">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Result output */}
              <div className="p-3.5 bg-[#E3ECE8]/60 rounded-lg border border-[#064038]/20 flex items-start gap-2.5">
                <Link2 className="w-4 h-4 text-[#064038] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#064038] leading-relaxed">
                  {eq.result}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Point Direct Comparison Grid */}
        <div className="mt-8 max-w-4xl mx-auto space-y-2.5">
          {comparisons.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 rounded-xl border border-[#DFDBD1] overflow-hidden shadow-xs bg-white"
            >
              <div className="p-4 sm:p-5 flex items-start gap-3 border-b md:border-b-0 md:border-r border-[#DFDBD1]">
                <div className="w-5 h-5 rounded-full bg-red-50 text-[#BA2D25] flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#888E8A] block">
                    Traditional Storage &amp; Notes
                  </span>
                  <p className="text-xs sm:text-sm text-[#5C615E] mt-0.5 leading-relaxed">
                    {item.traditional}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-[#FAF8F5] flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#064038] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#064038] block">
                    UnKnot Decision Utility
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#111414] mt-0.5 leading-relaxed">
                    {item.unknot}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
