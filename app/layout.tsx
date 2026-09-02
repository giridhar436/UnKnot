import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";

const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UnKnot — Personal Information & Decision Utility",
  description:
    "UnKnot turns scattered receipts, bills, documents, and notes into structured, connected, and actionable knowledge.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UnKnot",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userName = "";
  let userEmail = "";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      userEmail = user.email || "";
      // Try to get full name from profile or user metadata
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      userName =
        profile?.full_name ||
        user.user_metadata?.full_name ||
        userEmail.split("@")[0] ||
        "User";
    }
  } catch {
    // If Supabase is not configured yet, continue without user data
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#064038" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-[#111414]">
        <AppShell userName={userName} userEmail={userEmail}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
