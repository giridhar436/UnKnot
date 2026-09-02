import * as React from "react";
import { formatCurrency, cn } from "@/lib/utils";

interface AmountDisplayProps {
  amount?: number | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  trend?: "expense" | "investment" | "terracotta" | "neutral";
  className?: string;
}

export function AmountDisplay({
  amount,
  size = "md",
  trend = "neutral",
  className,
}: AmountDisplayProps) {
  if (amount === undefined || amount === null) {
    return <span className="text-xs text-[#888E8A] font-mono">—</span>;
  }

  const sizeClasses = {
    xs: "text-xs font-medium",
    sm: "text-xs font-semibold",
    md: "text-sm font-bold tracking-tight",
    lg: "text-lg sm:text-xl font-bold tracking-tight",
    xl: "text-2xl sm:text-3xl font-bold tracking-tight",
  };

  const trendClasses = {
    neutral: "text-[#111414]",
    expense: "text-[#111414]",
    investment: "text-[#064038]",
    terracotta: "text-[#B85D3B]",
  };

  return (
    <span
      className={cn(
        "font-mono tabular-nums",
        sizeClasses[size],
        trendClasses[trend],
        className
      )}
    >
      {formatCurrency(amount)}
    </span>
  );
}
