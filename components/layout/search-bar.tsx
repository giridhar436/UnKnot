"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

export function SearchBar({
  className,
  placeholder = "Search documents, entities, merchants, amounts...",
  onSearch,
  initialValue = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else if (query.trim()) {
      router.push(`/documents?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center w-full", className)}
    >
      <Search className="absolute left-3 w-3.5 h-3.5 text-[#888E8A] pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full h-9 pl-8 pr-8 bg-[#F2EFEB]/80 hover:bg-[#F2EFEB] focus:bg-white text-xs text-[#111414] placeholder:text-[#888E8A] rounded-lg border border-[#DFDBD1] transition-colors focus:outline-none focus:border-[#064038] focus:ring-1 focus:ring-[#064038]"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 p-1 text-[#888E8A] hover:text-[#111414] rounded-md transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </form>
  );
}
