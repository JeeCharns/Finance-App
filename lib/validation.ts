// lib/validation.ts
import { z } from "zod";
import { types } from "@/lib/consts";

export const transactionSchema = z.object({
  type: z.enum(types), // <- key change
  category: z.string().min(1),
  amount: z.coerce.number().positive(),
  created_at: z.string(), // or refine to a date format
  description: z.string().min(1),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
