// lib/actions.ts
"use server";

import { revalidateTag } from "next/cache";

export async function purgeTransactionListCache(): Promise<void> {
  // Typings in some builds require the 2nd arg; runtime accepts "max"
  // If TS complains, keep the cast.
  (revalidateTag as unknown as (tag: string, profile?: string) => void)(
    "transaction-list",
    "max"
  );
}
