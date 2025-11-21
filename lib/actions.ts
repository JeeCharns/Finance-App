"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";
import type { Transaction } from "./utils";

export async function createTransaction(formData: {
  type: "Income" | "Expense" | "Saving" | "Investment";
  amount: number;
  description?: string;
  category?: string;
  created_at: string;
}): Promise<void> {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid form data");
  }
  console.log(formData);
  const supabase = await createClient(); // <- await here
  const { error } = await supabase.from("transactions").insert(validated.data);

  if (error) {
    throw new Error("Failed creating the transaction");
  }

  revalidatePath("/dashboard");
}

export async function fetchTransactions(
  range: string,
  offset = 0,
  limit = 10
): Promise<Transaction[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });

  if (error) throw new Error("We can't fetch transactions");

  // data is Transaction[] | null
  return (data ?? []) as Transaction[];
}

export async function deleteTransaction(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed deleting the transaction $(id)`);
  }

  revalidatePath("/dashboard");
}

export async function updateTransaction(
  id: string,
  formData: {
    type: "Income" | "Expense" | "Saving" | "Investment";
    amount: number;
    description?: string;
    category?: string;
    created_at: string;
  }
): Promise<void> {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid form data");
  }
  console.log(formData);
  const supabase = await createClient(); // <- await here
  const { error } = await supabase
    .from("transactions")
    .update(validated.data)
    .eq("id", id);

  if (error) {
    throw new Error("Failed updating the transaction");
  }

  revalidatePath("/dashboard");
}

type LoginState = { message: string; error: boolean };

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { message: "Please enter a valid email address.", error: true };
  }

  if (email === "gjcharnley@gmail.com") {
    return { message: "Login successful!", error: false };
  }

  return { message: "Invalid email", error: true };
}
