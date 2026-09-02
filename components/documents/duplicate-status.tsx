import * as React from "react";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";
import { DuplicateStatus as DupStatusType } from "@/lib/types";

interface DuplicateStatusProps {
  status: DupStatusType;
}

export function DuplicateStatus({ status }: DuplicateStatusProps) {
  if (status === "none") {
    return (
      <div className="flex items-center gap-2 text-xs text-[#167A5B] bg-[#EBF7F2] border border-[#167A5B]/20 px-3 py-1.5 rounded-lg">
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
        <span>No duplicate records detected</span>
      </div>
    );
  }

  if (status === "possible") {
    return (
      <div className="flex items-start gap-2.5 text-xs text-[#B07219] bg-[#F9F1E2] border border-[#B07219]/25 p-3 rounded-lg">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block">Possible Duplicate Record</span>
          <span className="text-[#5A605C] text-[11px] block mt-0.5">
            A similar merchant or amount was found in another document. No automatic deletion occurs.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 text-xs text-[#B42318] bg-[#FDE8E8] border border-[#B42318]/25 p-3 rounded-lg">
      <AlertOctagon className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold block">High-Confidence Duplicate</span>
        <span className="text-[#5A605C] text-[11px] block mt-0.5">
          Identical invoice number and date found. Please verify which document is the primary record.
        </span>
      </div>
    </div>
  );
}
