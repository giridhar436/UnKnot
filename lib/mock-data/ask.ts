import { Analysis, SuggestedQuestion, ActivityItem } from "@/lib/types";

export const mockAnalyses: Analysis[] = [
  {
    id: "ask-001",
    question: "How much did I spend on medicines this month?",
    answer: "You spent ₹3,240 on medicines in August 2026.",
    evidence: [
      {
        id: "ev-001",
        type: "expense",
        title: "Apollo Pharmacy",
        documentId: "doc-006",
        detail: "₹1,240 on 05 Aug 2026",
      },
      {
        id: "ev-002",
        type: "expense",
        title: "MedPlus Pharmacy",
        documentId: "doc-007",
        detail: "₹2,000 on 18 Aug 2026",
      },
    ],
    consideredFactors: ["Medical category expenses", "August 2026 date range"],
    suggestedAction: "View all medical records",
  },
  {
    id: "ask-002",
    question: "How much did I spend on this phone?",
    answer: "You spent ₹79,999 on the Samsung Galaxy S25.",
    evidence: [
      {
        id: "ev-003",
        type: "purchase",
        title: "Samsung Galaxy S25 Receipt",
        documentId: "doc-001",
        detail: "₹79,999 purchased on 12 Aug 2026 from Croma Electronics",
      },
    ],
    consideredFactors: ["Purchase records", "Samsung Galaxy S25 product match"],
    suggestedAction: "View purchase receipt",
  },
  {
    id: "ask-003",
    question: "Should I repair this laptop or replace it?",
    answer: "Based on your records, repairing may be more economical for now, but you should compare the repair cost with current laptop prices.",
    evidence: [
      {
        id: "ev-004",
        type: "purchase",
        title: "Dell Inspiron 15 Purchase Invoice",
        documentId: "doc-003",
        detail: "Purchased for ₹72,000 on 15 Mar 2024",
      },
      {
        id: "ev-005",
        type: "repair",
        title: "Screen Repair Invoice",
        documentId: "doc-004",
        detail: "₹8,000 on 20 Jun 2025",
      },
      {
        id: "ev-006",
        type: "repair",
        title: "Keyboard Repair Invoice",
        documentId: "doc-005",
        detail: "₹18,000 on 28 Aug 2026",
      },
    ],
    consideredFactors: [
      "Original purchase price: ₹72,000",
      "Laptop age: ~2.5 years",
      "Total repair costs: ₹26,000",
      "Warranty: Expired (15 Mar 2026)",
      "Latest repair estimate: ₹18,000",
    ],
    unknowns: ["Current replacement price for an equivalent laptop"],
    suggestedAction: "Compare ₹18,000 repair cost with the price of a new equivalent laptop",
    isAnalysis: true,
  },
  {
    id: "ask-004",
    question: "What warranties do I have?",
    answer: "You have 1 active warranty and 1 expired warranty.",
    evidence: [
      {
        id: "ev-007",
        type: "warranty",
        title: "Samsung Galaxy S25 Warranty",
        documentId: "doc-002",
        detail: "Active until 12 Aug 2027",
      },
      {
        id: "ev-008",
        type: "warranty",
        title: "Dell Inspiron 15 Warranty",
        documentId: "doc-003",
        detail: "Expired on 15 Mar 2026",
      },
    ],
    suggestedAction: "View warranty documents",
  },
  {
    id: "ask-005",
    question: "What are my current investments?",
    answer: "You have 3 active investments totalling ₹1,17,500.",
    evidence: [
      {
        id: "ev-009",
        type: "investment",
        title: "HDFC Bluechip Fund",
        documentId: "doc-009",
        detail: "₹5,000/month — Mutual Fund SIP",
      },
      {
        id: "ev-010",
        type: "investment",
        title: "PPF Account - SBI",
        detail: "₹12,500/month — Public Provident Fund",
      },
      {
        id: "ev-011",
        type: "investment",
        title: "Fixed Deposit - SBI",
        detail: "₹1,00,000 — One-time Fixed Deposit",
      },
    ],
    consideredFactors: ["Investment records", "Active investment accounts"],
    suggestedAction: "View finance overview",
  },
];

export const mockSuggestedQuestions: SuggestedQuestion[] = [
  { id: "sq-001", text: "How much did I spend on medicines this month?", category: "Medical" },
  { id: "sq-002", text: "What warranties do I have?", category: "Warranty" },
  { id: "sq-003", text: "Should I repair this laptop or replace it?", category: "Decision" },
  { id: "sq-004", text: "How much did I spend on this phone?", category: "Purchase" },
  { id: "sq-005", text: "What are my current investments?", category: "Finance" },
  { id: "sq-006", text: "When is my insurance renewal due?", category: "Documents" },
];

export const mockActivityItems: ActivityItem[] = [
  {
    id: "act-001",
    type: "document_added",
    title: "Dell Laptop Keyboard Repair Invoice added",
    description: "Repair invoice for ₹18,000 was processed and categorized",
    timestamp: "2026-08-30T16:45:00Z",
    documentId: "doc-005",
  },
  {
    id: "act-002",
    type: "document_processed",
    title: "HDFC Mutual Fund Statement processed",
    description: "Investment of ₹5,000/month extracted and linked to finance",
    timestamp: "2026-08-26T08:00:00Z",
    documentId: "doc-009",
  },
  {
    id: "act-003",
    type: "analysis_completed",
    title: "Analysis: Laptop repair vs replace",
    description: "Compared repair costs with purchase price and warranty status",
    timestamp: "2026-08-30T17:00:00Z",
  },
  {
    id: "act-004",
    type: "document_added",
    title: "MedPlus Pharmacy Receipt added",
    description: "Medical expense of ₹2,000 recorded",
    timestamp: "2026-08-18T11:00:00Z",
    documentId: "doc-007",
  },
  {
    id: "act-005",
    type: "reminder_created",
    title: "Reminder: Electricity bill due",
    description: "Payment of ₹2,350 due by 15 Sep 2026",
    timestamp: "2026-08-03T09:05:00Z",
  },
];
