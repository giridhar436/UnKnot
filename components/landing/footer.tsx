import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#F0EDE5] border-t border-[#D8D5CC] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#D8D5CC]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#004643] text-white flex items-center justify-center font-bold text-base shadow-sm">
              U
            </div>
            <div>
              <span className="font-semibold text-lg tracking-tight text-[#080B10] block leading-none">
                UnKnot
              </span>
              <span className="text-[10px] text-[#5F625F] font-semibold tracking-wider uppercase">
                Decision Utility
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-[#5F625F]">
            <a href="#problem" className="hover:text-[#080B10] transition-colors">
              The Problem
            </a>
            <a href="#how-it-works" className="hover:text-[#080B10] transition-colors">
              How it works
            </a>
            <a href="#categories" className="hover:text-[#080B10] transition-colors">
              Categories
            </a>
            <a href="#use-cases" className="hover:text-[#080B10] transition-colors">
              Use cases
            </a>
            <a href="#trust" className="hover:text-[#080B10] transition-colors">
              Privacy & Trust
            </a>
            <Link href="/dashboard" className="text-[#004643] font-semibold hover:underline">
              Enter Workspace →
            </Link>
          </nav>
        </div>

        {/* Bottom copyright & notes */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F625F]">
          <p>© {new Date().getFullYear()} UnKnot. Designed for clear decisions.</p>
          <p className="text-center sm:text-right">
            Cyprus & Sand Visual Identity · Built with quiet confidence
          </p>
        </div>
      </div>
    </footer>
  );
}
