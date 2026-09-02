import * as React from "react";
import {
  FileText,
  MessageSquare,
  Mail,
  Smartphone,
  StickyNote,
  AlertCircle,
} from "lucide-react";

export function ProblemSection() {
  const examples = [
    {
      icon: FileText,
      label: "A warranty buried in an old PDF",
      detail: "Lost somewhere in the Downloads folder on your laptop",
      location: "Downloads / 2023_Receipt_scan_final.pdf",
    },
    {
      icon: MessageSquare,
      label: "A receipt sitting in WhatsApp",
      detail: "Sent by the contractor 6 months ago in a group chat",
      location: "WhatsApp / Chat with Plumber / Media",
    },
    {
      icon: Mail,
      label: "An investment statement in email",
      detail: "Quarterly portfolio PDF locked behind a forgotten password",
      location: "Inbox / 'Your Quarterly Account Summary'",
    },
    {
      icon: Smartphone,
      label: "A medical bill saved as a screenshot",
      detail: "Buried between vacation photos in your camera roll",
      location: "Photos / Screenshots / IMG_4910.PNG",
    },
    {
      icon: StickyNote,
      label: "A payment reminder written in notes",
      detail: "Scrawled in a random note app with no calendar alert",
      location: "Notes App / Untitled (14)",
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-[#F0EDE5] border-b border-[#D8D5CC]/80 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-[#004643] tracking-wider uppercase">
            The Reality of Daily Life
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#080B10] leading-tight">
            Your information isn&rsquo;t missing.{" "}
            <span className="text-[#004643]">It&rsquo;s scattered.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5F625F]">
            You already collected every invoice, document, and policy. But they exist in five different apps, ten folders, and countless threads.
          </p>
        </div>

        {/* Scattered Examples List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#D8D5CC] shadow-xs flex flex-col justify-between hover:border-[#004643]/40 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#F0EDE5] text-[#004643] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#080B10]">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#5F625F] mt-1.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E5E2DA] flex items-center gap-1.5 text-[11px] font-mono text-[#5F625F] truncate">
                  <span className="text-[#004643] font-bold">↳</span>
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            );
          })}

          {/* The Summary Card */}
          <div className="p-5 bg-[#004643] text-white rounded-xl shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-white/15 text-white flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                Friction adds up fast.
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                When you actually need the serial number, the tax amount, or the warranty deadline, you spend 20 minutes searching.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 text-xs font-semibold text-[#A8D5D0]">
              UnKnot eliminates this friction.
            </div>
          </div>
        </div>

        {/* Editorial Takeaway Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F7F5EF] rounded-2xl border border-[#D8D5CC] text-center max-w-3xl mx-auto">
          <blockquote className="text-lg sm:text-xl font-semibold text-[#080B10] leading-snug">
            &ldquo;The problem isn&rsquo;t that we don&rsquo;t have information.
            The problem is finding the right piece of information at the right time.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-[#5F625F] mt-2">
            UnKnot transforms raw files into living, connected records ready whenever life requires a decision.
          </p>
        </div>
      </div>
    </section>
  );
}
