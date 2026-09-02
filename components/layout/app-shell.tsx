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

  // Public routes (landing page, auth) have their own standalone navigation and layout
  const isPublicRoute =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";

  if (isPublicRoute) {
    return <div className="min-h-screen bg-[#FAF8F5] text-[#111414] flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF8F5] text-[#111414]">
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
        type="button"
        onClick={() => setIsUploadOpen(true)}
        className="lg:hidden fixed right-5 bottom-20 z-40 w-12 h-12 rounded-full bg-[#064038] text-white shadow-md flex items-center justify-center cursor-pointer hover:bg-[#032B25] active:scale-95 transition-all"
        aria-label="Add record"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onOpenMenu={() => setIsMoreMenuOpen(true)} />

      {/* Mobile "More" Drawer */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setIsMoreMenuOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-[#FAF8F5] rounded-t-2xl border-t border-[#DFDBD1] p-6 pb-10 shadow-xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DFDBD1] pb-3">
              <span className="font-semibold text-sm text-[#111414]">
                More Destinations
              </span>
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1 text-[#5C615E] hover:text-[#111414] rounded-lg"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <Link
                href="/categories"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DFDBD1] font-medium text-[#111414] hover:border-[#064038]/40"
              >
                <FolderTree className="w-4 h-4 text-[#064038]" />
                <span>Categories &amp; Domains</span>
              </Link>
              <Link
                href="/reminders"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DFDBD1] font-medium text-[#111414] hover:border-[#064038]/40"
              >
                <CalendarClock className="w-4 h-4 text-[#064038]" />
                <span>Reminders &amp; Important Dates</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DFDBD1] font-medium text-[#111414] hover:border-[#064038]/40"
              >
                <Settings className="w-4 h-4 text-[#064038]" />
                <span>Settings &amp; Profile</span>
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
