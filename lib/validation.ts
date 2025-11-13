import { z } from "zod";
import { types } from "./consts";
import { categories } from "./consts";

export const transactionSchema = z.object({
  type: z.enum(types),
  category: z.enum(categories),
  amount: z.coerce.number().min(0.01, "Amount must be at least 0.01"),
  created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  description: z.string().min(1, "A description is required"),
});
