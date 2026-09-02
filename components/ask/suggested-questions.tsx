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
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111414]">
        <Sparkles className="w-4 h-4 text-[#064038]" />
        <span className="font-mono text-[11px]">Example Decision & Information Questions</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.text)}
            className="p-3.5 bg-white hover:bg-[#F2EFEB] border border-[#DFDBD1] hover:border-[#064038]/50 rounded-xl text-left transition-all flex flex-col justify-between space-y-2 group cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <span className="text-xs font-medium text-[#111414] group-hover:text-[#064038] leading-snug">
              &ldquo;{q.text}&rdquo;
            </span>
            <div className="flex items-center justify-between w-full">
              <Badge size="sm" variant="outline">
                {q.category}
              </Badge>
              <span className="text-[11px] text-[#064038] font-mono font-medium group-hover:underline">
                Query &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
