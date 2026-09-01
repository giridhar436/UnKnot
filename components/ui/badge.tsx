import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "outline" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center font-medium transition-colors border select-none";

  const variants = {
    default: "bg-[#F0EDE5] text-[#080B10] border-[#D8D5CC]",
    brand: "bg-[#E3F0EE] text-[#004643] border-[#004643]/20",
    outline: "bg-transparent text-[#5F625F] border-[#D8D5CC]",
    success: "bg-[#EBF7F2] text-[#167A5B] border-[#167A5B]/20",
    warning: "bg-[#FEF7EA] text-[#A66A00] border-[#A66A00]/20",
    danger: "bg-[#FEECEC] text-[#B42318] border-[#B42318]/20",
    info: "bg-[#EBF3FB] text-[#245B8F] border-[#245B8F]/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs rounded-full gap-1",
    md: "px-2.5 py-1 text-xs rounded-full gap-1.5",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
