"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  Camera,
  AlignLeft,
  CheckCircle2,
  ArrowRight,
  Upload,
  AlertTriangle,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "select" | "uploading" | "processing" | "completed" | "error";

interface UploadResult {
  recordId: string;
  status: string;
  extracted?: {
    title: string;
    category: string;
    amount?: number;
    currency?: string;
    document_date?: string;
    merchant?: string;
    product?: string;
    warranty_expiry?: string;
  };
  warning?: string;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const router = useRouter();
  const [mode, setMode] = React.useState<"pdf" | "image" | "text">("image");
  const [step, setStep] = React.useState<Step>("select");
  const [textInput, setTextInput] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [processStage, setProcessStage] = React.useState<number>(0);
  const [result, setResult] = React.useState<UploadResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const pdfInputRef = React.useRef<HTMLInputElement>(null);

  const processingStages = [
    { label: "File received", doneText: "File received" },
    { label: "Reading document (OCR/Parser)", doneText: "Extracted raw content" },
    { label: "Extracting structured entities", doneText: "Identified Product, Date, Amount" },
    { label: "Categorizing information", doneText: "Classified record" },
    { label: "Checking for duplicates", doneText: "Duplicate check complete" },
  ];

  const handleReset = () => {
    setStep("select");
    setTextInput("");
    setSelectedFile(null);
    setProcessStage(0);
    setResult(null);
    setError(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const startProcessingAnimation = () => {
    setProcessStage(0);
    const interval = setInterval(() => {
      setProcessStage((prev) => {
        if (prev < processingStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 800);
    return interval;
  };

  const uploadFile = async (file: File) => {
    setStep("uploading");
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    const interval = startProcessingAnimation();
    setStep("processing");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      clearInterval(interval);
      setProcessStage(processingStages.length);

      if (!data.success) {
        setError(data.error?.message || "Upload failed");
        setStep("error");
        return;
      }

      setResult(data);
      setTimeout(() => setStep("completed"), 400);
    } catch {
      clearInterval(interval);
      setError("Network error. Please try again.");
      setStep("error");
    }
  };

  const submitText = async () => {
    if (!textInput.trim()) return;

    setStep("processing");
    setSelectedFile(null);
    const interval = startProcessingAnimation();

    try {
      const formData = new FormData();
      formData.append("text", textInput.trim());

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      clearInterval(interval);
      setProcessStage(processingStages.length);

      if (!data.success) {
        setError(data.error?.message || "Processing failed");
        setStep("error");
        return;
      }

      setResult(data);
      setTimeout(() => setStep("completed"), 400);
    } catch {
      clearInterval(interval);
      setError("Network error. Please try again.");
      setStep("error");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number | undefined, currency: string = "INR") => {
    if (!amount) return "—";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === "select"
          ? "Add to UnKnot"
          : step === "processing" || step === "uploading"
          ? "Processing Document"
          : step === "completed"
          ? "Document Processed & Saved"
          : step === "error"
          ? "Processing Error"
          : "Add to UnKnot"
      }
      description={
        step === "select"
          ? "Upload a document, receipt image, or paste note to extract structured data."
          : undefined
      }
      maxWidth="md"
    >
      {step === "select" && (
        <div className="space-y-6">
          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileSelect}
          />
          <input
            ref={pdfInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#F2EFEB] rounded-xl border border-[#DFDBD1]">
            <button
              type="button"
              onClick={() => setMode("image")}
              className={cn(
                "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all min-h-[44px]",
                mode === "image"
                  ? "bg-[#064038] text-white shadow-xs"
                  : "text-[#111414] hover:bg-white/50"
              )}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Image</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("pdf")}
              className={cn(
                "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all min-h-[44px]",
                mode === "pdf"
                  ? "bg-[#064038] text-white shadow-xs"
                  : "text-[#111414] hover:bg-white/50"
              )}
            >
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("text")}
              className={cn(
                "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all min-h-[44px]",
                mode === "text"
                  ? "bg-[#064038] text-white shadow-xs"
                  : "text-[#111414] hover:bg-white/50"
              )}
            >
              <AlignLeft className="w-4 h-4" />
              <span>Text</span>
            </button>
          </div>

          {/* Mode Content */}
          {mode === "image" && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#064038]/30 hover:border-[#064038] bg-[#FAF8F5] rounded-xl p-8 text-center cursor-pointer transition-all hover:bg-[#E3ECE8]/30 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#E3ECE8] text-[#064038] flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-[#111414]">
                  Click to upload receipt or photo
                </p>
                <p className="text-xs text-[#5A605C] mt-1">
                  Supports JPG, PNG, WEBP up to 10MB
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Camera className="w-4 h-4 mr-2 text-[#064038]" />
                  Take Photo
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <ImageIcon className="w-4 h-4 mr-2 text-[#064038]" />
                  Choose Image
                </Button>
              </div>
            </div>
          )}

          {mode === "pdf" && (
            <div className="space-y-4">
              <div
                onClick={() => pdfInputRef.current?.click()}
                className="border-2 border-dashed border-[#064038]/30 hover:border-[#064038] bg-[#FAF8F5] rounded-xl p-8 text-center cursor-pointer transition-all hover:bg-[#E3ECE8]/30 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#E3ECE8] text-[#064038] flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-[#111414]">
                  Click to select PDF document
                </p>
                <p className="text-xs text-[#5A605C] mt-1">
                  Invoices, statements, warranty cards, policies
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => pdfInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select PDF File
              </Button>
            </div>
          )}

          {mode === "text" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitText();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#111414] uppercase tracking-wider mb-2">
                  Paste or type information
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="e.g. Bought Dell Laptop for ₹72,000 on 15 March 2024 with 2 years warranty until 15 Mar 2026."
                  className="w-full h-32 p-3 text-sm bg-white text-[#111414] placeholder:text-[#888E8A] rounded-lg border border-[#DFDBD1] focus:outline-none focus:border-[#064038] focus:ring-1 focus:ring-[#064038] resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={!textInput.trim()}
                className="w-full"
              >
                Process and Save
              </Button>
            </form>
          )}
        </div>
      )}

      {(step === "processing" || step === "uploading") && (
        <div className="py-4 space-y-6">
          <div className="flex items-center gap-3 p-3 bg-[#F2EFEB] rounded-xl border border-[#DFDBD1]">
            <div className="w-10 h-10 rounded-lg bg-[#064038] text-white flex items-center justify-center text-xs font-bold">
              {mode === "pdf" ? "PDF" : mode === "image" ? "IMG" : "TXT"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#111414] truncate">
                {selectedFile?.name || "Text Record"}
              </p>
              <p className="text-xs text-[#5A605C]">
                Asynchronous extraction pipeline
              </p>
            </div>
          </div>

          {/* Processing Stages Checklist */}
          <div className="space-y-3 pl-2">
            {processingStages.map((stage, idx) => {
              const isCompleted = processStage > idx;
              const isActive = processStage === idx;

              return (
                <div key={stage.label} className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#167A5B] flex-shrink-0" />
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#064038] border-t-transparent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#DFDBD1] flex-shrink-0" />
                  )}
                  <span
                    className={cn(
                      "text-xs transition-colors",
                      isCompleted
                        ? "text-[#167A5B] font-medium"
                        : isActive
                        ? "text-[#111414] font-semibold"
                        : "text-[#888E8A]"
                    )}
                  >
                    {isCompleted ? stage.doneText : stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === "completed" && result && (
        <div className="py-2 space-y-5">
          <div className="p-4 bg-[#E3F3EC] border border-[#167A5B]/20 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#167A5B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#111414]">
                Extracted & Categorized Successfully
              </p>
              <p className="text-xs text-[#5A605C] mt-0.5">
                The document was processed, entities connected, and added to your
                knowledge base.
              </p>
            </div>
          </div>

          {result.warning && (
            <div className="p-3 bg-[#FDF1EC] border border-[#B85D3B]/25 rounded-xl text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#B85D3B] shrink-0 mt-0.5" />
              <span className="text-[#5C615E]">{result.warning}</span>
            </div>
          )}

          {/* Extracted Preview */}
          {result.extracted && (
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#DFDBD1] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#111414]">
                  Extracted Summary
                </span>
                <Badge variant="brand">{result.extracted.category}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                {result.extracted.product && (
                  <div>
                    <span className="text-[#5A605C] block">Product</span>
                    <span className="font-semibold text-[#111414]">
                      {result.extracted.product}
                    </span>
                  </div>
                )}
                {result.extracted.merchant && (
                  <div>
                    <span className="text-[#5A605C] block">Merchant</span>
                    <span className="font-semibold text-[#111414]">
                      {result.extracted.merchant}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-[#5A605C] block">Amount</span>
                  <span className="font-semibold text-[#111414]">
                    {formatCurrency(result.extracted.amount, result.extracted.currency)}
                  </span>
                </div>
                <div>
                  <span className="text-[#5A605C] block">Document Date</span>
                  <span className="font-semibold text-[#111414]">
                    {formatDate(result.extracted.document_date)}
                  </span>
                </div>
                {result.extracted.warranty_expiry && (
                  <div>
                    <span className="text-[#5A605C] block">Warranty Expiry</span>
                    <span className="font-semibold text-[#111414]">
                      {formatDate(result.extracted.warranty_expiry)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={handleReset}
              className="flex-1"
            >
              Add Another
            </Button>
            <Button
              onClick={() => {
                handleClose();
                if (result.recordId) {
                  router.push(`/documents/${result.recordId}`);
                } else {
                  router.push("/documents");
                }
                router.refresh();
              }}
              className="flex-1"
            >
              <span>View Document</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}

      {step === "error" && (
        <div className="py-4 space-y-5">
          <div className="p-4 bg-[#FDF0EE] border border-[#BA2D25]/20 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#BA2D25] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#111414]">
                Processing Failed
              </p>
              <p className="text-xs text-[#5A605C] mt-0.5">
                {error || "An unexpected error occurred while processing your document."}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={handleReset}
              className="flex-1"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
