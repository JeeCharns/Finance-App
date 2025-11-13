// app/dashboard/components/transaction-form.tsx
"use client";

import Label from "@/components/label";
import Select from "@/components/select";
import Input from "@/components/input";
import Button from "@/components/button";
import { types, categories } from "@/lib/consts";
import { useForm, SubmitHandler, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/lib/actions";
import FormError from "@/components/form-error";
import { TransactionFormValues } from "@/lib/validation";

type FormValues = TransactionFormValues;

export default function TransactionForm() {
  const zodFormResolver: Resolver<FormValues> = zodResolver(
    transactionSchema
  ) as unknown as Resolver<FormValues>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    resolver: zodFormResolver,
  });
  const router = useRouter();

  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSaving(true);
    setLastError(null);
    try {
      await createTransaction(data);
      router.push("/dashboard");
    } catch (error) {
      setLastError((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Label htmlFor="type" className="mb-2">
            Type
          </Label>
          <Select
            id="type"
            {...register("type", { required: true })}
            defaultValue={types[0]}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <FormError error={errors.type} />
        </div>

        <div>
          <Label htmlFor="category" className="mb-2">
            Category
          </Label>
          <Select
            id="category"
            {...register("category", { required: true })}
            defaultValue={categories[0]}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <FormError error={errors.category} />
        </div>

        <div>
          <Label htmlFor="created_at" className="mb-1">
            Transaction Date
          </Label>
          <Input
            id="created_at"
            type="date" // ← native date picker, always dd/mm/yyyy
            {...register("created_at", { required: "A date is required" })}
          />
          <FormError error={errors.created_at} />
        </div>

        <div>
          <Label htmlFor="amount" className="mb-1">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            {...register("amount")}
          />
          <FormError error={errors.amount} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Input id="description" {...register("description")} />
          <FormError error={errors.description} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <FormError error={lastError ? { message: lastError } : null} />
        </div>
        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
