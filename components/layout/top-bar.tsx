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
    <header className="h-16 bg-[#F7F5EF] border-b border-[#D8D5CC] px-4 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Mobile brand text */}
      <div className="flex items-center gap-2 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#004643] text-white flex items-center justify-center font-bold text-sm">
            U
          </div>
          <span className="font-semibold text-base text-[#080B10]">
            UnKnot
          </span>
        </Link>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-lg hidden sm:block">
        <SearchBar />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/reminders"
          className="p-2 text-[#5F625F] hover:text-[#080B10] hover:bg-[#F0EDE5] rounded-lg transition-colors relative min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#A66A00]" />
        </Link>

        <Button
          onClick={onOpenUpload}
          size="md"
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </div>
    </header>
  );
}
