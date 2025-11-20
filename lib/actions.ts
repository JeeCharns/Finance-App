"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";

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
