"use client";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { login } from "@/lib/actions";
import { useActionState } from "react";

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);
  return (
    <form
      suppressHydrationWarning
      action={formAction}
      className="flex flex-col gap-8"
    >
      <Input
        name="email"
        type="email"
        required
        placeholder="name@example.com"
      />
      <SubmitButton type="submit" size="sm" className="w-full">
        Sign in with email
      </SubmitButton>

      <p
        className={`${
          state?.error ? "text-red-500" : "text-green-500"
        } text-sm text-center mt-4`}
      >
        {state?.message}
      </p>
    </form>
  );
}
