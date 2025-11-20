// lib/validation.ts
import { z } from "zod";
import { categories, types } from "@/lib/consts";

export const transactionSchema = z
  .object({
    type: z.enum(types), // <- key change
    category: z.preprocess(
      (val) => (typeof val === "string" && val.length > 0 ? val : undefined),
      z.string().optional()
    ),
    amount: z.coerce.number().positive(),
    created_at: z.string(), // or refine to a date format
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "Expense") {
        return data.category != undefined && categories.includes(data.category);
      }
      return true;
    },
    {
      path: ["category"],
      message: "Category is required for expenses",
    }
  );

export type TransactionFormValues = z.infer<typeof transactionSchema>;
