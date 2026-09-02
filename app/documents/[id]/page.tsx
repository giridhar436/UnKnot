import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FolderTree,
  Tag,
} from "lucide-react";
import { getDocument, getRelatedDocuments } from "@/lib/services/documents";
import { Badge } from "@/components/ui/badge";
import { AmountDisplay } from "@/components/ui/amount-display";
import { DocumentPreview } from "@/components/documents/document-preview";
import { EntityList } from "@/components/documents/entity-list";
import { DuplicateStatus } from "@/components/documents/duplicate-status";
import { RelatedDocuments } from "@/components/documents/related-documents";
import { formatDate, formatTimestamp } from "@/lib/utils";

interface DocumentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { id } = await params;
  const doc = await getDocument(id);

  if (!doc) {
    notFound();
  }

  const relatedDocs = await getRelatedDocuments(doc.id);

  return (
    <div className="page-container space-y-6 max-w-5xl">
      {/* Back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/documents"
          className="text-xs font-semibold text-[#064038] hover:underline flex items-center gap-1.5 min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all documents</span>
        </Link>
        <Badge variant="brand" size="md">
          {doc.category}
        </Badge>
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFDBD1]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111414]">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-xs sm:text-sm text-[#5C615E] mt-0.5">
              {doc.description}
            </p>
          )}
        </div>

        {doc.amount && (
          <div className="bg-white px-4 py-2.5 rounded-xl border border-[#DFDBD1] shrink-0 shadow-xs">
            <span className="text-[10px] uppercase font-mono font-medium text-[#5C615E] block">
              Recorded Amount
            </span>
            <AmountDisplay amount={doc.amount} size="lg" />
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Extracted Information & Connections (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Duplicate Status Box */}
          <DuplicateStatus status={doc.duplicateStatus} />

          {/* Extracted Structured Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#DFDBD1]/60">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
                Extracted Information
              </h2>
              <span className="text-xs font-mono text-[#5C615E]">
                {doc.entities.length} entities identified
              </span>
            </div>
            <EntityList entities={doc.entities} />
          </div>

          {/* Related Documents / Connected Context */}
          <RelatedDocuments relatedDocs={relatedDocs} />
        </div>

        {/* Right Column: Original Document Preview & Metadata (1 col) */}
        <div className="space-y-6">
          {/* File Preview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
              Original Document
            </h3>
            <DocumentPreview
              title={doc.title}
              type={doc.type}
              category={doc.category}
              description={doc.description}
            />
          </div>

          {/* Classification & Metadata Card */}
          <div className="bg-white p-5 rounded-xl border border-[#DFDBD1] space-y-4 shadow-xs">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111414]">
              Document Metadata
            </h3>

            <div className="space-y-3 text-xs divide-y divide-[#DFDBD1]/60">
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#5C615E] flex items-center gap-1.5">
                  <FolderTree className="w-3.5 h-3.5 text-[#064038]" />
                  Category
                </span>
                <span className="font-semibold text-[#111414]">
                  {doc.category}
                  {doc.subcategory ? ` / ${doc.subcategory}` : ""}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-[#5C615E] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#064038]" />
                  Document Date
                </span>
                <span className="font-semibold text-[#111414] font-mono">
                  {formatDate(doc.documentDate)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-[#5C615E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#064038]" />
                  Uploaded At
                </span>
                <span className="font-semibold text-[#111414] font-mono">
                  {formatTimestamp(doc.uploadedAt)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-[#5C615E] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#064038]" />
                  Input Type
                </span>
                <span className="font-semibold text-[#111414] uppercase font-mono">
                  {doc.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
