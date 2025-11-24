// lib/validation.ts
import { z } from "zod";
import { categories, dateRangeValues, types } from "@/lib/consts";

export const settingsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(120, "Full name is too long"),
  defaultView: z.enum(dateRangeValues, "Invalid default view"),
});

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
