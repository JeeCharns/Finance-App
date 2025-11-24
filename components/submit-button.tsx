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
      type={props.type ?? "submit"}
      className={`${
        props.className ?? ""
      } flex items-center justify-center space-x-1`}
      disabled={pending || props.disabled}
    >
      {pending && <Loader className="animate-spin mr-2 h-4 w-4" />}
      <span>{props.children}</span>
    </Button>
  );
}
