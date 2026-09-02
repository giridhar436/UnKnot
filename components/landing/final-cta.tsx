import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-[#004643] text-white border-b border-[#003633] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#A8D5D0]">
          Take Control of Your Records
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Stop searching. <br className="hidden sm:inline" />
          Start knowing.
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Bring the information you already have into one place and make it useful.
          Transform scattered receipts, warranties, and files into clear decisions.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-xl bg-white text-[#004643] text-base font-bold shadow-lg hover:bg-[#F0EDE5] transition-all active:scale-[0.98]"
          >
            <span>Get started with UnKnot</span>
            <ArrowRight className="w-5 h-5 text-[#004643]" />
          </Link>
        </div>

        <p className="text-xs text-white/60 pt-2">
          Instant access · No friction · Structured knowledge
        </p>
      </div>
    </section>
  );
}
