"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("nav");
  const pathname = usePathname();

  const sections: NavSection[] = [
    {
      title: t("basics.title"),
      icon: <Home className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: t("basics.jsx"), href: "/basics/jsx" },
        { title: t("basics.components"), href: "/basics/components" },
        { title: t("basics.props"), href: "/basics/props" },
      ],
    },
    {
      title: t("state.title"),
      icon: <Code className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: t("state.useState"), href: "/state/use-state" },
        { title: t("state.useReducer"), href: "/state/use-reducer" },
        { title: t("state.liftingState"), href: "/state/lifting-state" },
      ],
    },
    {
      title: t("communication.title"),
      icon: <MessageSquare className="h-4 w-4" />,
      expanded: false,
      items: [
        {
          title: t("communication.parentToChild"),
          href: "/communication/parent-to-child",
        },
        {
          title: t("communication.childToParent"),
          href: "/communication/child-to-parent",
        },
        { title: t("communication.sibling"), href: "/communication/sibling" },
        { title: t("communication.context"), href: "/communication/context" },
      ],
    },
    {
      title: t("effects.title"),
      icon: <LifeBuoy className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: t("effects.useEffect"), href: "/effects/use-effect-basics" },
        {
          title: t("effects.dependencyArray"),
          href: "/effects/dependency-array",
        },
        { title: t("effects.cleanup"), href: "/effects/cleanup" },
      ],
    },
    {
      title: t("hooks.title"),
      icon: <Layers className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: t("hooks.useMemo"), href: "/hooks/use-memo" },
        { title: t("hooks.useCallback"), href: "/hooks/use-callback" },
        { title: t("hooks.useRef"), href: "/hooks/use-ref" },
        { title: t("hooks.customHooks"), href: "/hooks/custom-hooks" },
      ],
    },
    {
      title: t("advanced.title"),
      icon: <Zap className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: t("advanced.hoc"), href: "/advanced/hoc" },
        { title: t("advanced.renderProps"), href: "/advanced/render-props" },
        {
          title: t("advanced.compoundComponents"),
          href: "/advanced/compound-components",
        },
        {
          title: t("advanced.contextReducer"),
          href: "/advanced/context-reducer",
        },
      ],
    },
    {
      title: t("performance.title"),
      icon: <Gauge className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: t("performance.memo"), href: "/performance/memo" },
        {
          title: t("performance.listOptimization"),
          href: "/performance/list-optimization",
        },
        {
          title: t("performance.lazyLoading"),
          href: "/performance/lazy-loading",
        },
      ],
    },
    {
      title: t("examples.title"),
      icon: <Rocket className="h-4 w-4" />,
      expanded: false,
      items: [
        { title: t("examples.todoApp"), href: "/examples/todo-app" },
        { title: t("examples.dataFetching"), href: "/examples/data-fetching" },
        { title: t("examples.forms"), href: "/examples/forms" },
        { title: t("examples.notes"), href: "/examples/notes" },
      ],
    },
  ];

  const [sectionsState, setSectionsState] = useState<NavSection[]>(sections);

  const toggleSection = (index: number) => {
    setSectionsState((prevSections) =>
      prevSections.map((section, i) => ({
        ...section,
        expanded: i === index ? !section.expanded : false,
      }))
    );
  };

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b pr-12">
        <Link href="/">
          <h1 className="text-xl font-bold hover:text-primary cursor-pointer transition-colors">
            {t("title")}
          </h1>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {sectionsState.map((section, index) => (
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
  );
}
