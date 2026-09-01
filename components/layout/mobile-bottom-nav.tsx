"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  Sparkles,
  Wallet,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  onOpenMenu?: () => void;
}

const mobileItems = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Files", href: "/documents", icon: Files },
  { name: "Ask", href: "/ask", icon: Sparkles },
  { name: "Finance", href: "/finance", icon: Wallet },
];

export function MobileBottomNav({ onOpenMenu }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F0EDE5] border-t border-[#D8D5CC] pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-2 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 items-center justify-around h-14">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-h-[44px] py-1 rounded-lg transition-colors",
                isActive
                  ? "text-[#004643] font-semibold"
                  : "text-[#5F625F] hover:text-[#080B10]"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[11px] mt-1">{item.name}</span>
            </Link>
          );
        })}

        {/* More Menu trigger */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 rounded-lg text-[#5F625F] hover:text-[#080B10] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[11px] mt-1">More</span>
        </button>
      </div>
    </nav>
  );
}
