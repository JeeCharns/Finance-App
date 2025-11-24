"use client";

import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatarAction, type UploadState } from "@/lib/actions";
import { useActionState } from "react";

const initialState: UploadState = { message: "", error: undefined };

export default function Page() {
  const [state, formAction] = useActionState<UploadState, FormData>(
    uploadAvatarAction,
    initialState
  );

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={formAction}>
        {state.error ? (
          <AlertError>{state.message}</AlertError>
        ) : state.message.length > 0 ? (
          <AlertSuccess>{state.message}</AlertSuccess>
        ) : null}
        <Input type="file" name="file" id="file" required />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
