import type React from "react";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/Footer";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React 学习导航",
  description: "从基础到高级的 React 学习资源",
  generator: "Bound",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      {/* <body className={inter.className}> */}
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 右上角常驻主题切换按钮 */}
          <div className="fixed top-4 right-4 z-50">
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
                {/* ThemeToggle 已移至全局固定位置，这里删除 */}
              </div>
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
