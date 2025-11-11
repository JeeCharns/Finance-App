// components/page-header.tsx (Server Component)
import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import { getServerDarkMode } from "@/hooks/get-server-dark-mode";

export default async function PageHeader({
  className,
}: {
  className?: string;
}) {
  const theme = await getServerDarkMode();
  return (
    <header className={`flex justify-between items-center ${className ?? ""}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-4 py-6">
        <DarkModeToggle defaultMode={theme} />
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
