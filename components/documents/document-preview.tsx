"use client";

import * as React from "react";
import { FileText, Image as ImageIcon, AlignLeft, Eye, ExternalLink } from "lucide-react";
import { DocumentType } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface DocumentPreviewProps {
  title: string;
  type: DocumentType;
  description?: string;
  category: string;
  fileUrl?: string;
}

export function DocumentPreview({
  title,
  type,
  description,
  category,
  fileUrl,
}: DocumentPreviewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  return (
    <div className="space-y-3">
      {/* File Preview Frame */}
      <div className="bg-[#F2EFEB] border border-[#DFDBD1] rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[220px]">
        <div className="w-16 h-16 rounded-2xl bg-white text-[#064038] flex items-center justify-center shadow-xs mb-3 border border-[#DFDBD1]">
          {type === "pdf" && <FileText className="w-8 h-8" />}
          {type === "image" && <ImageIcon className="w-8 h-8" />}
          {type === "text" && <AlignLeft className="w-8 h-8" />}
        </div>

        <h4 className="text-sm font-semibold text-[#111414] max-w-xs truncate">
          {title}
        </h4>
        <p className="text-xs text-[#5A605C] mt-1">
          {type === "pdf"
            ? "PDF Document (Text/OCR Indexed)"
            : type === "image"
            ? "Image Receipt/Capture"
            : "Structured Text Note"}
        </p>

        <div className="flex gap-2 mt-4">
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md bg-[#064038] text-white hover:bg-[#032B25] transition-colors gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Original
            </a>
          )}
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

      {/* Document Viewer Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-[#DFDBD1] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EAE6DE] pb-3">
              <div>
                <h3 className="font-semibold text-[#111414]">{title}</h3>
                <span className="text-xs text-[#5A605C]">{category} Document</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsPreviewOpen(false)}
              >
                Close
              </Button>
            </div>

            {fileUrl && type === "image" ? (
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#DFDBD1] flex items-center justify-center">
                <img
                  src={fileUrl}
                  alt={title}
                  className="max-h-[400px] max-w-full rounded-lg object-contain"
                />
              </div>
            ) : fileUrl && type === "pdf" ? (
              <div className="bg-[#FAF8F5] rounded-xl border border-[#DFDBD1] overflow-hidden">
                <iframe
                  src={fileUrl}
                  className="w-full h-[400px]"
                  title={title}
                />
              </div>
            ) : (
              <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#DFDBD1] min-h-[250px] flex flex-col justify-center items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#E3ECE8] text-[#064038] flex items-center justify-center">
                  {type === "pdf" ? <FileText className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
                </div>
                <p className="text-sm font-medium text-[#111414]">{title}</p>
                <p className="text-xs text-[#5A605C] max-w-md">
                  {description || "Original file stored and indexed for contextual query processing."}
                </p>
              </div>
            )}

            <div className="flex justify-between pt-2">
              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-[#064038] font-semibold hover:underline gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open original file
                </a>
              )}
              <div className="flex justify-end ml-auto">
                <Button size="sm" onClick={() => setIsPreviewOpen(false)}>
                  Done Viewing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
