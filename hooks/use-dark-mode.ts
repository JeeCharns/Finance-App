// hooks/use-dark-mode.ts
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useDarkMode = (defaultTheme: "light" | "dark" = "dark") => {
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [, setCookie] = useCookies(["theme"]);

  useEffect(() => {
    // Keep only the .dark class in sync with state
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setCookie("theme", next, { path: "/", sameSite: "lax" });
  };

  return { theme, toggleTheme };
};

export default useDarkMode;
