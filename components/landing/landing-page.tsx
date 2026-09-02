import * as React from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { ProblemSection } from "./problem-section";
import { HowItWorks } from "./how-it-works";
import { Categories } from "./categories";
import { Differentiator } from "./differentiator";
import { UseCases } from "./use-cases";
import { TrustSection } from "./trust-section";
import { FinalCTA } from "./final-cta";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--ivory)] text-[var(--charcoal)]">
      {/* 1. Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2 & 3. Hero + Product Preview */}
        <Hero />

        {/* 4. The Problem */}
        <ProblemSection />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. Categories (What UnKnot Understands) */}
        <Categories />

        {/* 7. The Difference */}
        <Differentiator />

        {/* 8. Real-Life Use Cases */}
        <UseCases />

        {/* 9. Trust & Privacy */}
        <TrustSection />

        {/* 10. Final CTA */}
        <FinalCTA />
      </main>

      {/* 11. Minimal Footer */}
      <Footer />
    </div>
  );
}
