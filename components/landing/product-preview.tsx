"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  FileText,
  AlertCircle,
  TrendingUp,
  Receipt,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";

export function ProductPreview() {
  const [activeTab, setActiveTab] = React.useState<"dashboard" | "record" | "query">("dashboard");

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Interactive Mode Selector */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1.5 p-1 bg-[#E7E3D8] rounded-lg border border-[#D8D5CC]">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "dashboard"
                ? "bg-[#004643] text-white shadow-sm"
                : "text-[#5F625F] hover:text-[#080B10]"
            }`}
          >
            Dashboard View
          </button>
          <button
            onClick={() => setActiveTab("record")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "record"
                ? "bg-[#004643] text-white shadow-sm"
                : "text-[#5F625F] hover:text-[#080B10]"
            }`}
          >
            Connected Record
          </button>
          <button
            onClick={() => setActiveTab("query")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "query"
                ? "bg-[#004643] text-white shadow-sm"
                : "text-[#5F625F] hover:text-[#080B10]"
            }`}
          >
            Natural Query
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#5F625F]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#167A5B]"></span>
          <span>Live Interface Preview</span>
        </div>
      </div>

      {/* Frame Container */}
      <div className="bg-[#F0EDE5] border border-[#D8D5CC] rounded-2xl shadow-xl overflow-hidden">
        {/* Mock Window Topbar */}
        <div className="px-4 py-3 bg-[#E7E3D8] border-b border-[#D8D5CC] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#D8D5CC] border border-[#C2BFB6]/60"></span>
              <span className="w-3 h-3 rounded-full bg-[#D8D5CC] border border-[#C2BFB6]/60"></span>
              <span className="w-3 h-3 rounded-full bg-[#D8D5CC] border border-[#C2BFB6]/60"></span>
            </div>
            <span className="text-[11px] font-medium text-[#5F625F] ml-2 hidden sm:inline">
              app.unknot.local/dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-medium bg-[#E3F0EE] text-[#004643] rounded-full border border-[#004643]/20">
              Workspace: Personal
            </span>
          </div>
        </div>

        {/* Tab 1: Dashboard View */}
        {activeTab === "dashboard" && (
          <div className="p-4 sm:p-6 bg-[#F7F5EF] space-y-6">
            {/* Top Greeting & Ask UnKnot Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D5CC]">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-[#004643] uppercase">
                  Wednesday, September 2
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#080B10] mt-0.5">
                  Good afternoon, Giridhar
                </h3>
                <p className="text-xs text-[#5F625F] mt-0.5">
                  3 important dates approaching · 24 connected records active
                </p>
              </div>

              <div className="flex items-center gap-3 p-2.5 px-3.5 bg-[#004643] text-white rounded-xl shadow-sm text-xs">
                <Sparkles className="w-4 h-4 text-[#A8D5D0]" />
                <div>
                  <span className="font-semibold block">Ask UnKnot</span>
                  <span className="text-[10px] text-white/80 block">
                    &ldquo;When is my laptop warranty ending?&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* Important Today Cards */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#080B10] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#B42318]" />
                  Action Required & Important Dates
                </span>
                <span className="text-[11px] text-[#004643] font-medium">3 items</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-[#D8D5CC] shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-red-50 text-[#B42318] border border-red-200">
                      Due in 3 days
                    </span>
                    <span className="text-xs font-semibold text-[#080B10]">₹2,840</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#080B10] mt-2">
                    Electricity Bill (BESCOM)
                  </h4>
                  <p className="text-[11px] text-[#5F625F] mt-0.5">
                    Account #0488219 · Autopay disabled
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#D8D5CC] shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-[#A66A00] border border-amber-200">
                      Expires Oct 14
                    </span>
                    <span className="text-xs font-semibold text-[#080B10]">Coverage</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#080B10] mt-2">
                    MacBook Pro AppleCare+
                  </h4>
                  <p className="text-[11px] text-[#5F625F] mt-0.5">
                    Hardware & accidental damage plan
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#D8D5CC] shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#245B8F] border border-blue-200">
                      Renewal
                    </span>
                    <span className="text-xs font-semibold text-[#080B10]">Annual</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#080B10] mt-2">
                    HDFC ERGO Health Policy
                  </h4>
                  <p className="text-[11px] text-[#5F625F] mt-0.5">
                    Sum Insured: ₹10,00,000 · Policy #8921
                  </p>
                </div>
              </div>
            </div>

            {/* Two Column Grid: Financial & Recent Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Finance Snapshot */}
              <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-2.5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#004643]" />
                    <span className="text-xs font-semibold text-[#080B10]">
                      Finance & Investments
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#004643]">
                    Structured from 8 files
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]/60">
                    <span className="text-[10px] text-[#5F625F] uppercase font-medium">
                      This Month Spent
                    </span>
                    <p className="text-base font-bold text-[#080B10] mt-0.5">
                      ₹48,250
                    </p>
                    <span className="text-[10px] text-[#167A5B] font-medium">
                      ✓ 14 invoices logged
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]/60">
                    <span className="text-[10px] text-[#5F625F] uppercase font-medium">
                      Tracked Assets
                    </span>
                    <p className="text-base font-bold text-[#080B10] mt-0.5">
                      ₹4,20,000
                    </p>
                    <span className="text-[10px] text-[#5F625F]">
                      Index Funds & PPF
                    </span>
                  </div>
                </div>
              </div>

              {/* Connected Records Snippet */}
              <div className="p-4 bg-white rounded-xl border border-[#D8D5CC] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-2.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#004643]" />
                    <span className="text-xs font-semibold text-[#080B10]">
                      Recent Connected Records
                    </span>
                  </div>
                  <span className="text-[11px] text-[#5F625F]">Auto-structured</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F5EF] text-xs">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-3.5 h-3.5 text-[#5F625F]" />
                      <span className="font-medium text-[#080B10]">Sony WH-1000XM5</span>
                    </div>
                    <span className="text-[11px] text-[#5F625F]">₹26,990 · Warranty 2Y</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7F5EF] text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5F625F]" />
                      <span className="font-medium text-[#080B10]">Vehicle Insurance Policy</span>
                    </div>
                    <span className="text-[11px] text-[#5F625F]">ICICI Lombard · Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Connected Record View */}
        {activeTab === "record" && (
          <div className="p-4 sm:p-6 bg-[#F7F5EF] space-y-4">
            <div className="bg-white p-5 rounded-xl border border-[#D8D5CC] space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E2DA] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E3F0EE] text-[#004643] flex items-center justify-center font-bold">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-[#004643] tracking-wide uppercase">
                      Category: Warranties & Purchases
                    </span>
                    <h4 className="text-base font-bold text-[#080B10]">
                      Apple MacBook Pro 14&rdquo; (M3 Pro)
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded bg-[#E3F0EE] text-[#004643] border border-[#004643]/20">
                    Active Warranty
                  </span>
                </div>
              </div>

              {/* Extracted Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F7F5EF]">
                  <span className="text-[#5F625F] block text-[10px] uppercase">Purchase Date</span>
                  <span className="font-semibold text-[#080B10] mt-0.5 block">Oct 14, 2024</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F7F5EF]">
                  <span className="text-[#5F625F] block text-[10px] uppercase">Amount Paid</span>
                  <span className="font-semibold text-[#080B10] mt-0.5 block">₹1,99,900 (GST Paid)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F7F5EF]">
                  <span className="text-[#5F625F] block text-[10px] uppercase">Merchant</span>
                  <span className="font-semibold text-[#080B10] mt-0.5 block">Apple Store BKC</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F7F5EF]">
                  <span className="text-[#5F625F] block text-[10px] uppercase">Warranty Valid Until</span>
                  <span className="font-semibold text-[#167A5B] mt-0.5 block">Oct 14, 2026 (2 Yrs)</span>
                </div>
              </div>

              {/* Connected Details */}
              <div className="p-3 bg-[#F0EDE5] rounded-lg border border-[#D8D5CC] text-xs space-y-1.5">
                <span className="font-semibold text-[#080B10] block">Connected Files & Details:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-1 bg-white rounded border border-[#D8D5CC] text-[#080B10] text-[11px] flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#004643]" />
                    Original Tax Invoice (PDF)
                  </span>
                  <span className="px-2 py-1 bg-white rounded border border-[#D8D5CC] text-[#080B10] text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#004643]" />
                    AppleCare+ Agreement #AC-9921
                  </span>
                  <span className="px-2 py-1 bg-white rounded border border-[#D8D5CC] text-[#080B10] text-[11px] flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#004643]" />
                    Serial #C02G892KMD6T
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Query View */}
        {activeTab === "query" && (
          <div className="p-4 sm:p-6 bg-[#F7F5EF] space-y-4">
            <div className="bg-white p-5 rounded-xl border border-[#D8D5CC] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 p-3 bg-[#F0EDE5] rounded-xl border border-[#D8D5CC]">
                <Sparkles className="w-4 h-4 text-[#004643]" />
                <span className="text-xs font-semibold text-[#080B10]">
                  User prompt: &ldquo;What did I spend on dental treatment this year and do I have the claim receipt?&rdquo;
                </span>
              </div>

              <div className="p-4 bg-[#F7F5EF] rounded-xl border border-[#D8D5CC] space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#004643] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#167A5B]" />
                  <span>Found 2 connected records in Medical & Health:</span>
                </div>
                <p className="text-[#080B10] leading-relaxed">
                  You spent a total of <strong className="text-[#080B10]">₹14,500</strong> on dental work in 2025 across 2 visits to Clove Dental:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#5F625F] pl-1">
                  <li><strong className="text-[#080B10]">May 12, 2025</strong> — Root Canal Treatment & Consultation: ₹9,500 (Invoice #CD-4410, Claim Submitted)</li>
                  <li><strong className="text-[#080B10]">July 20, 2025</strong> — Crown Fitting: ₹5,000 (Invoice #CD-4890, Receipt Attached)</li>
                </ul>
                <div className="pt-2 border-t border-[#E5E2DA] flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#004643] hover:underline cursor-pointer">
                    → View attached receipts & claim status
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="px-4 py-3 bg-[#E7E3D8] border-t border-[#D8D5CC] flex items-center justify-between text-xs text-[#5F625F]">
          <span>Structured personal record repository</span>
          <Link
            href="/dashboard"
            className="font-semibold text-[#004643] hover:text-[#003633] flex items-center gap-1 group"
          >
            <span>Explore live workspace</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
