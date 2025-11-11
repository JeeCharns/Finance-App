import type { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const styles: Record<string, string> = {
    checkbox:
      "rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm",
    default:
      "w-full rounded-md shadow-sm border p-2 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950",
  };
  return (
    <input
      {...props}
      className={styles[props.type ?? "default"] ?? styles["default"]}
    />
  );
}
