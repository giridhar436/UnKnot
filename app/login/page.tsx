"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("giridhar@example.com");
  const [password, setPassword] = React.useState("••••••••••••");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col justify-between px-4 py-8">
      {/* Brand Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#004643] text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-[#003633] transition-colors">
            U
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg tracking-tight text-[#080B10] leading-none">
              UnKnot
            </span>
            <span className="text-[10px] text-[#5F625F] font-semibold tracking-wider uppercase mt-0.5">
              Decision Utility
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-[#5F625F] hover:text-[#080B10] font-medium"
        >
          ← Back to home
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-2xl border border-[#D8D5CC] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#080B10]">
              Sign in to UnKnot
            </h1>
            <p className="text-xs sm:text-sm text-[#5F625F]">
              Access your connected records, important dates, and decision hub.
            </p>
          </div>

          {/* Prototype Demo Banner */}
          <div className="p-3 bg-[#E3F0EE] rounded-xl border border-[#004643]/20 flex items-start gap-2 text-xs text-[#004643]">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Prototype Ready</span>
              <span>Demo account is pre-filled. Click below to enter the workspace directly.</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#080B10] block"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8D8A]" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-11 pl-10 pr-3.5 bg-[#F7F5EF] text-[#080B10] text-sm rounded-lg border border-[#D8D5CC] focus:outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#080B10] block"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#004643] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8D8A]" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-3.5 bg-[#F7F5EF] text-[#080B10] text-sm rounded-lg border border-[#D8D5CC] focus:outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643] transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-semibold mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E5E2DA] text-center text-xs text-[#5F625F]">
            Don&rsquo;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#004643] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-md w-full mx-auto text-center text-xs text-[#8A8D8A]">
        UnKnot · Personal Information & Decision Utility
      </div>
    </div>
  );
}
