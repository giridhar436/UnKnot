"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
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
          href="/login"
          className="text-xs text-[#5F625F] hover:text-[#080B10] font-medium"
        >
          ← Back to login
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-2xl border border-[#D8D5CC] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#080B10]">
              Reset Password
            </h1>
            <p className="text-xs sm:text-sm text-[#5F625F]">
              Enter your email address and we&rsquo;ll send you instructions to regain access to your account.
            </p>
          </div>

          {submitted ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#E3F0EE] rounded-xl border border-[#004643]/20 flex items-start gap-3 text-xs text-[#004643]">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#167A5B]" />
                <div className="space-y-1">
                  <span className="font-bold text-sm block">Check your inbox</span>
                  <p className="text-[#080B10] leading-relaxed">
                    If an account exists for <strong className="font-mono">{email}</strong>, you will receive password reset instructions.
                  </p>
                </div>
              </div>

              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-[#004643] text-white text-sm font-semibold hover:bg-[#003633] transition-colors shadow-sm"
              >
                <span>Return to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-[#080B10] block"
                >
                  Account Email
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

              <Button
                type="submit"
                disabled={isLoading || !email}
                className="w-full h-11 text-sm font-semibold mt-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-[#E5E2DA] text-center text-xs text-[#5F625F]">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-[#004643] font-semibold hover:underline"
            >
              Sign in
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
