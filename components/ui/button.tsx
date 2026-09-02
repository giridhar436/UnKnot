import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "terracotta" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.985] text-center";

    const variants = {
      primary:
        "bg-[#064038] text-white hover:bg-[#032B25] border border-[#064038] shadow-xs",
      secondary:
        "bg-[#F2EFEB] text-[#111414] hover:bg-[#EAE6DE] border border-[#DFDBD1]",
      outline:
        "bg-white/80 text-[#111414] hover:bg-[#F2EFEB] border border-[#DFDBD1] hover:border-[#CCC7BB]",
      ghost:
        "bg-transparent text-[#111414] hover:bg-[#F2EFEB] border border-transparent",
      terracotta:
        "bg-[#B85D3B] text-white hover:bg-[#9E4B2C] border border-[#B85D3B] shadow-xs",
      danger:
        "bg-[#BA2D25] text-white hover:bg-[#991B1B] border border-[#BA2D25] shadow-xs",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5 min-h-[36px]",
      md: "h-10 px-4 text-xs font-semibold rounded-lg gap-2 min-h-[44px]", // touch target >= 44px
      lg: "h-11 px-5 text-sm font-semibold rounded-lg gap-2.5 min-h-[44px]",
      icon: "h-10 w-10 min-h-[44px] min-w-[44px] rounded-lg p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
