// components/button.tsx
import { ButtonHTMLAttributes } from "react";
import { sizes, variants } from "@/lib/variants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "xs" | "sm" | "base" | "lg";
};

export default function Button(props: ButtonProps) {
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
