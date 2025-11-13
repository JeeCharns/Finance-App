import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import PageHeader from "@/components/page-header";

const inter = Inter({ subsets: ["latin"] });

// ✅ This runs before hydration to prevent theme flashing
function ThemeNoFlash() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  try {
    var m = document.cookie.match(/(?:^|; )theme=([^;]+)/);
    var theme = m ? decodeURIComponent(m[1]) : null;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`,
      }}
    />
  );
}

export const metadata: Metadata = {
  title: { template: "%s | Finance App", default: "Finance App" },
  description: "A personal finance management application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeNoFlash />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col px-8`}
      >
        <Providers>
          {/* ✅ Header is now guaranteed to be inside CookiesProvider */}
          <PageHeader className="my-8" />
          <main>{children}</main>
          <footer className="mt-auto text-center py-8">Footer</footer>
        </Providers>
      </body>
    </html>
  );
}
