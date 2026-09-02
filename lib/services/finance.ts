import { createClient } from "@/lib/supabase/server";
import type { Expense, Investment, FinanceSummary, UpcomingPayment } from "@/lib/types";

export async function getExpenses(): Promise<Expense[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: records } = await supabase
    .from("records")
    .select(
      `
      id, title, document_date, uploaded_at, category,
      extracted_data(amount, is_investment)
    `
    )
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("document_date", { ascending: false });

  if (!records) return [];

  return records
    .filter((r) => {
      const extracted = Array.isArray(r.extracted_data)
        ? r.extracted_data[0]
        : r.extracted_data;
      return extracted && !extracted.is_investment && extracted.amount;
    })
    .map((r) => {
      const extracted = Array.isArray(r.extracted_data)
        ? r.extracted_data[0]
        : r.extracted_data;

      return {
        id: r.id,
        title: r.title,
        amount: Number(extracted?.amount || 0),
        date: r.document_date || r.uploaded_at || new Date().toISOString(),
        category: r.category,
        documentId: r.id,
      };
    });
}

export async function getInvestments(): Promise<Investment[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: records } = await supabase
    .from("records")
    .select(
      `
      id, title, document_date,
      extracted_data(amount, investment_type, is_investment, merchant)
    `
    )
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("document_date", { ascending: false });

  if (!records) return [];

  return records
    .filter((r) => {
      const extracted = Array.isArray(r.extracted_data)
        ? r.extracted_data[0]
        : r.extracted_data;
      return extracted?.is_investment;
    })
    .map((r) => {
      const extracted = Array.isArray(r.extracted_data)
        ? r.extracted_data[0]
        : r.extracted_data;

      return {
        id: r.id,
        name: r.title,
        type: extracted?.investment_type || "Investment",
        amount: Number(extracted?.amount || 0),
        date: r.document_date || new Date().toISOString(),
        frequency: undefined,
        documentId: r.id,
      };
    });
}

export async function getFinanceSummary(): Promise<FinanceSummary> {
  const [expenses, investments, upcomingPayments] = await Promise.all([
    getExpenses(),
    getInvestments(),
    getUpcomingPayments(),
  ]);

  const now = new Date();
  const thisMonthExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  return {
    totalExpensesThisMonth: thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0),
    totalInvestments: investments.reduce((sum, i) => sum + i.amount, 0),
    upcomingPayments,
    expenseCount: expenses.length,
    investmentCount: investments.length,
  };
}

export async function getUpcomingPayments(): Promise<UpcomingPayment[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // Get reminders that are payment/bill related
  const { data: reminders } = await supabase
    .from("reminders")
    .select("id, title, reminder_date, type, status, record_id")
    .eq("user_id", user.id)
    .in("type", ["bill_due", "payment"])
    .in("status", ["upcoming", "today"])
    .order("reminder_date", { ascending: true });

  if (!reminders) return [];

  // Try to get amounts from linked records
  const recordIds = reminders.map((r) => r.record_id).filter(Boolean) as string[];
  let amountMap = new Map<string, number>();

  if (recordIds.length > 0) {
    const { data: records } = await supabase
      .from("extracted_data")
      .select("record_id, amount")
      .in("record_id", recordIds);

    if (records) {
      amountMap = new Map(records.map((r) => [r.record_id, Number(r.amount || 0)]));
    }
  }

  return reminders.map((r) => ({
    id: r.id,
    title: r.title,
    amount: amountMap.get(r.record_id || "") || 0,
    dueDate: r.reminder_date,
    status: r.status as "upcoming" | "overdue" | "paid",
  }));
}

export async function getMonthlyExpenseTotal(
  month: number,
  year: number
): Promise<number> {
  const expenses = await getExpenses();
  return expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, e) => sum + e.amount, 0);
}
