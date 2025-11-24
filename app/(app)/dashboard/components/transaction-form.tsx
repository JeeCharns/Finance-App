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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTransaction, updateTransaction } from "@/lib/actions";
import FormError from "@/components/form-error";
import { TransactionFormValues } from "@/lib/validation";

type FormValues = TransactionFormValues;
type TransactionFormProps = Partial<FormValues> & { id?: string };

export default function TransactionForm(props: TransactionFormProps) {
  const zodFormResolver: Resolver<FormValues> = zodResolver(
    transactionSchema
  ) as unknown as Resolver<FormValues>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: "onTouched",
    resolver: zodFormResolver,
    defaultValues: {
      type: props.type ?? types[0],
      category: props.category ?? "",
      amount: props.amount ?? 0,
      created_at: props.created_at ?? new Date().toISOString().split("T")[0],
      description: props.description ?? "",
    },
  });

  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const type = watch("type");
  const editing = !!props.id;

  useEffect(() => {
    if (type !== "Expense") {
      setValue("category", ""); // reset to placeholder
    }
  }, [type, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSaving(true);
    setLastError(null);
    try {
      if (editing && props.id) {
        await updateTransaction(props.id, data);
      } else {
        await createTransaction(data);
      }

      router.push("/dashboard");
    } catch (error) {
      setLastError((error as Error)?.message);
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
          <FormError error={errors.type?.message ? { message: errors.type.message } : null} />
        </div>

        <div>
          <Label htmlFor="category" className="mb-2">
            Category
          </Label>
          <Select
            id="category"
            disabled={type !== "Expense"}
            {...register("category", {
              required:
                type === "Expense"
                  ? "Category is required for expenses"
                  : false,
            })}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <FormError
            error={
              errors.category?.message
                ? { message: errors.category.message }
                : null
            }
          />
        </div>

        <div>
          <Label htmlFor="created_at" className="mb-1">
            Transaction Date
          </Label>
          <Input
            id="created_at"
            type="date" // ← native date picker, always dd/mm/yyyy
            {...register("created_at", { required: "A date is required" })}
            disabled={editing}
          />
          <FormError
            error={
              errors.created_at?.message
                ? { message: errors.created_at.message }
                : null
            }
          />
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
          <FormError
            error={
              errors.amount?.message ? { message: errors.amount.message } : null
            }
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Input id="description" {...register("description")} />
          <FormError
            error={
              errors.description?.message
                ? { message: errors.description.message }
                : null
            }
          />
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
