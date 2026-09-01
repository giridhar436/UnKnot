// ===========================
// UnKnot TypeScript Interfaces
// ===========================

// --- Document ---

export type DocumentType = "pdf" | "image" | "text";
export type DocumentStatus = "processing" | "ready" | "error";
export type DuplicateStatus = "none" | "possible" | "high_confidence";

export interface Entity {
  id: string;
  type: "product" | "amount" | "date" | "organization" | "person" | "location" | "invoice_number" | "warranty_period" | "investment_type" | "payment_info";
  label: string;
  value: string;
}

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  category: string;
  subcategory?: string;
  documentDate: string | null;
  uploadedAt: string;
  status: DocumentStatus;
  duplicateStatus: DuplicateStatus;
  entities: Entity[];
  amount?: number;
  fileUrl?: string;
  relatedDocumentIds?: string[];
  description?: string;
}

// --- Finance ---

export interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
  frequency?: string;
  documentId?: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  documentId?: string;
}

export interface FinanceSummary {
  totalExpensesThisMonth: number;
  totalInvestments: number;
  upcomingPayments: UpcomingPayment[];
  expenseCount: number;
  investmentCount: number;
}

export interface UpcomingPayment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "upcoming" | "overdue" | "paid";
}

// --- Reminders ---

export type ReminderStatus = "upcoming" | "today" | "overdue" | "completed";

export interface Reminder {
  id: string;
  title: string;
  date: string;
  source?: string;
  sourceDocumentId?: string;
  status: ReminderStatus;
  type: "warranty_expiry" | "bill_due" | "subscription_renewal" | "payment" | "appointment" | "document_expiry" | "other";
}

// --- Ask / Analysis ---

export interface Evidence {
  id: string;
  type: string;
  title: string;
  documentId?: string;
  detail: string;
}

export interface Analysis {
  id: string;
  question: string;
  answer: string;
  evidence: Evidence[];
  consideredFactors?: string[];
  unknowns?: string[];
  suggestedAction?: string;
  isAnalysis?: boolean;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: string;
}

// --- Categories ---

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  subcategories?: string[];
}

// --- Activity ---

export interface ActivityItem {
  id: string;
  type: "document_added" | "document_processed" | "analysis_completed" | "reminder_created";
  title: string;
  description: string;
  timestamp: string;
  documentId?: string;
}

// --- Processing ---

export type ProcessingStep = "received" | "reading" | "extracting" | "categorizing" | "checking_duplicates" | "saved";

export interface ProcessingState {
  currentStep: ProcessingStep;
  steps: {
    id: ProcessingStep;
    label: string;
    status: "completed" | "active" | "pending";
  }[];
}

// --- Upload ---

export type UploadMode = "pdf" | "image" | "photo" | "text";
