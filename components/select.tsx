// components/select.tsx
"use client";
import { forwardRef, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...rest },
  ref
) {
  return (
    <select
      ref={ref}
      className={`w-full rounded-md shadow-sm border p-2 border-gray-300
                  bg-white dark:border-gray-700 dark:bg-gray-950 ${className ?? ""}`}
      {...rest}
    >
      {children}
    </select>
  );
});

export default Select;
