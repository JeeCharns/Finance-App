import PageHeader from "@/components/page-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader className="my-8" />
      <div>{children}</div>
      <footer className="mt-auto text-center py-8">Footer</footer>
    </>
  );
}
