import * as React from "react";
import {
  User,
  Shield,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="page-container space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#D8D5CC]">
        <h1 className="text-2xl font-bold text-[#080B10]">
          Settings &amp; Information
        </h1>
        <p className="text-xs sm:text-sm text-[#5F625F] mt-1">
          Application configuration, user profile, and Phase 1 prototype details.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-[#D8D5CC] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0EDE5]">
            <User className="w-5 h-5 text-[#004643]" />
            <h2 className="text-base font-semibold text-[#080B10]">
              User Profile
            </h2>
            <Badge variant="brand" size="sm" className="ml-auto">
              Demo Session
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#5F625F] block">Name</span>
              <span className="font-semibold text-sm text-[#080B10]">
                Giridhar
              </span>
            </div>
            <div>
              <span className="text-[#5F625F] block">Email</span>
              <span className="font-semibold text-sm text-[#080B10] font-mono">
                user@unknot.app
              </span>
            </div>
            <div>
              <span className="text-[#5F625F] block">Default Currency</span>
              <span className="font-semibold text-sm text-[#080B10]">
                INR (₹) — Indian Rupee
              </span>
            </div>
            <div>
              <span className="text-[#5F625F] block">Date Format</span>
              <span className="font-semibold text-sm text-[#080B10] font-mono">
                DD MMM YYYY (e.g. 12 Aug 2026)
              </span>
            </div>
          </div>
        </div>

        {/* Phase 1 Prototype Architecture Card */}
        <div className="bg-white rounded-xl border border-[#D8D5CC] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0EDE5]">
            <Layers className="w-5 h-5 text-[#004643]" />
            <h2 className="text-base font-semibold text-[#080B10]">
              Prototype Architecture
            </h2>
          </div>

          <div className="space-y-3 text-xs text-[#5F625F] leading-relaxed">
            <p>
              This is the <strong>Frontend Prototype</strong> of UnKnot. It establishes the design system, information architecture, typed service contracts, and interactive decision flows.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]">
                <span className="font-semibold text-[#080B10] block mb-1">
                  Design System
                </span>
                <span>Cyprus &amp; Sand palette, minimal typography, 44px+ touch targets.</span>
              </div>
              <div className="p-3 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]">
                <span className="font-semibold text-[#080B10] block mb-1">
                  Service Layer
                </span>
                <span>Typed interfaces in <code>lib/types</code> ready for Phase 2 API swap.</span>
              </div>
              <div className="p-3 bg-[#F7F5EF] rounded-lg border border-[#D8D5CC]">
                <span className="font-semibold text-[#080B10] block mb-1">
                  Context Engine
                </span>
                <span>Demonstrating decision analysis and evidence-backed answers.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Trust Card */}
        <div className="bg-white rounded-xl border border-[#D8D5CC] p-6 space-y-3 text-xs text-[#5F625F] shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F0EDE5]">
            <Shield className="w-5 h-5 text-[#004643]" />
            <h2 className="text-base font-semibold text-[#080B10]">
              Privacy &amp; Trust Principles
            </h2>
          </div>
          <p className="leading-relaxed">
            UnKnot operates on privacy-by-design principles. User documents and extracted records remain isolated to your account.
          </p>
        </div>
      </div>
    </div>
  );
}
