"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LineNavItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface LineNavProps {
  items: LineNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function LineNav({ items, activeId, onChange, className }: LineNavProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-1 border-b border-[#DFDBD1] overflow-x-auto scroll-fade-x scrollbar-none",
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            data-active={isActive}
            className={cn(
              "relative inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium whitespace-nowrap transition-colors select-none",
              isActive
                ? "text-[#064038] font-semibold"
                : "text-[#5C615E] hover:text-[#111414]"
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded text-[10px] font-mono tabular-nums",
                  isActive
                    ? "bg-[#E3ECE8] text-[#064038]"
                    : "bg-[#F2EFEB] text-[#5C615E]"
                )}
              >
                {item.count}
              </span>
            )}
            {/* Sliding line active indicator */}
            {isActive && (
              <span className="absolute bottom-[-1px] left-2 right-2 h-[2px] bg-[#064038] rounded-full transition-all" />
            )}
          </button>
        );
      })}
    </div>
  );
}
