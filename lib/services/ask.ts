import { Analysis, SuggestedQuestion, ActivityItem } from "@/lib/types";
import {
  mockAnalyses,
  mockSuggestedQuestions,
  mockActivityItems,
} from "@/lib/mock-data/ask";

/**
 * Ask a question against stored mock knowledge
 */
export async function askQuestion(query: string): Promise<Analysis> {
  const normalizedQuery = query.toLowerCase().trim();

  // Find best match in mockAnalyses
  const match = mockAnalyses.find((a) => {
    const q = a.question.toLowerCase();
    return (
      q.includes(normalizedQuery) ||
      normalizedQuery.includes(q) ||
      (normalizedQuery.includes("medicine") && q.includes("medicine")) ||
      (normalizedQuery.includes("phone") && q.includes("phone")) ||
      (normalizedQuery.includes("laptop") && q.includes("laptop")) ||
      (normalizedQuery.includes("repair") && q.includes("repair")) ||
      (normalizedQuery.includes("warranty") && q.includes("warranty")) ||
      (normalizedQuery.includes("investment") && q.includes("investment"))
    );
  });

  if (match) {
    return match;
  }

  // Fallback dynamic synthesis response for other queries
  return {
    id: `ask-${Date.now()}`,
    question: query,
    answer: `I analyzed your stored documents and records for "${query}". Currently, I found 1 relevant document matching your terms.`,
    evidence: [
      {
        id: `ev-${Date.now()}`,
        type: "document",
        title: "Samsung Galaxy S25 Receipt",
        documentId: "doc-001",
        detail: "Matches purchase and electronics context",
      },
    ],
    consideredFactors: ["Stored receipts", "Extracted entities"],
    suggestedAction: "View related documents",
  };
}

/**
 * Get suggested quick questions
 */
export async function getSuggestedQuestions(): Promise<SuggestedQuestion[]> {
  return [...mockSuggestedQuestions];
}

/**
 * Get recent activity feed
 */
export async function getActivityItems(limit: number = 5): Promise<ActivityItem[]> {
  return [...mockActivityItems]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, limit);
}
