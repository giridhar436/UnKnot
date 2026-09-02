import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#DFDBD1] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#DFDBD1]/80">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#064038] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              U
            </div>
            <div>
              <span className="font-semibold text-base tracking-tight text-[#111414] block leading-none">
                UnKnot
              </span>
              <span className="text-[9.5px] font-mono text-[#888E8A] font-medium tracking-widest uppercase">
                Decision Utility
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-7 text-xs font-medium text-[#5C615E]">
            <a href="#problem" className="hover:text-[#111414] transition-colors">
              The Problem
            </a>
            <a href="#how-it-works" className="hover:text-[#111414] transition-colors">
              How it Works
            </a>
            <a href="#categories" className="hover:text-[#111414] transition-colors">
              Categories
            </a>
            <a href="#why-unknot" className="hover:text-[#111414] transition-colors">
              The Difference
            </a>
            <a href="#use-cases" className="hover:text-[#111414] transition-colors">
              Use Cases
            </a>
            <Link href="/login" className="hover:text-[#111414] transition-colors">
              Sign In
            </Link>
            <Link href="/dashboard" className="text-[#064038] font-semibold hover:underline">
              Enter Workspace &rarr;
            </Link>
          </nav>
        </div>

        {/* Bottom copyright & notes */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#888E8A]">
          <p>&copy; {new Date().getFullYear()} UnKnot &bull; Personal Information &amp; Decision Utility</p>
          <p className="text-center sm:text-right">
            Deep Evergreen &amp; Warm Ivory Visual System
          </p>
        </div>
      </div>
    </footer>
  );
}
