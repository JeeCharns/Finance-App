// components/button.tsx
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "xs" | "sm" | "base" | "lg";
};

export default function Button(props: ButtonProps) {
  const variants = {
    default:
      "bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200",
    outline:
      "border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500",
    ghost:
      "rounded-md bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-500",
  };
  const sizes = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    base: "text-base px-4 py-2",
    lg: "text-lg px-4 py-2",
  };

  const { className, variant, size, children, type, ...rest } = props;

  return (
    <button
      type={type ?? "button"} // avoid accidental form submit
      {...rest}
      className={`${variant ? variants[variant] : variants.default} ${
        size ? sizes[size] : sizes.base
      } ${className ?? ""}`}
    >
      {children} {/* ← render children */}
    </button>
  );
}
