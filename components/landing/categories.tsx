import * as React from "react";
import {
  Wallet,
  Receipt,
  TrendingUp,
  HeartPulse,
  ShieldCheck,
  ShoppingBag,
  FileText,
  CalendarClock,
  Wrench,
  FolderTree,
} from "lucide-react";

export function Categories() {
  const categories = [
    {
      name: "Finance",
      icon: Wallet,
      description: "Bank statements, account records, recurring fees, and loans.",
      examples: "Account summaries, credit reports, loan schedules",
    },
    {
      name: "Bills & Utilities",
      icon: Receipt,
      description: "Electricity, internet, water, maintenance dues, and municipal taxes.",
      examples: "BESCOM bills, quarterly broadband, society dues",
    },
    {
      name: "Investments",
      icon: TrendingUp,
      description: "Mutual fund statements, fixed deposits, gold bonds, and portfolio notes.",
      examples: "CAMS summaries, PPF receipts, equity dividend records",
    },
    {
      name: "Medical & Health",
      icon: HeartPulse,
      description: "Prescriptions, health insurance policies, diagnostic reports, and claims.",
      examples: "Lab test results, hospital discharge bills, policy cards",
    },
    {
      name: "Warranties",
      icon: ShieldCheck,
      description: "Appliance warranties, gadget coverage plans, and extended guarantees.",
      examples: "AppleCare agreements, AC warranty cards, TV invoices",
    },
    {
      name: "Purchases",
      icon: ShoppingBag,
      description: "High-value retail invoices, order receipts, and proof of purchase.",
      examples: "Electronics receipts, furniture orders, vehicle delivery slips",
    },
    {
      name: "Documents & ID",
      icon: FileText,
      description: "Agreements, certificates, rental leases, and registration papers.",
      examples: "Rental contracts, vehicle RC, property deed copies",
    },
    {
      name: "Reminders & Dates",
      icon: CalendarClock,
      description: "Payment due dates, policy renewal deadlines, and service milestones.",
      examples: "Car insurance renewals, tax filing dates, subscription end dates",
    },
    {
      name: "Repairs & Maintenance",
      icon: Wrench,
      description: "Car service history, appliance repair bills, and contractor receipts.",
      examples: "Vehicle service invoices, plumbing bills, carpentry receipts",
    },
    {
      name: "Other Important Records",
      icon: FolderTree,
      description: "Any custom record or life paperwork that requires quick retrieval.",
      examples: "Club memberships, pet vaccination logs, school fees",
    },
  ];

  return (
    <section id="categories" className="py-20 md:py-28 bg-[#F0EDE5] border-b border-[#D8D5CC]/80 scroll-mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-[#004643] tracking-wider uppercase">
            Universal Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080B10]">
            What UnKnot understands
          </h2>
          <p className="text-base sm:text-lg text-[#5F625F]">
            Every major domain of your everyday paperwork, structured into clear, searchable categories.
          </p>
        </div>

        {/* Clean Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#D8D5CC] shadow-xs flex flex-col justify-between hover:border-[#004643]/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E3F0EE] text-[#004643] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base font-bold text-[#080B10]">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5F625F] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E2DA] flex items-center justify-between text-[11px] text-[#5F625F]">
                  <span className="font-semibold text-[#004643]">Examples:</span>
                  <span className="truncate ml-2 text-right">{cat.examples}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
