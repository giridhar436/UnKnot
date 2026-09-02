"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  FolderTree,
  Sparkles,
  Wallet,
  CalendarClock,
  Settings,
  Plus,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface SidebarProps {
  onOpenUpload?: () => void;
  userName?: string;
  userEmail?: string;
}

const navItems = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Files", href: "/documents", icon: Files },
  { name: "Categories", href: "/categories", icon: FolderTree },
  { name: "Ask UnKnot", href: "/ask", icon: Sparkles },
  { name: "Finance", href: "/finance", icon: Wallet },
  { name: "Reminders", href: "/reminders", icon: CalendarClock },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ onOpenUpload, userName, userEmail }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const displayName = userName || "User";
  const displayEmail = userEmail || "";
  const initial = displayName.charAt(0).toUpperCase() || "U";

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-[#F2EFEB] border-r border-[#DFDBD1] h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-[#DFDBD1]">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#064038] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-[#032B25] transition-colors">
            U
          </div>
          <div>
            <span className="font-semibold text-base tracking-tight text-[#111414] block leading-none">
              UnKnot
            </span>
            <span className="text-[9px] text-[#888E8A] font-mono font-medium tracking-widest uppercase">
              DECISION UTILITY
            </span>
          </div>
        </Link>
      </div>

      {/* Primary Add Action */}
      <div className="px-3.5 py-3.5">
        <button
          type="button"
          onClick={onOpenUpload}
          className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[#064038] text-white text-xs font-semibold hover:bg-[#032B25] transition-colors shadow-xs cursor-pointer active:scale-[0.985]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                isActive
                  ? "bg-[#064038] text-white shadow-xs font-semibold"
                  : "text-[#111414] hover:bg-[#EAE6DE]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-white" : "text-[#5C615E]"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Snippet */}
      <div className="p-3.5 border-t border-[#DFDBD1] space-y-2">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/80 border border-[#DFDBD1]/80 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-[#064038] text-white flex items-center justify-center text-xs font-semibold">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#111414] truncate leading-tight">
              {displayName}
            </p>
            <p className="text-[10px] text-[#5C615E] font-mono truncate">
              {displayEmail || "Authenticated"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-[11px] font-mono">
          <Link
            href="/settings"
            className="text-[#5C615E] hover:text-[#111414] transition-colors"
          >
            Settings
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-[#BA2D25] hover:underline font-medium flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
