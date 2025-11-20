export type Transaction = {
  id: string;
  amount: number;
  type: "Income" | "Expense" | "Saving" | "Investment";
  description: string;
  category?: string;
  created_at: string;
};

export const groupandSumTransactionsByDate = (
  transactions: Transaction[]
): Record<string, { transactions: Transaction[]; amount: number }> => {
  const grouped: Record<
    string,
    { transactions: Transaction[]; amount: number }
  > = {};
  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);
    const signedAmount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    grouped[date].amount += signedAmount;
  }
  return grouped;
};
