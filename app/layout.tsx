import type React from "react";
import { locales } from "@/i18n/config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
