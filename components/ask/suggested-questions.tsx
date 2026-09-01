import * as React from "react";
import { Sparkles } from "lucide-react";
import { SuggestedQuestion } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#080B10]">
        <Sparkles className="w-4 h-4 text-[#004643]" />
        <span>Example Decision & Information Questions</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.text)}
            className="p-3.5 bg-white hover:bg-[#F7F5EF] border border-[#D8D5CC] hover:border-[#004643]/50 rounded-xl text-left transition-all flex flex-col justify-between space-y-2 group cursor-pointer"
          >
            <span className="text-xs font-medium text-[#080B10] group-hover:text-[#004643] leading-snug">
              &ldquo;{q.text}&rdquo;
            </span>
            <div className="flex items-center justify-between">
              <Badge size="sm" variant="outline">
                {q.category}
              </Badge>
              <span className="text-[11px] text-[#004643] font-medium group-hover:underline">
                Ask &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
