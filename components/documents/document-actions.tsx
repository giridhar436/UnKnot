"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { renameRecord, deleteRecord } from "@/lib/actions/records";
import { useRouter } from "next/navigation";

interface DocumentActionsProps {
  documentId: string;
  currentTitle: string;
}

export function DocumentActions({
  documentId,
  currentTitle,
}: DocumentActionsProps) {
  const router = useRouter();
  const [isRenameOpen, setIsRenameOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(currentTitle);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleRename = async () => {
    if (!newTitle.trim() || newTitle.trim() === currentTitle) {
      setIsRenameOpen(false);
      return;
    }
    setIsSaving(true);
    const result = await renameRecord(documentId, newTitle.trim());
    setIsSaving(false);
    if (result.success) {
      setIsRenameOpen(false);
      router.refresh();
    } else {
      alert(result.error || "Failed to rename");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteRecord(documentId);
    setIsDeleting(false);
    if (result.success) {
      setIsDeleteOpen(false);
      router.refresh();
    } else {
      alert(result.error || "Failed to delete");
    }
  };

  return (
    <>
      <div
        className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.preventDefault()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setNewTitle(currentTitle);
            setIsRenameOpen(true);
          }}
          className="p-2 text-[#5C615E] hover:text-[#064038] hover:bg-[#F2EFEB] rounded-md transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
          aria-label="Rename document"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDeleteOpen(true);
          }}
          className="p-2 text-[#5C615E] hover:text-[#B85D3B] hover:bg-[#FDF1EC] rounded-md transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
          aria-label="Delete document"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Rename Modal */}
      <Modal
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        title="Rename Document"
        description="Enter a new title for this record."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
            }}
            className="w-full px-3 py-2 text-sm border border-[#DFDBD1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064038]/20 focus:border-[#064038]"
            placeholder="Document title"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsRenameOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-[#5C615E] hover:text-[#111414] border border-[#DFDBD1] rounded-lg hover:bg-[#FAF8F5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRename}
              disabled={isSaving || !newTitle.trim()}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#064038] rounded-lg hover:bg-[#064038]/90 disabled:opacity-50 transition-colors"
            >
              {isSaving ? "Saving..." : "Rename"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Document"
        description="This action cannot be undone. The document, its extracted data, and all associated relationships will be permanently removed."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-[#111414] font-medium truncate">
            &ldquo;{currentTitle}&rdquo;
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsDeleteOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-[#5C615E] hover:text-[#111414] border border-[#DFDBD1] rounded-lg hover:bg-[#FAF8F5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#B85D3B] rounded-lg hover:bg-[#B85D3B]/90 disabled:opacity-50 transition-colors"
            >
              {isDeleting ? "Deleting..." : "Delete Permanently"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
