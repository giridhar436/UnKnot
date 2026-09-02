"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Receipt,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Link2,
} from "lucide-react";
import { AmountDisplay } from "@/components/ui/amount-display";

export function ProductPreview() {
  const [activeTab, setActiveTab] = React.useState<"connected" | "dashboard" | "query">("connected");

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Interactive Mode Selector (Line Nav style) */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1 p-1 bg-[#F2EFEB] rounded-lg border border-[#DFDBD1]">
          <button
            type="button"
            onClick={() => setActiveTab("connected")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "connected"
                ? "bg-[#064038] text-white shadow-xs font-semibold"
                : "text-[#5C615E] hover:text-[#111414]"
            }`}
          >
            Connected Records
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "dashboard"
                ? "bg-[#064038] text-white shadow-xs font-semibold"
                : "text-[#5C615E] hover:text-[#111414]"
            }`}
          >
            Command Center
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("query")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "query"
                ? "bg-[#064038] text-white shadow-xs font-semibold"
                : "text-[#5C615E] hover:text-[#111414]"
            }`}
          >
            Decision Query
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#5C615E] font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-[#1D7A58]"></span>
          <span>Live Workspace View</span>
        </div>
      </div>

      {/* Frame Container */}
      <div className="bg-white border border-[#DFDBD1] rounded-2xl shadow-md overflow-hidden">
        {/* Subtle Window Topbar */}
        <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-[#DFDBD1] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DFDBD1] border border-[#CCC7BB]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DFDBD1] border border-[#CCC7BB]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DFDBD1] border border-[#CCC7BB]"></span>
            </div>
            <span className="text-[11px] font-mono text-[#888E8A] ml-2 hidden sm:inline">
              unknot.app/workspace/giridhar
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10.5px] font-mono font-medium bg-[#E3ECE8] text-[#064038] rounded-md border border-[#064038]/15">
              4 Connected Entities
            </span>
          </div>
        </div>

        {/* Tab 1: Connected Records — Demonstrating the core concept */}
        {activeTab === "connected" && (
          <div className="p-5 sm:p-7 bg-[#FAF8F5] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DFDBD1]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#064038] font-semibold">
                  Root Record &bull; Electronics &amp; Purchases
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#111414] mt-0.5">
                  Apple MacBook Pro 16&quot; (M3 Max)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#5C615E]">Purchased: 15 Oct 2024</span>
                <AmountDisplay amount={249900} size="md" />
              </div>
            </div>

            {/* Visual Connections Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative">
              {/* Connection 1: Warranty */}
              <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-3 relative hover:border-[#064038]/40 transition-colors shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#064038] bg-[#E3ECE8] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#064038]" />
                    Warranty Active
                  </span>
                  <Link2 className="w-3.5 h-3.5 text-[#888E8A]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111414]">AppleCare+ Coverage</h4>
                  <p className="text-[11px] text-[#5C615E] mt-0.5">
                    Valid until <strong className="text-[#111414] font-mono">14 Oct 2027</strong>
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DFDBD1]/60 text-[10.5px] text-[#888E8A] font-mono flex items-center justify-between">
                  <span>Policy #AC-88910</span>
                  <span className="text-[#1D7A58]">Zero deductible</span>
                </div>
              </div>

              {/* Connection 2: Repair History */}
              <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-3 relative hover:border-[#064038]/40 transition-colors shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C615E] bg-[#F2EFEB] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-[#5C615E]" />
                    Service History
                  </span>
                  <Link2 className="w-3.5 h-3.5 text-[#888E8A]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111414]">Display Panel Replacement</h4>
                  <p className="text-[11px] text-[#5C615E] mt-0.5">
                    Authorized Service Center &bull; 12 Mar 2025
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DFDBD1]/60 text-[10.5px] text-[#888E8A] font-mono flex items-center justify-between">
                  <span>Inv #AP-7731</span>
                  <span className="font-semibold text-[#111414]">Covered by AC+</span>
                </div>
              </div>

              {/* Connection 3: Expense & Tax deduction */}
              <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-3 relative hover:border-[#064038]/40 transition-colors shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B85D3B] bg-[#FDF1EC] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Receipt className="w-3 h-3 text-[#B85D3B]" />
                    Tax &amp; Asset Entry
                  </span>
                  <Link2 className="w-3.5 h-3.5 text-[#888E8A]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111414]">GST Input Claim Filed</h4>
                  <p className="text-[11px] text-[#5C615E] mt-0.5">
                    18% GST Claimed: <span className="font-mono text-[#111414]">₹38,120</span>
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DFDBD1]/60 text-[10.5px] text-[#888E8A] font-mono flex items-center justify-between">
                  <span>GSTIN verified</span>
                  <span className="text-[#1D7A58]">Audited</span>
                </div>
              </div>
            </div>

            {/* Connection Takeaway Box */}
            <div className="p-3.5 bg-[#E3ECE8]/60 border border-[#064038]/20 rounded-xl text-xs text-[#064038] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1D7A58] shrink-0" />
                <span>
                  <strong>One connected record</strong> instead of three disconnected files in different folders.
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#064038] hidden sm:inline">
                Indexed in seconds
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Command Center */}
        {activeTab === "dashboard" && (
          <div className="p-5 sm:p-7 bg-[#FAF8F5] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DFDBD1]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#064038] font-semibold">
                  Wednesday, September 2
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#111414] mt-0.5">
                  Information Command Center
                </h3>
              </div>
              <div className="text-xs text-[#5C615E] font-mono">
                3 urgent actions pending
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#B85D3B] bg-[#FDF1EC] px-2 py-0.5 rounded-md uppercase font-mono">
                    Due in 3 days
                  </span>
                  <AmountDisplay amount={2840} size="sm" />
                </div>
                <h4 className="text-xs font-bold text-[#111414]">Electricity Bill (BESCOM)</h4>
                <p className="text-[11px] text-[#5C615E]">Account #0488219 &bull; Due Sep 8</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#1D7A58] bg-[#EBF7F1] px-2 py-0.5 rounded-md uppercase font-mono">
                    SIP Active
                  </span>
                  <AmountDisplay amount={5000} size="sm" trend="investment" />
                </div>
                <h4 className="text-xs font-bold text-[#111414]">Parag Parikh Flexi Cap</h4>
                <p className="text-[11px] text-[#5C615E]">Monthly SIP &bull; Executed on 1st</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#DFDBD1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#064038] bg-[#E3ECE8] px-2 py-0.5 rounded-md uppercase font-mono">
                    Renewal
                  </span>
                  <span className="text-[11px] font-mono text-[#888E8A]">Oct 15</span>
                </div>
                <h4 className="text-xs font-bold text-[#111414]">HDFC Health Suraksha</h4>
                <p className="text-[11px] text-[#5C615E]">Policy #9921 &bull; Premium ₹14,200</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Decision Query */}
        {activeTab === "query" && (
          <div className="p-5 sm:p-7 bg-[#FAF8F5] space-y-5">
            <div className="p-3.5 bg-white rounded-xl border border-[#DFDBD1] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#111414]">
                &ldquo;Should I repair this phone screen or is it under warranty?&rdquo;
              </span>
              <span className="text-[10px] font-mono text-[#064038] bg-[#E3ECE8] px-2 py-0.5 rounded">
                Grounded Query
              </span>
            </div>

            <div className="p-4 bg-[#E3ECE8]/50 border border-[#064038]/20 rounded-xl space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#064038] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#1D7A58]" />
                <span>Synthesized Decision Support:</span>
              </div>
              <p className="text-[#111414] leading-relaxed">
                Your <strong>Samsung Galaxy S24 Ultra</strong> was purchased on <strong>12 Feb 2024</strong> for <strong>₹1,29,999</strong>. The standard 1-year manufacturer warranty expired on 12 Feb 2025. However, your records show an active <strong>Samsung Care+ Screen Protection</strong> plan valid until <strong>11 Feb 2026</strong>.
              </p>
              <div className="pt-2 border-t border-[#064038]/15 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#5C615E]">
                  Action: File claim under Care+ (#SC-4910) rather than paying ₹24,000 out of pocket.
                </span>
                <span className="text-[#064038] font-semibold cursor-pointer hover:underline">
                  View Policy &rarr;
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="px-4 py-3 bg-[#FAF8F5] border-t border-[#DFDBD1] flex items-center justify-between text-xs text-[#5C615E]">
          <span className="font-mono text-[11px]">UnKnot Decision System</span>
          <Link
            href="/dashboard"
            className="font-semibold text-[#064038] hover:text-[#032B25] flex items-center gap-1 group"
          >
            <span>Explore live workspace</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
