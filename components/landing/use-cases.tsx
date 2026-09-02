import * as React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function UseCases() {
  const useCases = [
    {
      question: "Is this warranty still valid?",
      answer: "Yes. AppleCare+ for your MacBook Pro 16” remains active through 14 Oct 2027. Accidental damage protection is included with zero deductible.",
      source: "AppleCare Agreement #AC-88910",
      tag: "Warranties",
    },
    {
      question: "When did I buy this?",
      answer: "Purchased on 12 Feb 2024 from Samsung Flagship Store, Indiranagar for ₹1,29,999. Invoice #INV-2024-991.",
      source: "Retail Tax Invoice #991",
      tag: "Purchases",
    },
    {
      question: "How much have I spent on this?",
      answer: "Total ₹24,800 across 3 service appointments (Annual Service ₹16,200, Brake Pads ₹5,400, Wheel Alignment ₹3,200).",
      source: "Service Records 2024–2025",
      tag: "Repairs",
    },
    {
      question: "Which bills are due soon?",
      answer: "BESCOM Electricity Bill for ₹2,840 is due in 3 days (Sep 8). Account #0488219. Autopay is disabled.",
      source: "BESCOM Digital Bill (Aug)",
      tag: "Bills",
    },
    {
      question: "How much have I invested?",
      answer: "₹4,20,000 tracked across verified instruments: Mutual Fund SIPs (₹2,10,000), Public Provident Fund (₹1,50,000), and Fixed Deposit (₹60,000).",
      source: "CAMS + Bank Statements",
      tag: "Investments",
    },
    {
      question: "Where is the document related to this purchase?",
      answer: "Found in Purchases category: 'Samsung_S24_Invoice.pdf' (uploaded 14 Feb 2024). Connected to Care+ warranty and GST claim.",
      source: "Document #doc-001",
      tag: "Documents",
    },
  ];

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-[#F2EFEB] border-b border-[#DFDBD1]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-mono font-semibold text-[#064038] tracking-widest uppercase">
            Everyday Scenarios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-[#111414]">
            Real questions. Grounded answers.
          </h2>
          <p className="text-sm sm:text-base text-[#5C615E] leading-relaxed">
            UnKnot extracts information from your records so you can ask straightforward questions and receive exact, cited facts.
          </p>
        </div>

        {/* Grid of 6 Use Cases */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-white rounded-xl border border-[#DFDBD1] shadow-xs flex flex-col justify-between hover:border-[#064038]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FAF8F5] text-[#064038] border border-[#DFDBD1]">
                    {uc.tag}
                  </span>
                  <span className="text-[10px] font-mono text-[#888E8A]">Fact-checked</span>
                </div>

                {/* The Query */}
                <h3 className="text-sm sm:text-base font-bold text-[#111414] leading-snug">
                  &ldquo;{uc.question}&rdquo;
                </h3>

                {/* The Answer */}
                <div className="pt-2 border-t border-[#DFDBD1]/60">
                  <div className="flex items-start gap-2 text-xs text-[#5C615E] leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D7A58] shrink-0 mt-0.5" />
                    <span>{uc.answer}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DFDBD1]/60 flex items-center justify-between text-[11px] font-mono text-[#888E8A]">
                <span className="truncate">Source: {uc.source}</span>
                <span className="text-[#064038] font-semibold group-hover:underline shrink-0 ml-2">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064038] hover:text-[#032B25] transition-colors group"
          >
            <span>Ask a question across your own records in the workspace</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
