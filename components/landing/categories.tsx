import * as React from "react";
import {
  Wallet,
  Receipt,
  TrendingUp,
  HeartPulse,
  ShieldCheck,
  ShoppingBag,
  FileText,
  Wrench,
  FolderTree,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function Categories() {
  const categories = [
    {
      name: "Finance",
      icon: Wallet,
      count: "Statements, accounts, loans",
      description: "Bank statements, account summaries, recurring fees, and credit records.",
      tag: "Verified Extraction",
    },
    {
      name: "Investments",
      icon: TrendingUp,
      count: "SIPs, PPF, FDs, gold",
      description: "Mutual fund statements, recurring deposits, and equity portfolios separated from spending.",
      tag: "Preserved Type & Amount",
    },
    {
      name: "Medical",
      icon: HeartPulse,
      count: "Prescriptions, bills, claims",
      description: "Consultation bills, diagnostic lab reports, pharmacy bills, and insurance claims.",
      tag: "Health Records",
    },
    {
      name: "Purchases",
      icon: ShoppingBag,
      count: "Electronics, retail, appliances",
      description: "High-value retail invoices, merchant receipts, and proof of purchase.",
      tag: "Cost & Merchant",
    },
    {
      name: "Warranties",
      icon: ShieldCheck,
      count: "Manufacturer, extended care",
      description: "Coverage agreements, serial numbers, protection terms, and expiry deadlines.",
      tag: "Actionable Deadlines",
    },
    {
      name: "Bills",
      icon: Receipt,
      count: "Utilities, rent, internet",
      description: "Electricity, broadband, municipal charges, maintenance, and due dates.",
      tag: "Upcoming Dues",
    },
    {
      name: "Repairs",
      icon: Wrench,
      count: "Automotive, appliance service",
      description: "Car service logs, appliance maintenance bills, and technician work orders.",
      tag: "Service History",
    },
    {
      name: "Documents",
      icon: FileText,
      count: "Agreements, IDs, certificates",
      description: "Rental agreements, identity cards, vehicle registration, and ownership records.",
      tag: "Secure Storage",
    },
    {
      name: "Other",
      icon: FolderTree,
      count: "Custom life paperwork",
      description: "Pet vaccination records, memberships, club logs, and miscellaneous receipts.",
      tag: "Extensible",
    },
  ];

  return (
    <section id="categories" className="py-20 md:py-28 bg-[#F2EFEB] border-b border-[#DFDBD1]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-[11px] font-mono font-semibold text-[#064038] tracking-widest uppercase">
            Information Domains
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-[#111414]">
            What UnKnot understands
          </h2>
          <p className="text-sm sm:text-base text-[#5C615E] leading-relaxed">
            Every major domain of your everyday paperwork, structured into clear, connected categories rather than arbitrary folder hierarchies.
          </p>
        </div>

        {/* Editorial Categories Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#DFDBD1] shadow-xs flex flex-col justify-between hover:border-[#064038]/50 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DFDBD1] text-[#064038] flex items-center justify-center group-hover:bg-[#064038] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10.5px] font-mono text-[#5C615E] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DFDBD1]/60">
                      {cat.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#111414] group-hover:text-[#064038] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#5C615E] mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DFDBD1]/60 flex items-center justify-between text-[11px] text-[#888E8A] font-mono">
                  <span className="truncate">{cat.count}</span>
                  <span className="text-[#064038] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064038] hover:text-[#032B25] transition-colors"
          >
            <span>View all information domains in the workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
