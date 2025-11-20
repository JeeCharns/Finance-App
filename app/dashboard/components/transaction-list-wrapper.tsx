import TransactionList from "./transaction-list";
import { fetchTransactions } from "@/lib/actions";

export default async function TransactionListWrapper({
  range,
}: {
  range: string;
}) {
  const transactions = await fetchTransactions(range);
  return (
    <TransactionList
      initialTransactions={transactions}
      key={range}
      range={range}
    />
  );
}
