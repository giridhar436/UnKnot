import { createClient } from "@/lib/supabase/server";
import type { Document, Category, Entity } from "@/lib/types";

/**
 * Map a database record row to the frontend Document type.
 */
function mapRecordToDocument(record: Record<string, unknown>): Document {
  const extracted = Array.isArray(record.extracted_data)
    ? record.extracted_data[0]
    : (record.extracted_data as Record<string, unknown> | null);

  const files = Array.isArray(record.files)
    ? record.files[0]
    : (record.files as Record<string, unknown> | null);

  const metadata = (record.metadata as Record<string, string>) || {};

  // Build entities from extracted data
  const entities: Entity[] = [];
  if (extracted) {
    if (extracted.merchant) {
      entities.push({
        id: `ent-${record.id}-merchant`,
        type: "organization",
        label: "Merchant",
        value: extracted.merchant as string,
      });
    }
    if (extracted.product) {
      entities.push({
        id: `ent-${record.id}-product`,
        type: "product",
        label: "Product",
        value: extracted.product as string,
      });
    }
    if (extracted.amount) {
      entities.push({
        id: `ent-${record.id}-amount`,
        type: "amount",
        label: "Amount",
        value: `${extracted.currency || "INR"} ${extracted.amount}`,
      });
    }
    if (record.document_date) {
      entities.push({
        id: `ent-${record.id}-date`,
        type: "date",
        label: "Document Date",
        value: new Date(record.document_date as string).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });
    }
    if (extracted.warranty_expiry) {
      entities.push({
        id: `ent-${record.id}-warranty`,
        type: "warranty_period",
        label: "Warranty Until",
        value: new Date(extracted.warranty_expiry as string).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      });
    }
    if (extracted.invoice_number) {
      entities.push({
        id: `ent-${record.id}-invoice`,
        type: "invoice_number",
        label: "Invoice",
        value: extracted.invoice_number as string,
      });
    }
    if (extracted.investment_type) {
      entities.push({
        id: `ent-${record.id}-inv-type`,
        type: "investment_type",
        label: "Investment Type",
        value: extracted.investment_type as string,
      });
    }

    // Add any extra entities from the entities JSON
    const extraEntities = (extracted.entities as Array<{ type: string; label: string; value: string }>) || [];
    for (const e of extraEntities) {
      if (!entities.some((existing) => existing.label === e.label)) {
        entities.push({
          id: `ent-${record.id}-${e.label}`,
          type: (e.type as Entity["type"]) || "other",
          label: e.label,
          value: e.value,
        });
      }
    }
  }

  return {
    id: record.id as string,
    title: (record.title as string) || "Untitled",
    type: (record.source_type as "pdf" | "image" | "text") || "text",
    category: (record.category as string) || "Other",
    subcategory: (record.subcategory as string) || undefined,
    documentDate: (record.document_date as string) || null,
    uploadedAt: (record.uploaded_at as string) || new Date().toISOString(),
    status: record.status === "completed" ? "ready" : (record.status as "processing" | "error") || "processing",
    duplicateStatus: (record.duplicate_status as "none" | "possible" | "high_confidence") || "none",
    entities,
    amount: extracted?.amount ? Number(extracted.amount) : undefined,
    fileUrl: (files?.secure_url as string) || undefined,
    description: metadata.description || undefined,
  };
}

export async function getDocuments(filters?: {
  category?: string;
  search?: string;
  status?: string;
}): Promise<Document[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  let query = supabase
    .from("records")
    .select(
      `
      id, title, record_type, category, subcategory, source_type,
      document_date, uploaded_at, status, duplicate_status, metadata,
      extracted_data(merchant, product, amount, currency, invoice_number, warranty_expiry, investment_type, entities),
      files(secure_url)
    `
    )
    .eq("user_id", user.id)
    .order("uploaded_at", { ascending: false });

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const { data: records } = await query;

  if (!records) return [];

  let docs = records.map((r) => mapRecordToDocument(r as unknown as Record<string, unknown>));

  // Client-side search (Supabase text search could be added later)
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

  return docs;
}

export async function getDocument(id: string): Promise<Document | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: record } = await supabase
    .from("records")
    .select(
      `
      id, title, record_type, category, subcategory, source_type,
      document_date, uploaded_at, status, duplicate_status, metadata,
      extracted_data(merchant, product, amount, currency, invoice_number, warranty_expiry, investment_type, entities),
      files(secure_url)
    `
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!record) return null;

  return mapRecordToDocument(record as unknown as Record<string, unknown>);
}

export async function getRelatedDocuments(documentId: string): Promise<Document[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // Find related record IDs via relationships table
  const { data: rels } = await supabase
    .from("relationships")
    .select("from_record_id, to_record_id")
    .eq("user_id", user.id)
    .or(`from_record_id.eq.${documentId},to_record_id.eq.${documentId}`);

  if (!rels || rels.length === 0) return [];

  const relatedIds = rels.map((r) =>
    r.from_record_id === documentId ? r.to_record_id : r.from_record_id
  );

  const { data: records } = await supabase
    .from("records")
    .select(
      `
      id, title, record_type, category, subcategory, source_type,
      document_date, uploaded_at, status, duplicate_status, metadata,
      extracted_data(merchant, product, amount, currency, invoice_number, warranty_expiry, investment_type, entities),
      files(secure_url)
    `
    )
    .in("id", relatedIds)
    .eq("user_id", user.id);

  if (!records) return [];

  return records.map((r) => mapRecordToDocument(r as unknown as Record<string, unknown>));
}

export async function getRecentDocuments(limit: number = 5): Promise<Document[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: records } = await supabase
    .from("records")
    .select(
      `
      id, title, record_type, category, subcategory, source_type,
      document_date, uploaded_at, status, duplicate_status, metadata,
      extracted_data(merchant, product, amount, currency, invoice_number, warranty_expiry, investment_type, entities),
      files(secure_url)
    `
    )
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("uploaded_at", { ascending: false })
    .limit(limit);

  if (!records) return [];

  return records.map((r) => mapRecordToDocument(r as unknown as Record<string, unknown>));
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: records } = await supabase
    .from("records")
    .select("category")
    .eq("user_id", user.id)
    .eq("status", "completed");

  const categoryMap = new Map<string, number>();
  if (records) {
    for (const r of records) {
      categoryMap.set(r.category, (categoryMap.get(r.category) || 0) + 1);
    }
  }

  const allCategories = [
    { id: "cat-001", name: "Finance", slug: "finance", subcategories: ["Expense", "Investment", "Income", "Payment"] },
    { id: "cat-002", name: "Investments", slug: "investments" },
    { id: "cat-003", name: "Purchases", slug: "purchases" },
    { id: "cat-004", name: "Warranty", slug: "warranty" },
    { id: "cat-005", name: "Repair", slug: "repair" },
    { id: "cat-006", name: "Medical", slug: "medical" },
    { id: "cat-007", name: "Documents", slug: "documents", subcategories: ["Insurance", "Legal", "Personal"] },
    { id: "cat-008", name: "Subscriptions", slug: "subscriptions" },
    { id: "cat-009", name: "Other", slug: "other" },
  ];

  return allCategories.map((cat) => ({
    ...cat,
    count: categoryMap.get(cat.name) || 0,
  }));
}

export async function searchDocuments(query: string): Promise<Document[]> {
  return getDocuments({ search: query });
}
