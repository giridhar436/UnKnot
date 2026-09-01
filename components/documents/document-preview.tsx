"use client";

import * as React from "react";
import { FileText, Image as ImageIcon, AlignLeft, Eye, Download } from "lucide-react";
import { DocumentType } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface DocumentPreviewProps {
  title: string;
  type: DocumentType;
  description?: string;
  category: string;
}

export function DocumentPreview({
  title,
  type,
  description,
  category,
}: DocumentPreviewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  return (
    <div className="space-y-3">
      {/* File Preview Frame */}
      <div className="bg-[#F0EDE5] border border-[#D8D5CC] rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]">
        {/* Subtle document backdrop badge */}
        <div className="w-16 h-16 rounded-2xl bg-white text-[#004643] flex items-center justify-center shadow-sm mb-3">
          {type === "pdf" && <FileText className="w-8 h-8" />}
          {type === "image" && <ImageIcon className="w-8 h-8" />}
          {type === "text" && <AlignLeft className="w-8 h-8" />}
        </div>

        <h4 className="text-sm font-semibold text-[#080B10] max-w-xs truncate">
          {title}
        </h4>
        <p className="text-xs text-[#5F625F] mt-1">
          {type === "pdf"
            ? "PDF Document (Text/OCR Indexed)"
            : type === "image"
            ? "Image Receipt/Capture"
            : "Structured Text Note"}
        </p>

        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsPreviewOpen(true)}
            className="text-xs"
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Quick Preview
          </Button>
        </div>
      </div>

      {/* Simulated Document Viewer Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-[#D8D5CC] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D8D5CC] pb-3">
              <div>
                <h3 className="font-semibold text-[#080B10]">{title}</h3>
                <span className="text-xs text-[#5F625F]">{category} Document</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsPreviewOpen(false)}
              >
                Close
              </Button>
            </div>

            <div className="bg-[#F7F5EF] p-6 rounded-xl border border-[#D8D5CC] min-h-[250px] flex flex-col justify-center items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#004643]/10 text-[#004643] flex items-center justify-center">
                {type === "pdf" ? <FileText className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
              </div>
              <p className="text-sm font-medium text-[#080B10]">{title}</p>
              <p className="text-xs text-[#5F625F] max-w-md">
                {description || "Original file stored and indexed for contextual query processing."}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setIsPreviewOpen(false)}>
                Done Viewing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
