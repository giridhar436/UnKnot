import { Document, Category } from "@/lib/types";
import { mockDocuments } from "@/lib/mock-data/documents";

/**
 * Get all documents, optionally filtered
 */
export async function getDocuments(filters?: {
  category?: string;
  search?: string;
  status?: string;
}): Promise<Document[]> {
  let docs = [...mockDocuments];

  if (filters?.category) {
    docs = docs.filter(
      (d) => d.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    docs = docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.entities.some(
          (e) =>
            e.value.toLowerCase().includes(q) ||
            e.label.toLowerCase().includes(q)
        ) ||
        (d.description && d.description.toLowerCase().includes(q))
    );
  }

  if (filters?.status) {
    docs = docs.filter((d) => d.status === filters.status);
  }

  // Sort by uploadedAt, newest first
  docs.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  return docs;
}

/**
 * Get a single document by ID
 */
export async function getDocument(id: string): Promise<Document | null> {
  return mockDocuments.find((d) => d.id === id) || null;
}

/**
 * Get related documents for a given document
 */
export async function getRelatedDocuments(documentId: string): Promise<Document[]> {
  const doc = mockDocuments.find((d) => d.id === documentId);
  if (!doc || !doc.relatedDocumentIds) return [];
  return mockDocuments.filter((d) => doc.relatedDocumentIds!.includes(d.id));
}

/**
 * Get recent documents (for dashboard)
 */
export async function getRecentDocuments(limit: number = 5): Promise<Document[]> {
  return [...mockDocuments]
    .sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )
    .slice(0, limit);
}

/**
 * Get category statistics
 */
export async function getCategories(): Promise<Category[]> {
  const categoryMap = new Map<string, number>();

  mockDocuments.forEach((doc) => {
    const count = categoryMap.get(doc.category) || 0;
    categoryMap.set(doc.category, count + 1);
  });

  const categories: Category[] = [
    { id: "cat-001", name: "Finance", slug: "finance", count: 0, subcategories: ["Expense", "Investment", "Income", "Payment"] },
    { id: "cat-002", name: "Purchase", slug: "purchase", count: 0 },
    { id: "cat-003", name: "Warranty", slug: "warranty", count: 0 },
    { id: "cat-004", name: "Repair", slug: "repair", count: 0 },
    { id: "cat-005", name: "Medical", slug: "medical", count: 0 },
    { id: "cat-006", name: "Documents", slug: "documents", count: 0, subcategories: ["Insurance", "Legal", "Personal"] },
    { id: "cat-007", name: "Important Dates", slug: "important-dates", count: 0 },
    { id: "cat-008", name: "Subscriptions", slug: "subscriptions", count: 0 },
    { id: "cat-009", name: "Other", slug: "other", count: 0 },
  ];

  categories.forEach((cat) => {
    cat.count = categoryMap.get(cat.name) || 0;
  });

  return categories;
}

/**
 * Search documents
 */
export async function searchDocuments(query: string): Promise<Document[]> {
  return getDocuments({ search: query });
}
