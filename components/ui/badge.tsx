import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "outline" | "terracotta" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center font-medium transition-colors border select-none leading-none";

  const variants = {
    default: "bg-[#F2EFEB] text-[#111414] border-[#DFDBD1]",
    brand: "bg-[#E3ECE8] text-[#064038] border-[#064038]/20",
    outline: "bg-transparent text-[#5C615E] border-[#DFDBD1]",
    terracotta: "bg-[#FDF1EC] text-[#B85D3B] border-[#B85D3B]/25",
    success: "bg-[#EBF7F1] text-[#1D7A58] border-[#1D7A58]/20",
    warning: "bg-[#FDF1EC] text-[#B85D3B] border-[#B85D3B]/25",
    danger: "bg-[#FDF0EE] text-[#BA2D25] border-[#BA2D25]/20",
    info: "bg-[#EDF5FA] text-[#23587B] border-[#23587B]/20",
  };

  const dotColors = {
    default: "bg-[#5C615E]",
    brand: "bg-[#064038]",
    outline: "bg-[#888E8A]",
    terracotta: "bg-[#B85D3B]",
    success: "bg-[#1D7A58]",
    warning: "bg-[#B85D3B]",
    danger: "bg-[#BA2D25]",
    info: "bg-[#23587B]",
  };

  const sizes = {
    xs: "px-1.5 py-0.5 text-[10px] rounded-md gap-1",
    sm: "px-2 py-0.5 text-[11px] rounded-md gap-1.5",
    md: "px-2.5 py-1 text-xs rounded-lg gap-1.5",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
