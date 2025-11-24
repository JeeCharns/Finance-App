"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { settingsSchema, transactionSchema } from "./validation";
import type { Transaction } from "./utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("transactions")
    .insert({ ...validated.data, user_id: user?.id });

  if (error) {
    console.error("createTransaction insert failed", error);
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
  const headersList = await headers();
  const origin = headersList.get("origin");

  const redirectTo =
    process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`
      : origin
      ? `${origin}/auth/confirm`
      : undefined;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email as string,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return { message: "Error authenticating", error: true };
  }

  return { message: `Login link sent to ${email}`, error: false };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  const {} = await supabase.auth.signOut();
  redirect("/login");
}

export type UploadState = { message: string; error?: string };

export async function uploadAvatar(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new Error("No file provided");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt ?? "bin"}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    console.error("uploadAvatar failed", uploadError);
    throw uploadError;
  }

  console.log("uploadAvatar success", { userId: user.id, filePath });
  return filePath;
}

export async function uploadAvatarAction(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  try {
    const filePath = await uploadAvatar(formData);
    const supabase = await createClient();

    // Removing the old file
    const { data: userData, error: getUserError } =
      await supabase.auth.getUser();
    if (getUserError || !userData?.user) {
      throw getUserError ?? new Error("Unable to load user");
    }

    const avatar = userData.user.user_metadata?.avatar;
    if (avatar) {
      const { error } = await supabase.storage.from("avatars").remove([avatar]);

      if (error) {
        throw error;
      }
    }

    const { error: dataUpdateError } = await supabase.auth.updateUser({
      data: { avatar: filePath },
    });
    if (dataUpdateError) {
      throw dataUpdateError;
    }
    return { message: "Avatar uploaded" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return { message: "Upload failed", error: message };
  }
}

export type SettingsState = {
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export async function updateSettings(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const validated = settingsSchema.safeParse({
    fullName: formData.get("fullName"),
    defaultView: formData.get("defaultView"),
  });

  if (!validated.success) {
    return {
      message: "Invalid settings",
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const fullName = formData.get("fullName")?.toString().trim() ?? "";
  const defaultView = formData.get("defaultView")?.toString().trim() ?? "";

  const supabase = await createClient();
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError || !user) {
    return { message: "Failed to load user", error: getUserError?.message };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      fullName,
      defaultView,
      // keep legacy keys in sync if they already exist
      full_name: fullName,
      default_view: defaultView,
    },
  });

  if (updateError) {
    return { message: "Update failed", error: updateError.message, errors: {} };
  }

  return { message: "Settings updated", errors: {} };
}
