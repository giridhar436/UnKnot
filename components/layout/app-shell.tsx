"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { MobileNavDrawer } from "./mobile-nav-drawer";
import { UploadModal } from "@/components/upload/upload-modal";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
}

export function AppShell({ children, userName, userEmail }: AppShellProps) {
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const pathname = usePathname();

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
      <Sidebar
        onOpenUpload={() => setIsUploadOpen(true)}
        userName={userName}
        userEmail={userEmail}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        <TopBar
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenMenu={() => setIsDrawerOpen(true)}
        />

        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onOpenMenu={() => setIsDrawerOpen(true)} />

      {/* Mobile Navigation Drawer (left side) */}
      <MobileNavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenUpload={() => setIsUploadOpen(true)}
        userName={userName}
        userEmail={userEmail}
      />

      {/* Global Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
}
