import { Expense, Investment, FinanceSummary, UpcomingPayment } from "@/lib/types";
import {
  mockExpenses,
  mockInvestments,
  mockFinanceSummary,
  mockUpcomingPayments,
} from "@/lib/mock-data/finance";

/**
 * Get all expenses
 */
export async function getExpenses(): Promise<Expense[]> {
  return [...mockExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get all investments
 */
export async function getInvestments(): Promise<Investment[]> {
  return [...mockInvestments];
}

/**
 * Get finance summary
 */
export async function getFinanceSummary(): Promise<FinanceSummary> {
  return { ...mockFinanceSummary };
}

/**
 * Get upcoming payments
 */
export async function getUpcomingPayments(): Promise<UpcomingPayment[]> {
  return [...mockUpcomingPayments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
}

/**
 * Get monthly expense total
 */
export async function getMonthlyExpenseTotal(
  month: number,
  year: number
): Promise<number> {
  return mockExpenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, e) => sum + e.amount, 0);
}
