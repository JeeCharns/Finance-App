"use client";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import DateRangeSelect from "@/components/date-range-select";
import FormError from "@/components/form-error";
import Input from "@/components/input";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import { updateSettings, type SettingsState } from "@/lib/actions";
import { useActionState } from "react";

const initialState: SettingsState = {
  message: "",
  error: undefined,
  errors: {},
};

export default function SettingsForm({
  defaults,
}: {
  defaults?: Record<string, unknown>;
}) {
  const [state, formAction] = useActionState<SettingsState, FormData>(
    updateSettings,
    initialState
  );
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <Label htmlFor="fullName">User full name</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="User full name"
        defaultValue={
          typeof defaults?.fullName === "string"
            ? defaults.fullName
            : typeof defaults?.full_name === "string"
            ? defaults.full_name
            : ""
        }
      />
      <FormError
        error={
          state.errors?.fullName?.[0]
            ? { message: state.errors.fullName[0] }
            : null
        }
      />

      <Label htmlFor="defaultView">Default transactions view</Label>
      <DateRangeSelect
        name="defaultView"
        id="defaultView"
        defaultValue={
          typeof defaults?.defaultView === "string"
            ? defaults.defaultView
            : typeof defaults?.default_view === "string"
            ? defaults.default_view
            : "last30days"
        }
      />
      <FormError
        error={
          state.errors?.defaultView?.[0]
            ? { message: state.errors.defaultView[0] }
            : null
        }
      />

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}
