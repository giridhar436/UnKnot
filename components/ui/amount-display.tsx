import * as React from "react";
import { formatCurrency, cn } from "@/lib/utils";

interface AmountDisplayProps {
  amount?: number | null;
  size?: "sm" | "md" | "lg" | "xl";
  trend?: "expense" | "investment" | "neutral";
  className?: string;
}

export function AmountDisplay({
  amount,
  size = "md",
  trend = "neutral",
  className,
}: AmountDisplayProps) {
  if (amount === undefined || amount === null) {
    return <span className="text-xs text-[#8A8D8A] font-mono">—</span>;
  }

  const sizeClasses = {
    sm: "text-xs font-semibold",
    md: "text-sm font-bold",
    lg: "text-lg sm:text-xl font-bold tracking-tight",
    xl: "text-2xl sm:text-3xl font-bold tracking-tight",
  };

  const trendClasses = {
    neutral: "text-[#080B10]",
    expense: "text-[#080B10]",
    investment: "text-[#167A5B]",
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
