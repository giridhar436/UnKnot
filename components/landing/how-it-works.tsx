import * as React from "react";
import { UploadCloud, Cpu, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Add",
      icon: UploadCloud,
      summary: "Upload a PDF, image, receipt, or simply enter text.",
      detail:
        "Drop in a photo of a bill, an emailed insurance policy, an equipment manual, or a quick note. No rigid templates required.",
      features: [
        "PDF invoices & policy documents",
        "Camera photos & screenshot uploads",
        "Quick manual text notes",
      ],
    },
    {
      num: "02",
      title: "Understand",
      icon: Cpu,
      summary:
        "UnKnot extracts useful information, identifies its category and connects related details.",
      detail:
        "Amounts, due dates, warranty periods, vendor names, and reference IDs are extracted and linked to matching records in your life.",
      features: [
        "Automatic categorization & tagging",
        "Date & deadline discovery",
        "Cross-record entity linking",
      ],
    },
    {
      num: "03",
      title: "Act",
      icon: Compass,
      summary:
        "Search, ask questions, review important dates, understand finances and make better decisions.",
      detail:
        "Get reminders before warranties expire, track real spending over time, and ask natural questions to get instant, cited answers.",
      features: [
        "Natural language query answering",
        "Actionable deadline alerts",
        "Comprehensive financial visibility",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F7F5EF] border-b border-[#D8D5CC]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-[#004643] tracking-wider uppercase">
            Simple & Transparent Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080B10]">
            How UnKnot works
          </h2>
          <p className="text-base sm:text-lg text-[#5F625F]">
            From raw, messy documents to clear, connected decisions in three straightforward steps.
          </p>
        </div>

        {/* 3 Step Editorial Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex flex-col justify-between p-6 sm:p-7 bg-white rounded-2xl border border-[#D8D5CC] shadow-xs hover:border-[#004643]/50 transition-all group"
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DA]">
                    <span className="text-3xl font-extrabold text-[#004643] font-mono tracking-tight">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#E3F0EE] text-[#004643] flex items-center justify-center group-hover:bg-[#004643] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="mt-5 space-y-2">
                    <h3 className="text-xl font-bold text-[#080B10]">
                      {step.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#004643] leading-snug">
                      {step.summary}
                    </p>
                    <p className="text-xs sm:text-sm text-[#5F625F] leading-relaxed pt-1">
                      {step.detail}
                    </p>
                  </div>
                </div>

                {/* Feature Bullet Points */}
                <div className="mt-6 pt-4 border-t border-[#E5E2DA] space-y-2">
                  {step.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-xs text-[#5F625F]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#004643]"></span>
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
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#004643] hover:text-[#003633] transition-colors group"
          >
            <span>Try uploading your first record in the workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
