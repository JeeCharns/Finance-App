// components/input.tsx
"use client";
import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, ...rest },
  ref
) {
  const base =
    "w-full rounded-md border p-2 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950 disabled:opacity-70";
  const fileExtras =
    "border-0 disabled:opacity-50 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-800 file:cursor-pointer dark:file:bg-gray-800 dark:file:text-gray-200";

  return (
    <input
      suppressHydrationWarning
      ref={ref}
      type={type ?? "text"}
      className={`${base} ${type === "file" ? fileExtras : ""} ${
        className ?? ""
      }`}
      {...rest}
    />
  );
});

export default Input;
