import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error loading this information. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-[#B42318]/20 rounded-xl bg-[#FEECEC]/30 my-4">
      <div className="w-12 h-12 rounded-full bg-[#FEECEC] flex items-center justify-center text-[#B42318] mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#080B10] mb-1">{title}</h3>
      <p className="text-xs text-[#5F625F] max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="md">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try again
        </Button>
      )}
    </div>
  );
}

export function LoadingState({
  text = "Loading information...",
}: {
  text?: string;
}) {
  return (
    <div className="space-y-4 p-6 animate-pulse">
      <div className="h-6 bg-[#E7E3D8] rounded w-1/3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-[#E7E3D8] rounded"></div>
        <div className="h-4 bg-[#E7E3D8] rounded w-5/6"></div>
        <div className="h-4 bg-[#E7E3D8] rounded w-4/6"></div>
      </div>
      <p className="text-xs text-[#8A8D8A] text-center pt-2">{text}</p>
    </div>
  );
}
