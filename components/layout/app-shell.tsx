"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderTree,
  CalendarClock,
  Settings,
  X,
  Plus,
} from "lucide-react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { UploadModal } from "@/components/upload/upload-modal";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = React.useState(false);
  const [prevPath, setPrevPath] = React.useState<string | null>(null);
  const pathname = usePathname();

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsMoreMenuOpen(false);
  }

  // Landing page has its own standalone navigation and footer
  if (pathname === "/") {
    return <div className="min-h-screen bg-[#F7F5EF] text-[#080B10] flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#F7F5EF] text-[#080B10]">
      {/* Desktop Sidebar */}
      <Sidebar onOpenUpload={() => setIsUploadOpen(true)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <TopBar onOpenUpload={() => setIsUploadOpen(true)} />

        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => setIsUploadOpen(true)}
        className="lg:hidden fixed right-5 bottom-20 z-40 w-14 h-14 rounded-full bg-[#004643] text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#003633] active:scale-95 transition-all"
        aria-label="Add record"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onOpenMenu={() => setIsMoreMenuOpen(true)} />

      {/* Mobile "More" Drawer */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setIsMoreMenuOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-[#F0EDE5] rounded-t-2xl border-t border-[#D8D5CC] p-6 pb-10 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8D5CC] pb-3">
              <span className="font-semibold text-base text-[#080B10]">
                More Destinations
              </span>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1 text-[#5F625F] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/categories"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D8D5CC] text-sm font-medium text-[#080B10]"
              >
                <FolderTree className="w-5 h-5 text-[#004643]" />
                <span>Categories</span>
              </Link>
              <Link
                href="/reminders"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D8D5CC] text-sm font-medium text-[#080B10]"
              >
                <CalendarClock className="w-5 h-5 text-[#004643]" />
                <span>Reminders & Important Dates</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D8D5CC] text-sm font-medium text-[#080B10]"
              >
                <Settings className="w-5 h-5 text-[#004643]" />
                <span>Settings & Profile</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
}
