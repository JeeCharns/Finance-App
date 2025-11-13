// components/input.tsx
"use client";
import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-md border p-2 border-gray-300
                  bg-white dark:border-gray-700 dark:bg-gray-950 ${
                    className ?? ""
                  }`}
      {...rest}
    />
  );
});

export default Input;
