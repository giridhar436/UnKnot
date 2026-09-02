import * as React from "react";
import { UploadCloud, Layers, Link2, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Add",
      icon: UploadCloud,
      summary: "PDFs, camera photos, screenshots, or plain text.",
      detail:
        "Drop in a PDF invoice, take a photo of a receipt, or paste an emailed warranty confirmation. UnKnot handles unstructured formats directly.",
      features: [
        "Text-based & scanned PDFs",
        "Camera photos & gallery uploads",
        "Direct text notes & records",
      ],
    },
    {
      num: "02",
      title: "Understand",
      icon: Layers,
      summary: "Extracts key facts and categorizes the record.",
      detail:
        "Amounts, dates, merchant names, invoice numbers, warranty terms, and investment types are extracted into clean, structured data.",
      features: [
        "Automated domain categorization",
        "Extracted amounts & currencies",
        "Document date identification",
      ],
    },
    {
      num: "03",
      title: "Connect",
      icon: Link2,
      summary: "Discovers relationships between separate items.",
      detail:
        "UnKnot connects your purchase invoice to its warranty policy, repair history, and tax deductions—building one contextual timeline.",
      features: [
        "Purchase to warranty linking",
        "Receipt to repair pairing",
        "Cross-document entity graph",
      ],
    },
    {
      num: "04",
      title: "Act",
      icon: Compass,
      summary: "Ask questions and make informed decisions.",
      detail:
        "Ask natural questions with grounded citations, receive alerts before warranties expire, and see your financial position clearly.",
      features: [
        "Direct natural language answers",
        "Verified document citations",
        "Timeline deadline alerts",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-[#DFDBD1]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-mono font-semibold text-[#064038] tracking-widest uppercase">
            The Flow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-[#111414]">
            How UnKnot works
          </h2>
          <p className="text-sm sm:text-base text-[#5C615E] font-normal leading-relaxed">
            From raw, scattered paperwork to clear, connected decisions in four straightforward stages.
          </p>
        </div>

        {/* 4 Step Grid Layout */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex flex-col justify-between p-5 sm:p-6 bg-white rounded-xl border border-[#DFDBD1] shadow-xs hover:border-[#064038]/50 transition-all group"
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#DFDBD1]/70">
                    <span className="text-2xl font-bold text-[#064038] font-mono tracking-tight">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DFDBD1] text-[#064038] flex items-center justify-center group-hover:bg-[#064038] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="mt-4 space-y-1.5">
                    <h3 className="text-base font-bold text-[#111414]">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#064038] leading-snug">
                      {step.summary}
                    </p>
                    <p className="text-xs text-[#5C615E] leading-relaxed pt-1">
                      {step.detail}
                    </p>
                  </div>
                </div>

                {/* Feature Bullet Points */}
                <div className="mt-5 pt-3.5 border-t border-[#DFDBD1]/60 space-y-1.5">
                  {step.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-[11px] text-[#5C615E]"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#064038]"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Inline Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064038] hover:text-[#032B25] transition-colors group"
          >
            <span>Start organizing your records with UnKnot</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
