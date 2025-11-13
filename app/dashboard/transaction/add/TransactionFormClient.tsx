"use client";

import dynamic from "next/dynamic";

// Load the form on the client only (no SSR) to avoid hydration issues
const TransactionFormNoSSR = dynamic(
  () => import("../../components/transaction-form"),
  { ssr: false }
);

export default function TransactionFormClient() {
  return <TransactionFormNoSSR />;
}
