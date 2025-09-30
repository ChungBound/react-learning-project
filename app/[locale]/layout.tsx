import type React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/Footer";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import LocaleSwitcher from "@/components/locale-switcher";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "React 学习导航" : "React Learning Guide",
    description:
      locale === "zh"
        ? "从基础到高级的 React 学习资源"
        : "React learning resources from basics to advanced",
    generator: "Bound",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 右上角常驻按钮组 */}
            <div className="fixed top-4 right-4 z-50 flex gap-2">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
            <div className="flex min-h-screen">
              <div className="hidden md:block">
                <Sidebar />
              </div>
              <div className="flex-1 p-6 md:p-8 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="md:hidden">
                    <MobileMenu />
                  </div>
                </div>
                {children}
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
