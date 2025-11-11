import { cookies } from "next/headers";

export async function getServerDarkMode(
  defaultTheme: "light" | "dark" = "dark"
): Promise<"light" | "dark"> {
  const cookieStore = await cookies(); // 👈 await
  const theme = cookieStore.get("theme")?.value;
  return theme === "light" || theme === "dark" ? theme : defaultTheme;
}
