import * as React from "react";
import {
  FileText,
  Mail,
  Smartphone,
  StickyNote,
  Wrench,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function ProblemSection() {
  const examples = [
    {
      icon: FileText,
      label: "A receipt in one folder",
      detail: "Buried inside Downloads / 2023_scan_final.pdf with an unreadable filename.",
      location: "Downloads / 2023_Receipt_scan_final.pdf",
    },
    {
      icon: Mail,
      label: "A warranty in an email",
      detail: "Locked in a vendor thread from three years ago behind a forgotten login.",
      location: "Inbox / 'Your Extended Protection Confirmation'",
    },
    {
      icon: Wrench,
      label: "A repair invoice somewhere else",
      detail: "Handwritten paper slip stored in a desk drawer after a technician visit.",
      location: "Desk Drawer / Physical Receipt Folders",
    },
    {
      icon: Smartphone,
      label: "An investment statement elsewhere",
      detail: "Quarterly portfolio PDF saved in camera roll screenshots between personal photos.",
      location: "Photos / Screenshots / IMG_4910.PNG",
    },
    {
      icon: StickyNote,
      label: "A bill reminder forgotten",
      detail: "Scrawled in a random note app with no alert, overdue notice arriving later.",
      location: "Notes App / Untitled (14)",
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-[#F2EFEB] border-b border-[#DFDBD1]/80 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-mono font-semibold text-[#064038] tracking-widest uppercase">
            The Reality
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-[#111414] leading-tight">
            Your information isn&rsquo;t missing.{" "}
            <span className="text-[#064038] block sm:inline">It&rsquo;s scattered.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C615E] leading-relaxed font-normal">
            You already saved the invoices, warranties, statements, and policy numbers. But they exist across ten apps, five email threads, and multiple physical drawers.
          </p>
        </div>

        {/* Scattered Examples Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {examples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#DFDBD1] shadow-xs flex flex-col justify-between hover:border-[#064038]/40 transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] text-[#064038] flex items-center justify-center mb-3 border border-[#DFDBD1]/60">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111414]">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#5C615E] mt-1.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#DFDBD1]/60 flex items-center gap-1.5 text-[10.5px] font-mono text-[#888E8A] truncate">
                  <span className="text-[#064038] font-bold">↳</span>
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            );
          })}

          {/* Connected Pivot Card */}
          <div className="p-5 bg-[#064038] text-white rounded-xl shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-[#E3ECE8]" />
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                UnKnot connects the pieces.
              </h3>
              <p className="text-xs text-white/85 leading-relaxed">
                When you actually need the serial number, warranty deadline, or repair history, UnKnot delivers the answer immediately.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 text-xs font-semibold text-[#E3ECE8] flex items-center gap-1">
              <span>One connected repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Editorial Quote Banner */}
        <div className="mt-12 p-6 sm:p-7 bg-[#FAF8F5] rounded-2xl border border-[#DFDBD1] text-center max-w-3xl mx-auto shadow-xs">
          <blockquote className="text-base sm:text-lg font-semibold text-[#111414] leading-relaxed">
            &ldquo;The problem isn&rsquo;t that we don&rsquo;t collect information.
            The problem is understanding how the pieces relate to each other when we need to make a decision.&rdquo;
          </blockquote>
          <p className="text-xs text-[#5C615E] mt-2 font-mono">
            UnKnot transforms disconnected paperwork into actionable context.
          </p>
        </div>
      </div>
    </section>
  );
}
