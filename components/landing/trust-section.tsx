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
    <section id="trust" className="py-20 md:py-28 bg-[#F2EFEB]/60 border-b border-[#DFDBD1]/80 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-mono font-semibold text-[#064038] tracking-widest uppercase">
            Trust & Sovereignty
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-[#111414]">
            Your records should work for you{" "}
            <span className="text-[#064038]">— never against you.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C615E] leading-relaxed">
            Handling personal records requires sober stewardship, transparent extraction boundaries, and honest engineering.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#DFDBD1] shadow-xs hover:border-[#064038]/30 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E3ECE8] text-[#064038] flex items-center justify-center group-hover:bg-[#064038] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111414]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C615E] leading-relaxed">
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
