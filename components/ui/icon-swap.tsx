"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface IconSwapProps {
  isSwapped: boolean;
  defaultIcon: React.ReactNode;
  swappedIcon: React.ReactNode;
  className?: string;
}

export function IconSwap({
  isSwapped,
  defaultIcon,
  swappedIcon,
  className,
}: IconSwapProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center w-4 h-4 overflow-hidden",
        className
      )}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-200",
          isSwapped
            ? "opacity-0 scale-75 -translate-y-2 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0"
        )}
      >
        {defaultIcon}
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-200",
          isSwapped
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-2 pointer-events-none"
        )}
      >
        {swappedIcon}
      </span>
    </span>
  );
}
