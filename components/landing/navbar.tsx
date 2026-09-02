"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#DFDBD1]/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark & Descriptor */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#064038] text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-[#032B25] transition-colors">
            U
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight text-[#111414] leading-none">
              UnKnot
            </span>
            <span className="text-[9.5px] text-[#5C615E] font-mono font-medium tracking-widest uppercase mt-0.5">
              Decision Utility
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#5C615E]">
          <a
            href="#problem"
            className="hover:text-[#111414] transition-colors"
          >
            The Problem
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#111414] transition-colors"
          >
            How it Works
          </a>
          <a
            href="#categories"
            className="hover:text-[#111414] transition-colors"
          >
            Categories
          </a>
          <a
            href="#why-unknot"
            className="hover:text-[#111414] transition-colors"
          >
            The Difference
          </a>
          <a
            href="#use-cases"
            className="hover:text-[#111414] transition-colors"
          >
            Use Cases
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="h-9 px-3 text-xs font-medium text-[#111414] hover:text-[#064038] transition-colors flex items-center"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#064038] text-white text-xs font-semibold hover:bg-[#032B25] transition-all shadow-xs active:scale-[0.98]"
          >
            <span>Get started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#111414] hover:bg-[#F2EFEB] border border-transparent hover:border-[#DFDBD1] transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#DFDBD1] bg-[#F2EFEB] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2.5 text-xs font-medium text-[#111414]">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE6DE]"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE6DE]"
            >
              How it Works
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE6DE]"
            >
              Categories
            </a>
            <a
              href="#why-unknot"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE6DE]"
            >
              The Difference
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE6DE]"
            >
              Use Cases
            </a>
          </nav>
          <div className="pt-3 border-t border-[#DFDBD1] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center h-10 px-4 rounded-lg border border-[#DFDBD1] bg-white text-[#111414] text-xs font-semibold hover:bg-[#FAF8F5]"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-[#064038] text-white text-xs font-semibold shadow-xs hover:bg-[#032B25]"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
