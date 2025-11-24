// components/page-header.tsx (Server Component)
import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import { getServerDarkMode } from "@/hooks/get-server-dark-mode";
import { createClient } from "@/lib/supabase/server";
import Button from "@/components/button";
import { CircleUser, KeyRound } from "lucide-react";
import { variants } from "@/lib/variants";
import SignOutButton from "./sign-out-button";

export default async function PageHeader({
  className,
}: {
  className?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const theme = await getServerDarkMode();
  return (
    <header className={`flex justify-between items-center ${className ?? ""}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-2 py-6">
        <DarkModeToggle defaultMode={theme} />
        {user && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <CircleUser className="w-6 h-6 mr-2" />
            <span>{user?.email}</span>
          </Button>
        )}
        {user && <SignOutButton />}
        {!user && (
          <Link href="/login" className={`${variants.ghost}`}>
            <KeyRound className="w-6 h-6"></KeyRound>
          </Link>
        )}
      </div>
    </header>
  );
}
