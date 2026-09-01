import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#004643] text-white hover:bg-[#003633] border border-[#004643] shadow-sm",
      secondary:
        "bg-[#F0EDE5] text-[#080B10] hover:bg-[#E7E3D8] border border-[#D8D5CC]",
      outline:
        "bg-transparent text-[#004643] border border-[#004643] hover:bg-[#E3F0EE]",
      ghost:
        "bg-transparent text-[#080B10] hover:bg-[#F0EDE5] border border-transparent",
      danger:
        "bg-[#B42318] text-white hover:bg-[#991B1B] border border-[#B42318] shadow-sm",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5 min-h-[36px]",
      md: "h-10 px-4 text-sm rounded-lg gap-2 min-h-[44px]", // touch target >= 44px
      lg: "h-12 px-6 text-base rounded-lg gap-2.5 min-h-[48px]",
      icon: "h-10 w-10 min-h-[44px] min-w-[44px] rounded-lg p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
