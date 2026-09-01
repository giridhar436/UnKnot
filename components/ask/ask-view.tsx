"use client";

import * as React from "react";
import { Sparkles, ArrowRight, RotateCcw, Search } from "lucide-react";
import { Analysis, SuggestedQuestion } from "@/lib/types";
import { askQuestion } from "@/lib/services/ask";
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

  const handleAsk = async (textToAsk: string) => {
    if (!textToAsk.trim() || loading) return;
    setLoading(true);
    setQuery(textToAsk);

    // Realistic short intentional synthesis delay (400ms)
    setTimeout(async () => {
      const res = await askQuestion(textToAsk);
      setCurrentAnalysis(res);
      setLoading(false);
    }, 450);
  };

  const handleClear = () => {
    setCurrentAnalysis(null);
    setQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(query);
        }}
        className="space-y-3"
      >
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-[#5F625F] pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a decision question or query your records (e.g. medicine spending, warranty status)..."
            className="w-full h-14 pl-12 pr-28 bg-white text-[#080B10] placeholder:text-[#8A8D8A] text-sm sm:text-base rounded-xl border border-[#D8D5CC] shadow-sm focus:outline-none focus:border-[#004643] focus:ring-1 focus:ring-[#004643] transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1.5">
            {currentAnalysis && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs"
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
                  <span>Ask</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-[#D8D5CC] p-6 space-y-4 animate-pulse">
          <div className="h-5 bg-[#E7E3D8] rounded w-1/4"></div>
          <div className="h-20 bg-[#E3F0EE]/60 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#E7E3D8] rounded w-3/4"></div>
            <div className="h-4 bg-[#E7E3D8] rounded w-1/2"></div>
          </div>
          <p className="text-xs text-[#8A8D8A] text-center pt-2">
            Synthesizing structured records and analyzing context...
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
