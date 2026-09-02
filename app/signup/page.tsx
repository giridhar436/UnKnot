"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = React.useState("Giridhar");
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
              Create your UnKnot account
            </h1>
            <p className="text-xs sm:text-sm text-[#5F625F]">
              Start turning scattered paperwork into structured, actionable knowledge.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-[#080B10] block"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8D8A]" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full h-11 pl-10 pr-3.5 bg-[#F7F5EF] text-[#080B10] text-sm rounded-lg border border-[#D8D5CC] focus:outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643] transition-all"
                />
              </div>
            </div>

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
              <label
                htmlFor="password"
                className="text-xs font-semibold text-[#080B10] block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8D8A]" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full h-11 pl-10 pr-3.5 bg-[#F7F5EF] text-[#080B10] text-sm rounded-lg border border-[#D8D5CC] focus:outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643] transition-all"
                />
              </div>
            </div>

            <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#D8D5CC] text-[11px] text-[#5F625F] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#004643] shrink-0 mt-0.5" />
              <span>
                Your records are stored securely for your personal utility. No data selling, no public AI training.
              </span>
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
                  <span>Create Account & Enter</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E5E2DA] text-center text-xs text-[#5F625F]">
            Already have an account?{" "}
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
