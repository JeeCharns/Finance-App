export const types = ["Income", "Expense", "Saving", "Investment"] as const;
export type TransactionType = (typeof types)[number];

export const categories = [
  "Food",
  "Rent",
  "Salary",
  "Investment",
  "Dividends",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Healthcare",
  "Education",
  "Shopping",
  "Travel",
  "Miscellaneous",
  "Other",
];

export const dateRangeValues = ["last7days", "last30days", "last12months"];
