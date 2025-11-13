import Separator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";

type Transaction = {
  id: string;
  amount: number;
  type: "Income" | "Expense" | "Saving" | "Investment";
  description: string;
  category?: string;
  created_at: string;
};

const groupandSumTransactionsByDate = (
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

export default async function TransactionList() {
  const res = await fetch(`${process.env.API_URL}/transactions`, {
    next: { tags: ["transaction-list"] },
  });
  const transactions = (await res.json()) as Transaction[];

  const grouped = groupandSumTransactionsByDate(transactions);

  const sortedDates = Object.keys(grouped).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime(); // newest → oldest
  });

  return (
    <div className="space-y-8">
      {sortedDates.map((date) => {
        const { transactions, amount } = grouped[date];
        return (
          <div key={date} className="space-y-4">
            <TransactionSummaryItem date={date} amount={amount} />
            <Separator />
            <section className="space-y-4">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  type={transaction.type}
                  category={transaction.category}
                  description={transaction.description}
                  amount={transaction.amount}
                />
              ))}
            </section>
          </div>
        );
      })}
    </div>
  );
}
