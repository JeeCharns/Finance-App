"use client";

import { CookiesProvider } from "react-cookie";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
