import type { SelectHTMLAttributes } from "react";

export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-md shadow-sm border p-2 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
    ></select>
  );
}
