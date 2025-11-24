// transaction-list.tsx
"use client";
import Separator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { groupandSumTransactionsByDate, type Transaction } from "@/lib/utils";
import { useState } from "react";
import Button from "@/components/button";
import { fetchTransactions } from "@/lib/actions";
import { Loader } from "lucide-react";

type TransactionListProps = {
  range: string;
  initialTransactions?: Transaction[];
};

export default function TransactionList({
  range,
  initialTransactions = [],
}: TransactionListProps) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [loading, setLoading] = useState(false);
  const grouped = groupandSumTransactionsByDate(transactions);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );

  const handleClickLoadMore = async () => {
    setLoading(true);
    let nextTransactions: Transaction[] = [];
    try {
      nextTransactions = await fetchTransactions(
        range,
        transactions.length,
        10
      );
    } finally {
      setLoading(false);
    }
    setButtonHidden(nextTransactions.length === 0);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      ...nextTransactions,
    ]);
  };

  const sortedDates = Object.keys(grouped).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime(); // newest → oldest
  });

  const handleRemoved = (id: string) => () => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

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
                  id={transaction.id}
                  onRemoved={handleRemoved(transaction.id)}
                />
              ))}
            </section>
          </div>
        );
      })}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500 py-24">
          No transactions found.
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={handleClickLoadMore}
            disabled={loading}
          >
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <div>Load more</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
