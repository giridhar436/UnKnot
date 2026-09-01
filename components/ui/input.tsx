import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#080B10] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "w-full h-11 px-3.5 bg-white text-[#080B10] placeholder:text-[#8A8D8A] text-sm rounded-lg border border-[#D8D5CC] transition-colors focus:outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643] disabled:opacity-50 disabled:bg-[#F7F5EF]",
            error && "border-[#B42318] focus:border-[#B42318] focus:ring-[#B42318]",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-[#5F625F]">{helperText}</p>
        )}
        {error && <p className="text-xs text-[#B42318] font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
