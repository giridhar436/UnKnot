import * as React from "react";
import { Shield, EyeOff, Lock, UserCheck } from "lucide-react";

export function TrustSection() {
  const principles = [
    {
      icon: UserCheck,
      title: "User-Owned Records",
      description:
        "Your documents, receipts, and notes remain your personal property. Everything in UnKnot is organized strictly for your own personal utility and decision-making.",
    },
    {
      icon: EyeOff,
      title: "No Ads, No Data Selling",
      description:
        "We do not monetize your personal records, sell telemetry to advertisers, or train public AI models on your private documents.",
    },
    {
      icon: Lock,
      title: "Controlled & Isolated Access",
      description:
        "Access to your documents and extracted metadata is scoped strictly to your account and authenticated sessions.",
    },
    {
      icon: Shield,
      title: "Transparent & Predictable",
      description:
        "You always have full visibility over what was extracted from each document and can edit, export, or delete any record at any time.",
    },
  ];

  return (
    <section id="trust" className="py-20 md:py-28 bg-[#F7F5EF] border-b border-[#D8D5CC]/80 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-[#004643] tracking-wider uppercase">
            Trust & Responsibility
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080B10]">
            Your information should work for you{" "}
            <span className="text-[#004643]">— not against you.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5F625F]">
            Handling personal records requires sober stewardship, clear boundaries, and honest engineering.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#D8D5CC] shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E3F0EE] text-[#004643] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#080B10]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5F625F] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
