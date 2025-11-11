import type { ReactNode } from "react";
import PageHeader from "@/components/page-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader className="my-8" />
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}
