"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Code,
  Layers,
  MessageSquare,
  LifeBuoy,
  Zap,
  Rocket,
  Gauge,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
  expanded?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [sections, setSections] = useState<NavSection[]>([
    {
      title: "React 基础",
      icon: <Home className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "JSX 语法", href: "/basics/jsx" },
        { title: "组件基础", href: "/basics/components" },
        { title: "Props 属性", href: "/basics/props" },
      ],
    },
    {
      title: "状态管理",
      icon: <Code className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "useState 钩子", href: "/state/use-state" },
        { title: "useReducer 钩子", href: "/state/use-reducer" },
        { title: "状态提升", href: "/state/lifting-state" },
      ],
    },
    {
      title: "组件通信",
      icon: <MessageSquare className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "父传子 (Props)", href: "/communication/parent-to-child" },
        { title: "子传父 (回调函数)", href: "/communication/child-to-parent" },
        { title: "兄弟组件通信", href: "/communication/sibling" },
        { title: "跨层级通信 (Context)", href: "/communication/context" },
      ],
    },
    {
      title: "生命周期与副作用",
      icon: <LifeBuoy className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "useEffect 基础", href: "/effects/use-effect-basics" },
        { title: "依赖数组", href: "/effects/dependency-array" },
        { title: "清理副作用", href: "/effects/cleanup" },
      ],
    },
    {
      title: "Hooks 进阶",
      icon: <Layers className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "useMemo", href: "/hooks/use-memo" },
        { title: "useCallback", href: "/hooks/use-callback" },
        { title: "useRef", href: "/hooks/use-ref" },
        { title: "自定义 Hooks", href: "/hooks/custom-hooks" },
      ],
    },
    {
      title: "高级模式",
      icon: <Zap className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "高阶组件 (HOC)", href: "/advanced/hoc" },
        { title: "Render Props", href: "/advanced/render-props" },
        { title: "组合组件", href: "/advanced/compound-components" },
        { title: "Context + useReducer", href: "/advanced/context-reducer" },
      ],
    },
    {
      title: "性能优化",
      icon: <Gauge className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "React.memo", href: "/performance/memo" },
        { title: "列表优化", href: "/performance/list-optimization" },
        { title: "懒加载", href: "/performance/lazy-loading" },
      ],
    },
    {
      title: "实战案例",
      icon: <Rocket className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: "待办事项应用", href: "/examples/todo-app" },
        { title: "数据获取与展示", href: "/examples/data-fetching" },
        { title: "表单处理", href: "/examples/forms" },
      ],
    },
  ]);

  const toggleSection = (index: number) => {
    setSections((prevSections) =>
      prevSections.map((section, i) => ({
        ...section,
        expanded: i === index ? !section.expanded : false,
      }))
    );
  };

  return (
    <div className="w-64 border-r bg-background h-screen overflow-y-auto hidden md:block">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <h1 className="text-xl font-bold hover:text-primary cursor-pointer transition-colors">
              React 学习导航
            </h1>
          </Link>
          <ThemeToggle />
        </div>
        <nav className="space-y-1">
          {sections.map((section, index) => (
            <div key={section.title} className="mb-2">
              <Button
                variant="ghost"
                className="w-full justify-start p-2 mb-1"
                onClick={() => toggleSection(index)}
              >
                {section.icon}
                <span className="ml-2">{section.title}</span>
                {section.expanded ? (
                  <ChevronDown className="h-4 w-4 ml-auto" />
                ) : (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </Button>
              {section.expanded && (
                <div className="ml-6 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block py-1.5 px-3 text-sm rounded-md",
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
