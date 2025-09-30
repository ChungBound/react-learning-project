"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { useTranslations } from "next-intl";

export function MobileMenu() {
  const t = useTranslations("nav");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">导航菜单</SheetTitle>
        <SheetDescription className="sr-only">
          包含所有导航链接的侧边栏菜单
        </SheetDescription>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
