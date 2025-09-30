"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, BookOpen, Code, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {t("basics.title")}
              </CardTitle>
              <CardDescription>{t("basics.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{t("basics.items.jsx")}</li>
                <li>{t("basics.items.components")}</li>
                <li>{t("basics.items.props")}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/basics/jsx">
                  {t("basics.button")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code className="h-5 w-5" />
                {t("communication.title")}
              </CardTitle>
              <CardDescription>
                {t("communication.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{t("communication.items.parentChild")}</li>
                <li>{t("communication.items.childParent")}</li>
                <li>{t("communication.items.sibling")}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/communication/parent-to-child">
                  {t("communication.button")}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="h-5 w-5" />
                {t("advanced.title")}
              </CardTitle>
              <CardDescription>{t("advanced.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{t("advanced.items.hoc")}</li>
                <li>{t("advanced.items.renderProps")}</li>
                <li>{t("advanced.items.composition")}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/advanced/hoc">
                  {t("advanced.button")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{t("howToUse.title")}</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>{t("howToUse.step1")}</li>
            <li>{t("howToUse.step2")}</li>
            <li>{t("howToUse.step3")}</li>
            <li>{t("howToUse.step4")}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
