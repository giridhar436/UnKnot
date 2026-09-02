"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Menu } from "lucide-react";
import { SearchBar } from "./search-bar";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "./notification-bell";

interface TopBarProps {
  onOpenUpload: () => void;
  onOpenMenu?: () => void;
}

export function TopBar({ onOpenUpload, onOpenMenu }: TopBarProps) {
  return (
    <header
      className="h-14 bg-[#FAF8F5] border-b border-[#DFDBD1] px-4 lg:px-8 flex items-center justify-between gap-3 sticky top-0 z-20"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        height: "calc(3.5rem + env(safe-area-inset-top, 0px))",
      }}
    >
      {/* Mobile: Brand + Hamburger */}
      <div className="flex items-center gap-2 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 min-h-[44px]">
          <div className="w-7 h-7 rounded-lg bg-[#064038] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            U
          </div>
          <span className="font-semibold text-base text-[#111414]">
            UnKnot
          </span>
        </Link>
      </div>

      {/* Desktop: Global Search */}
      <div className="flex-1 max-w-lg hidden lg:block">
        <SearchBar />
      </div>

      {/* Desktop: Brand (when no search) */}
      <div className="hidden lg:flex items-center gap-2.5 mr-auto lg:mr-0">
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

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <NotificationBell />

        {/* Desktop Add Record button */}
        <Button
          onClick={onOpenUpload}
          size="md"
          className="gap-1.5 h-9 text-xs hidden sm:flex"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Record</span>
        </Button>

        {/* Mobile: Mobile Add Record (icon only) */}
        <button
          type="button"
          onClick={onOpenUpload}
          className="sm:hidden p-2 text-white bg-[#064038] rounded-lg hover:bg-[#032B25] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Add record"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Mobile: Hamburger menu button */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="lg:hidden p-2 text-[#5C615E] hover:text-[#111414] hover:bg-[#F2EFEB] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open navigation menu"
          aria-expanded={false}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
