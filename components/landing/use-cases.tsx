import * as React from "react";
import { MessageSquareQuote, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function UseCases() {
  const useCases = [
    {
      question: "Where's the warranty for my laptop?",
      answer: "MacBook Pro 14” AppleCare+ is valid until October 14, 2026. Coverage includes accidental damage. Tax invoice #AP-8810 attached.",
      tag: "Warranties",
    },
    {
      question: "When is my electricity bill due?",
      answer: "BESCOM Bill for ₹2,840 is due on October 5, 2025. Consumer ID #0488219. Auto-pay is currently not configured.",
      tag: "Bills",
    },
    {
      question: "How much have I spent on car repairs this year?",
      answer: "Total ₹24,800 spent across 3 service records (Annual Service ₹16,200, Brake Pad Replacement ₹5,400, Wheel Alignment ₹3,200).",
      tag: "Repairs & Finance",
    },
    {
      question: "Which investments am I currently tracking?",
      answer: "Tracking 3 assets totaling ₹4,20,000: UTI Nifty 50 Index Fund (₹2,10,000), PPF Account (₹1,50,000), and SGB 2024 Series (₹60,000).",
      tag: "Investments",
    },
    {
      question: "Do I already have this purchase receipt?",
      answer: "Yes, matched an existing invoice from Croma Electronics for ₹34,990 uploaded on July 14, 2025 (Air Conditioner purchase).",
      tag: "Purchases",
    },
    {
      question: "What documents are related to my health insurance?",
      answer: "Connected 3 documents: Policy Schedule #HD-8921-99, Cashless TPA Card, and the 2024 Hospital Discharge Summary.",
      tag: "Medical",
    },
  ];

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-[#F0EDE5] border-b border-[#D8D5CC]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-[#004643] tracking-wider uppercase">
            Practical Everyday Answers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080B10]">
            Real questions. Instant clarity.
          </h2>
          <p className="text-base sm:text-lg text-[#5F625F]">
            No complex formulas or manual tagging. Ask UnKnot natural questions about your records and get exact, cited facts.
          </p>
        </div>

        {/* Grid of Use Cases */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-[#D8D5CC] shadow-xs flex flex-col justify-between hover:border-[#004643]/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#E3F0EE] text-[#004643]">
                    {uc.tag}
                  </span>
                  <MessageSquareQuote className="w-4 h-4 text-[#004643]" />
                </div>

                {/* The Query */}
                <h3 className="text-base font-bold text-[#080B10] leading-snug">
                  &ldquo;{uc.question}&rdquo;
                </h3>

                {/* The Answer */}
                <div className="pt-2 border-t border-[#E5E2DA] space-y-2">
                  <div className="flex items-start gap-2 text-xs text-[#5F625F] leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#167A5B] shrink-0 mt-0.5" />
                    <span>{uc.answer}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E2DA] flex items-center justify-between text-[11px] text-[#5F625F]">
                <span>Immediate context</span>
                <span className="text-[#004643] font-semibold group-hover:underline">
                  Verified with source
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom prompt link */}
        <div className="mt-12 text-center">
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#004643] hover:text-[#003633] transition-colors group"
          >
            <span>Test the Ask UnKnot assistant</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
