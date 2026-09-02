"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Bell } from "lucide-react";
import { SearchBar } from "./search-bar";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onOpenUpload: () => void;
}

export function TopBar({ onOpenUpload }: TopBarProps) {
  return (
    <header className="h-16 bg-[#FAF8F5] border-b border-[#DFDBD1] px-4 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Mobile brand text */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#064038] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            U
          </div>
          <span className="font-semibold text-base text-[#111414]">
            UnKnot
          </span>
        </Link>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-lg hidden sm:block">
        <SearchBar />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/reminders"
          className="p-2 text-[#5C615E] hover:text-[#111414] hover:bg-[#F2EFEB] rounded-lg transition-colors relative min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Important dates and reminders"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#B85D3B]" />
        </Link>

        <Button
          onClick={onOpenUpload}
          size="md"
          className="gap-1.5 h-9 text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Record</span>
        </Button>
      </div>
    </header>
  );
}
