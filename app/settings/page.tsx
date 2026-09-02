"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Shield,
  Bell,
  Palette,
  KeyRound,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LineNav, LineNavItem } from "@/components/ui/line-nav";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("account");
  const [warrantyAlerts, setWarrantyAlerts] = React.useState(true);
  const [billReminders, setBillReminders] = React.useState(true);
  const [duplicateFlags, setDuplicateFlags] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        setUserName(
          profile?.full_name ||
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "User"
        );
      }
    }
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const initial = userName.charAt(0).toUpperCase() || "U";

  const navItems: LineNavItem[] = [
    { id: "account", label: "Account", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Data & Privacy", icon: Shield },
    { id: "security", label: "Security", icon: KeyRound },
  ];

  return (
    <div className="page-container space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-3 border-b border-[#DFDBD1] space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#111414]">
          Settings &amp; Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#5C615E]">
          Manage account details, notification thresholds, visual preferences, and data privacy.
        </p>
      </div>

      {/* ChanhDai Line Nav Tab Strip */}
      <LineNav
        items={navItems}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab 1: Account */}
      {activeTab === "account" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#DFDBD1] p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFDBD1]/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#064038] text-white flex items-center justify-center font-bold text-sm">
                  {initial}
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#111414]">
                    {userName || "Loading..."}
                  </h2>
                  <span className="text-xs text-[#5C615E] font-mono">
                    {userEmail || "Loading..."}
                  </span>
                </div>
              </div>
              <Badge variant="brand" size="xs">
                Active Session
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1]/70">
                <span className="text-[#888E8A] font-mono text-[10px] uppercase block">
                  Default Currency
                </span>
                <span className="font-semibold text-xs text-[#111414] mt-0.5 block">
                  INR (&#8377;) &bull; Indian Rupee
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1]/70">
                <span className="text-[#888E8A] font-mono text-[10px] uppercase block">
                  Date Format
                </span>
                <span className="font-semibold text-xs text-[#111414] mt-0.5 block font-mono">
                  DD MMM YYYY (e.g. 02 Sep 2026)
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#5C615E]">
                Personal Decision Utility
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1.5 text-[#BA2D25]"
                onClick={handleSignOut}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Appearance */}
      {activeTab === "appearance" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#DFDBD1] p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-[#111414]">
              Design System Palette
            </h2>
            <p className="text-xs text-[#5C615E]">
              UnKnot uses an editorial, calm visual system optimized for document legibility and decision clarity.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg border border-[#DFDBD1] space-y-1">
                <div className="w-full h-8 rounded bg-[#064038]"></div>
                <span className="text-[10px] font-mono block font-bold text-[#111414]">Deep Evergreen</span>
                <span className="text-[9px] font-mono text-[#888E8A] block">#064038</span>
              </div>
              <div className="p-3 rounded-lg border border-[#DFDBD1] space-y-1">
                <div className="w-full h-8 rounded bg-[#FAF8F5] border border-[#DFDBD1]"></div>
                <span className="text-[10px] font-mono block font-bold text-[#111414]">Warm Ivory</span>
                <span className="text-[9px] font-mono text-[#888E8A] block">#FAF8F5</span>
              </div>
              <div className="p-3 rounded-lg border border-[#DFDBD1] space-y-1">
                <div className="w-full h-8 rounded bg-[#111414]"></div>
                <span className="text-[10px] font-mono block font-bold text-[#111414]">Deep Charcoal</span>
                <span className="text-[9px] font-mono text-[#888E8A] block">#111414</span>
              </div>
              <div className="p-3 rounded-lg border border-[#DFDBD1] space-y-1">
                <div className="w-full h-8 rounded bg-[#B85D3B]"></div>
                <span className="text-[10px] font-mono block font-bold text-[#111414]">Warm Terracotta</span>
                <span className="text-[9px] font-mono text-[#888E8A] block">#B85D3B</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#5C615E] font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1D7A58]" />
              <span>Typography: Geist Sans + Geist Mono (Active)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#DFDBD1] p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-[#111414]">
              Deadline &amp; Alert Thresholds
            </h2>

            <div className="space-y-3 divide-y divide-[#DFDBD1]/60">
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h4 className="text-xs font-bold text-[#111414]">Warranty Expiry Alerts</h4>
                  <p className="text-[11px] text-[#5C615E]">Notify 30 days and 7 days prior to warranty expiration.</p>
                </div>
                <input
                  type="checkbox"
                  checked={warrantyAlerts}
                  onChange={(e) => setWarrantyAlerts(e.target.checked)}
                  className="w-4 h-4 accent-[#064038] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-[#111414]">Bill Due Reminders</h4>
                  <p className="text-[11px] text-[#5C615E]">Surface upcoming utilities and dues 5 days before due date.</p>
                </div>
                <input
                  type="checkbox"
                  checked={billReminders}
                  onChange={(e) => setBillReminders(e.target.checked)}
                  className="w-4 h-4 accent-[#064038] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-[#111414]">Duplicate Detection Warnings</h4>
                  <p className="text-[11px] text-[#5C615E]">Flag uploaded invoices or receipts that match existing entries.</p>
                </div>
                <input
                  type="checkbox"
                  checked={duplicateFlags}
                  onChange={(e) => setDuplicateFlags(e.target.checked)}
                  className="w-4 h-4 accent-[#064038] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Privacy */}
      {activeTab === "privacy" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#DFDBD1] p-6 space-y-3 shadow-xs">
            <h2 className="text-sm font-bold text-[#111414]">
              Data Privacy &amp; Repository Isolation
            </h2>
            <p className="text-xs text-[#5C615E] leading-relaxed">
              UnKnot operates on privacy-by-design principles. Documents and extracted records remain strictly isolated to your private account.
            </p>

            <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#064038] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#1D7A58]" />
                <span>Zero Public AI Training</span>
              </div>
              <p className="text-[11px] text-[#5C615E] leading-relaxed">
                Your uploaded documents, contracts, bank statements, and medical notes are never used to train generalized foundation models.
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#064038] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#1D7A58]" />
                <span>Row Level Security</span>
              </div>
              <p className="text-[11px] text-[#5C615E] leading-relaxed">
                All data is isolated at the database level using Supabase Row Level Security. No user can access another user&rsquo;s records.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Security */}
      {activeTab === "security" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#DFDBD1] p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-[#111414]">
              Session &amp; Authentication Security
            </h2>
            <p className="text-xs text-[#5C615E]">
              Your session is managed by Supabase Auth with secure, HTTP-only cookies.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1]">
                <span className="text-[#5C615E]">Auth Provider</span>
                <span className="font-semibold text-[#111414]">Supabase Auth</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1]">
                <span className="text-[#5C615E]">Session Type</span>
                <span className="font-semibold text-[#111414]">Server-side cookie</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
