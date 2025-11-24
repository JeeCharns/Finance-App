import PageHeader from "@/components/page-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader className="my-8" />
      <main className="flex-1">{children}</main>
      {/* <footer className="mt-auto text-center py-8">Footer</footer> */}
    </div>
  );
}
