// components/submit-button.tsx
"use client";
import Button, { ButtonProps } from "./button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";

export default function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      className={`${
        props.className ?? ""
      } flex items-center justify-center space-x-1`}
    >
      {pending && <Loader className="animate-spin mr-2 h-4 w-4" />}
      {props.children}
    </Button>
  );
}
