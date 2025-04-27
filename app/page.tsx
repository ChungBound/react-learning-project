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

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            React 学习导航
          </h1>
          <p className="text-xl text-muted-foreground">
            从基础到高级的 React 学习资源，帮助你掌握 React 开发
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                基础知识
              </CardTitle>
              <CardDescription>React 的核心概念和基础用法</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>JSX 语法与表达式</li>
                <li>组件的创建与使用</li>
                <li>Props 属性传递</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/basics/jsx">
                  开始学习 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code className="h-5 w-5" />
                组件通信
              </CardTitle>
              <CardDescription>各种组件间数据传递的方式</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>父子组件数据传递</li>
                <li>子父组件事件通知</li>
                <li>兄弟组件和跨层级通信</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/communication/parent-to-child">
                  开始学习 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="h-5 w-5" />
                高级模式
              </CardTitle>
              <CardDescription>React 高级设计模式与技巧</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>高阶组件 (HOC)</li>
                <li>Render Props 模式</li>
                <li>组合组件与状态管理</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/advanced/hoc">
                  开始学习 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">如何使用本站</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>从左侧导航栏选择你想学习的 React 主题</li>
            <li>每个页面包含概念解释、代码示例和实际应用</li>
            <li>查看代码示例，理解 React 的工作原理</li>
            <li>按照学习路径从基础到高级逐步学习</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
