"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  FolderTree,
  Sparkles,
  Wallet,
  CalendarClock,
  Settings,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onOpenUpload?: () => void;
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

export function Sidebar({ onOpenUpload }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-[#F0EDE5] border-r border-[#D8D5CC] h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#D8D5CC]">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#004643] text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-[#003633] transition-colors">
            U
          </div>
          <div>
            <span className="font-semibold text-lg tracking-tight text-[#080B10]">
              UnKnot
            </span>
            <span className="block text-[10px] text-[#5F625F] -mt-1 font-medium tracking-wide">
              DECISION UTILITY
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Add Button */}
      <div className="px-4 py-4">
        <button
          onClick={onOpenUpload}
          className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[#004643] text-white text-sm font-medium hover:bg-[#003633] transition-colors shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#004643] text-white shadow-sm font-semibold"
                  : "text-[#080B10] hover:bg-[#E7E3D8] hover:text-[#080B10]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-white" : "text-[#5F625F]"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Snippet */}
      <div className="p-4 border-t border-[#D8D5CC] space-y-2">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/60 border border-[#D8D5CC]/60">
          <div className="w-8 h-8 rounded-full bg-[#004643] text-white flex items-center justify-center text-xs font-semibold">
            G
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#080B10] truncate">
              Giridhar
            </p>
            <p className="text-[10px] text-[#5F625F] truncate">
              Demo Session
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-[11px]">
          <Link
            href="/settings"
            className="text-[#5F625F] hover:text-[#080B10] transition-colors"
          >
            Settings
          </Link>
          <Link
            href="/login"
            className="text-[#B42318] hover:underline font-medium"
          >
            Sign out
          </Link>
        </div>
      </div>
    </aside>
  );
}
