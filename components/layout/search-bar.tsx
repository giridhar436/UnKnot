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
  placeholder = "Search documents, entities, amounts...",
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
      <Search className="absolute left-3 w-4 h-4 text-[#5F625F] pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-9 bg-[#F0EDE5]/60 hover:bg-[#F0EDE5] focus:bg-white text-sm text-[#080B10] placeholder:text-[#8A8D8A] rounded-lg border border-[#D8D5CC] transition-colors focus:outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643]"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 p-1 text-[#8A8D8A] hover:text-[#080B10] rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}
