"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("giridhar@example.com");
  const [password, setPassword] = React.useState("pass12345");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between px-4 py-8">
      {/* Brand Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#064038] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-[#032B25] transition-colors">
            U
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight text-[#111414] leading-none">
              UnKnot
            </span>
            <span className="text-[9.5px] text-[#5C615E] font-mono font-medium tracking-widest uppercase mt-0.5">
              Decision Utility
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-[#5C615E] hover:text-[#111414] font-medium"
        >
          &larr; Back to home
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white rounded-xl border border-[#DFDBD1] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111414]">
              Sign in to UnKnot
            </h1>
            <p className="text-xs text-[#5C615E]">
              Access your connected records, timeline, and decision hub.
            </p>
          </div>

          {/* Prototype Demo Banner */}
          <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#DFDBD1] flex items-start gap-2.5 text-xs text-[#111414]">
            <CheckCircle2 className="w-4 h-4 text-[#1D7A58] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-[#064038] block">Prototype Workspace Pre-filled</span>
              <span className="text-[#5C615E] text-[11px] leading-relaxed">
                Click below to sign in directly with the pre-loaded demo account.
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#111414] block"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888E8A]" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-10 pl-9 pr-3.5 bg-[#FAF8F5] text-[#111414] text-xs font-mono rounded-lg border border-[#DFDBD1] focus:outline-none focus:border-[#064038] focus:ring-1 focus:ring-[#064038] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#111414] block"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-[#064038] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888E8A]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 pl-9 pr-10 bg-[#FAF8F5] text-[#111414] text-xs font-mono rounded-lg border border-[#DFDBD1] focus:outline-none focus:border-[#064038] focus:ring-1 focus:ring-[#064038] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888E8A] hover:text-[#111414] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 text-xs font-semibold mt-1"
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Sign In &amp; Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-3.5 border-t border-[#DFDBD1]/60 text-center text-xs text-[#5C615E]">
            Don&rsquo;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#064038] font-semibold hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-md w-full mx-auto text-center text-xs font-mono text-[#888E8A]">
        UnKnot &bull; Personal Information &amp; Decision Utility
      </div>
    </div>
  );
}
