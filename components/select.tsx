// components/select.tsx
"use client";
import { forwardRef, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, disabled, ...rest },
  ref
) {
  const baseClasses =
    "w-full rounded-md shadow-sm border p-2 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700";
  const enabledClasses = "text-gray-900 dark:text-gray-100 cursor-pointer";
  const disabledClasses =
    "text-gray-400 dark:text-gray-500 opacity-50 cursor-not-allowed";

  return (
    <select
      suppressHydrationWarning
      ref={ref}
      disabled={disabled}
      className={`${baseClasses} ${
        disabled ? disabledClasses : enabledClasses
      } ${className ?? ""}`}
      {...rest}
    >
      {children}
    </select>
  );
});

export default Select;
