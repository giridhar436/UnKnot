import { Expense, Investment, FinanceSummary, UpcomingPayment } from "@/lib/types";

export const mockInvestments: Investment[] = [
  {
    id: "inv-001",
    name: "HDFC Bluechip Fund",
    type: "Mutual Fund",
    amount: 5000,
    date: "2026-08-25",
    frequency: "Monthly",
    documentId: "doc-009",
  },
  {
    id: "inv-002",
    name: "PPF Account - SBI",
    type: "PPF",
    amount: 12500,
    date: "2026-08-15",
    frequency: "Monthly",
  },
  {
    id: "inv-003",
    name: "Fixed Deposit - SBI",
    type: "Fixed Deposit",
    amount: 100000,
    date: "2026-01-10",
    frequency: "One-time",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "exp-001",
    title: "Samsung Galaxy S25",
    amount: 79999,
    date: "2026-08-12",
    category: "Electronics",
    documentId: "doc-001",
  },
  {
    id: "exp-002",
    title: "Dell Laptop Repair - Keyboard",
    amount: 18000,
    date: "2026-08-28",
    category: "Repair",
    documentId: "doc-005",
  },
  {
    id: "exp-003",
    title: "Apollo Pharmacy",
    amount: 1240,
    date: "2026-08-05",
    category: "Medical",
    documentId: "doc-006",
  },
  {
    id: "exp-004",
    title: "MedPlus Pharmacy",
    amount: 2000,
    date: "2026-08-18",
    category: "Medical",
    documentId: "doc-007",
  },
  {
    id: "exp-005",
    title: "Electricity Bill - BESCOM",
    amount: 2350,
    date: "2026-08-01",
    category: "Utilities",
    documentId: "doc-008",
  },
  {
    id: "exp-006",
    title: "Cult.fit Membership",
    amount: 12000,
    date: "2026-07-01",
    category: "Fitness",
    documentId: "doc-011",
  },
  {
    id: "exp-007",
    title: "Swiggy - Food Order",
    amount: 450,
    date: "2026-08-29",
    category: "Food",
  },
  {
    id: "exp-008",
    title: "Uber - Airport Ride",
    amount: 780,
    date: "2026-08-25",
    category: "Transport",
  },
];

export const mockUpcomingPayments: UpcomingPayment[] = [
  {
    id: "pay-001",
    title: "Electricity Bill - BESCOM",
    amount: 2350,
    dueDate: "2026-09-15",
    status: "upcoming",
  },
  {
    id: "pay-002",
    title: "HDFC Bluechip Fund SIP",
    amount: 5000,
    dueDate: "2026-09-25",
    status: "upcoming",
  },
  {
    id: "pay-003",
    title: "PPF Contribution",
    amount: 12500,
    dueDate: "2026-09-15",
    status: "upcoming",
  },
];

export const mockFinanceSummary: FinanceSummary = {
  totalExpensesThisMonth: 116819,
  totalInvestments: 117500,
  upcomingPayments: mockUpcomingPayments,
  expenseCount: 8,
  investmentCount: 3,
};
