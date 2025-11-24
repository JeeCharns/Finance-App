// components/page-header.tsx (Server Component)
import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import { getServerDarkMode } from "@/hooks/get-server-dark-mode";
import { createClient } from "@/lib/supabase/server";
import { KeyRound } from "lucide-react";
import { variants, sizes } from "@/lib/variants";
import SignOutButton from "./sign-out-button";
import Avatar from "@/app/(app)/dashboard/components/avatar";

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
          <Link
            href="/dashboard/settings"
            className={`flex items-center space-x-2 ${variants.ghost} ${sizes.sm}`}
          >
            <Avatar />
            <span>
              {user?.user_metadata?.fullName ??
                user?.user_metadata?.full_name ??
                user?.email}
            </span>
          </Link>
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
