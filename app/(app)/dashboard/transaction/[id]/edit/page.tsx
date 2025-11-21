// app/dashboard/transaction/[id]/edit/page.tsx
import { createClient } from "@/lib/supabase/server";
import { JSX } from "react";
import { Metadata } from "next";
import TransactionFormClient from "../../../components/transaction-form";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Transaction",
};

interface PageParams {
  id: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  // params is a Promise, so await it
  const { id } = await params;
  console.log("Edit page id:", id);

  if (!id || id === "undefined") {
    console.error(
      "Edit page: missing or invalid id in route params",
      await params
    );
    throw new Error("Missing transaction id in route");
  }

  const supabase = await createClient();
  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  console.log("Edit page result:", { id, transaction, error });

  if (error) notFound();

  const initialData = {
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    created_at: (transaction.created_at || "").split("T")[0],
    category: transaction.category ?? "",
    description: transaction.description ?? "",
  };

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionFormClient {...initialData} />
    </>
  );
}
