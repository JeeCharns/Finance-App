import SideNav from "../settings/components/side-nav";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <aside className="cik-span-4 lg:col-span-1">
        <SideNav />
      </aside>
      <div className="col-span-4 lg:col-span-1">{children}</div>
    </div>
  );
}
