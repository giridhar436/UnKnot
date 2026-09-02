"use client";

import * as React from "react";
import { ArrowRight, Search } from "lucide-react";
import { Analysis, SuggestedQuestion } from "@/lib/types";
import { AnswerCard } from "./answer-card";
import { SuggestedQuestions } from "./suggested-questions";
import { Button } from "@/components/ui/button";

interface AskViewProps {
  initialSuggested: SuggestedQuestion[];
}

export function AskView({ initialSuggested }: AskViewProps) {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [currentAnalysis, setCurrentAnalysis] = React.useState<Analysis | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);

  const handleAsk = async (textToAsk: string) => {
    if (!textToAsk.trim() || loading) return;
    setLoading(true);
    setQuery(textToAsk);
    setError(null);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: textToAsk }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error?.message || "Failed to process your question");
        setLoading(false);
        return;
      }

      setCurrentAnalysis(data.analysis);
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCurrentAnalysis(null);
    setQuery("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Query Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(query);
        }}
        className="space-y-3"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888E8A] pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your records..."
              className="w-full h-12 pl-11 pr-4 bg-white text-[#111414] placeholder:text-[#888E8A] text-sm rounded-xl border border-[#DFDBD1] shadow-xs focus:outline-none focus:border-[#064038] focus:ring-1 focus:ring-[#064038] transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {currentAnalysis && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs h-10"
              >
                Reset
              </Button>
            )}
            <Button
              type="submit"
              size="md"
              disabled={!query.trim() || loading}
              className="h-10 px-4 text-xs font-semibold"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Query</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-[#FDF0EE] rounded-xl border border-[#BA2D25]/20 text-xs text-[#BA2D25]">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl border border-[#DFDBD1] p-6 space-y-4 animate-pulse">
          <div className="h-4 bg-[#F2EFEB] rounded w-1/4"></div>
          <div className="h-16 bg-[#E3ECE8]/60 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-3.5 bg-[#F2EFEB] rounded w-3/4"></div>
            <div className="h-3.5 bg-[#F2EFEB] rounded w-1/2"></div>
          </div>
          <p className="text-[11px] font-mono text-[#888E8A] text-center pt-2">
            Retrieving relevant records and analyzing context...
          </p>
        </div>
      )}

      {/* Answer View */}
      {!loading && currentAnalysis && (
        <AnswerCard analysis={currentAnalysis} />
      )}

      {/* Suggested Questions Grid */}
      {!loading && (
        <SuggestedQuestions
          questions={initialSuggested}
          onSelect={(q) => handleAsk(q)}
        />
      )}
    </div>
  );
}
