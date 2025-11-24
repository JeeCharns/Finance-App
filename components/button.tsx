// components/button.tsx
import { ButtonHTMLAttributes } from "react";
import { sizes, variants } from "@/lib/variants";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "danger";
  size?: "xs" | "sm" | "base" | "lg";
};

export default function Button(props: ButtonProps) {
  const { className, variant, size, children, type, ...rest } = props;

  return (
    <button
      suppressHydrationWarning
      type={type ?? "button"}
      {...rest}
      className={`${variant ? variants[variant] : variants.default} ${
        size ? sizes[size] : sizes.base
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
