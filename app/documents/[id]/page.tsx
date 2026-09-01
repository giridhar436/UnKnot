import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FolderTree,
  Tag,
  Share2,
  Trash2,
} from "lucide-react";
import { getDocument, getRelatedDocuments } from "@/lib/services/documents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocumentPreview } from "@/components/documents/document-preview";
import { EntityList } from "@/components/documents/entity-list";
import { DuplicateStatus } from "@/components/documents/duplicate-status";
import { RelatedDocuments } from "@/components/documents/related-documents";
import { formatCurrency, formatDate, formatTimestamp } from "@/lib/utils";

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
          className="text-xs font-semibold text-[#004643] hover:underline flex items-center gap-1.5 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all documents</span>
        </Link>
        <Badge variant="brand" size="md">
          {doc.category}
        </Badge>
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D5CC]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#080B10]">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-xs sm:text-sm text-[#5F625F] mt-1">
              {doc.description}
            </p>
          )}
        </div>

        {doc.amount && (
          <div className="bg-white px-4 py-2 rounded-xl border border-[#D8D5CC] flex-shrink-0">
            <span className="text-[11px] text-[#5F625F] block">
              Recorded Amount
            </span>
            <span className="text-xl font-bold text-[#080B10]">
              {formatCurrency(doc.amount)}
            </span>
          </div>
        )}
      </div>

      {/* Main Grid: Left Column (Entities & Related) + Right Column (Preview & Metadata) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Extracted Information & Connections (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Duplicate Status Box */}
          <DuplicateStatus status={doc.duplicateStatus} />

          {/* Extracted Structured Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#080B10]">
                Extracted Information
              </h2>
              <span className="text-xs text-[#5F625F]">
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
            <h3 className="text-sm font-semibold text-[#080B10]">
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
          <div className="bg-white p-5 rounded-xl border border-[#D8D5CC] space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#080B10]">
              Document Metadata
            </h3>

            <div className="space-y-3 text-xs divide-y divide-[#F0EDE5]">
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#5F625F] flex items-center gap-1.5">
                  <FolderTree className="w-3.5 h-3.5" />
                  Category
                </span>
                <span className="font-semibold text-[#080B10]">
                  {doc.category}
                  {doc.subcategory ? ` / ${doc.subcategory}` : ""}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-[#5F625F] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Document Date
                </span>
                <span className="font-semibold text-[#080B10]">
                  {formatDate(doc.documentDate)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-[#5F625F] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Uploaded At
                </span>
                <span className="font-semibold text-[#080B10]">
                  {formatTimestamp(doc.uploadedAt)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <span className="text-[#5F625F] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Input Type
                </span>
                <span className="font-semibold text-[#080B10] uppercase">
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
