import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-[#064038] text-white border-b border-[#032B25] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <span className="text-[11px] font-mono font-medium tracking-widest uppercase text-[#E3ECE8]/80">
          Clarity For Life Records
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Stop searching. <br />
          Start knowing.
        </h2>

        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-normal">
          Bring your receipts, bills, warranties, investments, and life paperwork together into one calm, private repository designed for decisions.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg bg-white text-[#064038] text-xs sm:text-sm font-semibold shadow-xs hover:bg-[#FAF8F5] transition-all active:scale-[0.985]"
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4 text-[#064038]" />
          </Link>
        </div>

        <p className="text-[11px] font-mono text-white/60 pt-2">
          Private repository &bull; No public AI training &bull; Structured for decision-making
        </p>
      </div>
    </section>
  );
}
