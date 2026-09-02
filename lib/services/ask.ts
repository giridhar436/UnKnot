import type { Analysis, SuggestedQuestion, ActivityItem } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

/**
 * Ask a question — calls the Context Engine API route.
 * This is called from client components, so it fetches from /api/ask.
 */
export async function askQuestion(query: string): Promise<Analysis> {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: query }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.error?.message || "Failed to process your question"
    );
  }

  const data = await response.json();
  return data.analysis;
}

/**
 * Suggested quick questions — these are static but could be personalized later.
 */
export async function getSuggestedQuestions(): Promise<SuggestedQuestion[]> {
  return [
    { id: "sq-001", text: "How much did I spend on medicines this month?", category: "Medical" },
    { id: "sq-002", text: "What warranties do I have?", category: "Warranty" },
    { id: "sq-003", text: "Should I repair this laptop or replace it?", category: "Decision" },
    { id: "sq-004", text: "How much did I spend on this phone?", category: "Purchase" },
    { id: "sq-005", text: "What are my current investments?", category: "Finance" },
    { id: "sq-006", text: "When is my insurance renewal due?", category: "Documents" },
  ];
}

/**
 * Recent activity feed — derived from recent records and analyses.
 */
export async function getActivityItems(limit: number = 5): Promise<ActivityItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // Get recent records as activity items
  const { data: records } = await supabase
    .from("records")
    .select("id, title, category, uploaded_at, status")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("uploaded_at", { ascending: false })
    .limit(limit);

  if (!records) return [];

  return records.map((r) => ({
    id: `act-${r.id}`,
    type: "document_added" as const,
    title: `${r.title} added`,
    description: `${r.category} record was processed and categorized`,
    timestamp: r.uploaded_at,
    documentId: r.id,
  }));
}
