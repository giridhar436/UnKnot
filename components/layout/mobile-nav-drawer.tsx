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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUpload: () => void;
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

export function MobileNavDrawer({
  isOpen,
  onClose,
  onOpenUpload,
  userName,
  userEmail,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const displayName = userName || "User";
  const displayEmail = userEmail || "";
  const initial = displayName.charAt(0).toUpperCase() || "U";

  // Close drawer on route change
  React.useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleNavClick = () => {
    onClose();
  };

  const handleUploadClick = () => {
    onClose();
    // Small delay to let drawer close animation start
    setTimeout(() => {
      onOpenUpload();
    }, 150);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] bg-[#F2EFEB] border-r border-[#DFDBD1] flex flex-col shadow-xl transition-transform duration-200 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Brand Header with Close Button */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#DFDBD1] shrink-0">
          <Link
            href="/dashboard"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 group"
          >
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
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-[#5C615E] hover:text-[#111414] hover:bg-[#EAE6DE] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Add Action */}
        <div className="px-4 py-3 shrink-0">
          <button
            type="button"
            onClick={handleUploadClick}
            className="w-full flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-[#064038] text-white text-sm font-semibold hover:bg-[#032B25] transition-colors shadow-xs cursor-pointer active:scale-[0.985] min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Record</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px]",
                  isActive
                    ? "bg-[#064038] text-white shadow-xs font-semibold"
                    : "text-[#111414] hover:bg-[#EAE6DE]"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-white" : "text-[#5C615E]"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile Section */}
        <div className="p-4 border-t border-[#DFDBD1] space-y-3 shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/80 border border-[#DFDBD1]/80 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#064038] text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#111414] truncate leading-tight">
                {displayName}
              </p>
              <p className="text-[11px] text-[#5C615E] font-mono truncate">
                {displayEmail || "Authenticated"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-xs font-mono">
            <Link
              href="/settings"
              onClick={handleNavClick}
              className="text-[#5C615E] hover:text-[#111414] transition-colors py-2"
            >
              Settings
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-[#BA2D25] hover:underline font-medium flex items-center gap-1.5 cursor-pointer py-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
