import { createClient } from "@/lib/supabase/server";
import SettingsForm from "./components/settings-form";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const defaults = user?.user_metadata ?? {};
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>
      <SettingsForm defaults={defaults} />
    </>
  );
}
