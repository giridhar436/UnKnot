"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F5EF]/95 backdrop-blur-sm border-b border-[#D8D5CC]/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#004643] text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-[#003633] transition-colors">
            U
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg tracking-tight text-[#080B10] leading-none">
              UnKnot
            </span>
            <span className="text-[10px] text-[#5F625F] font-semibold tracking-wider uppercase mt-0.5">
              Decision Utility
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5F625F]">
          <a
            href="#problem"
            className="hover:text-[#080B10] transition-colors"
          >
            The Problem
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#080B10] transition-colors"
          >
            How it works
          </a>
          <a
            href="#categories"
            className="hover:text-[#080B10] transition-colors"
          >
            Categories
          </a>
          <a
            href="#why-unknot"
            className="hover:text-[#080B10] transition-colors"
          >
            Why UnKnot
          </a>
          <a
            href="#use-cases"
            className="hover:text-[#080B10] transition-colors"
          >
            Use cases
          </a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="h-10 px-3.5 text-sm font-semibold text-[#080B10] hover:text-[#004643] transition-colors flex items-center"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-[#004643] text-white text-sm font-medium hover:bg-[#003633] transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#080B10] hover:bg-[#F0EDE5] border border-transparent hover:border-[#D8D5CC] transition-colors"
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
        <div className="md:hidden border-b border-[#D8D5CC] bg-[#F0EDE5] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#080B10]">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-[#E7E3D8]"
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-[#E7E3D8]"
            >
              How it works
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-[#E7E3D8]"
            >
              Categories
            </a>
            <a
              href="#why-unknot"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-[#E7E3D8]"
            >
              Why UnKnot
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-[#E7E3D8]"
            >
              Use cases
            </a>
          </nav>
          <div className="pt-3 border-t border-[#D8D5CC] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center h-11 px-4 rounded-lg border border-[#D8D5CC] bg-white text-[#080B10] text-sm font-semibold hover:bg-[#F7F5EF]"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-[#004643] text-white text-sm font-medium shadow-sm hover:bg-[#003633]"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
