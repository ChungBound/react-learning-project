"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"
import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"

// 示例组件：懒加载示例
function LazyLoadingExample() {
  const [showComponent, setShowComponent] = useState(false)

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">懒加载示例</h3>

        <Button onClick={() => setShowComponent(!showComponent)}>{showComponent ? "隐藏" : "显示"}组件</Button>

        <div className="p-4 border rounded-md min-h-[200px]">
          {showComponent && (
            <Suspense fallback={<div className="text-center">加载中...</div>}>
              <div className="p-4 bg-muted rounded-md">
                <p>这里是懒加载的组件内容。</p>
                <p>在实际应用中，这可能是一个复杂的组件，如图表、表格或表单。</p>
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function LazyLoadingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">懒加载</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是懒加载？</CardTitle>
            <CardDescription>懒加载是一种优化技术，用于延迟加载非关键资源。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              懒加载（Lazy
              Loading）是一种优化技术，它允许你延迟加载应用中非立即需要的部分，从而减少初始加载时间和资源消耗。在 React
              中，懒加载通常与代码分割（Code Splitting）结合使用，只在需要时才加载特定的组件或模块。
            </p>
            <p className="mb-4">
              React 提供了内置的懒加载功能，通过 <code>React.lazy</code> 函数和 <code>Suspense</code>{" "}
              组件实现。这使得你可以像渲染常规组件一样渲染动态导入的组件。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>React.lazy 和 Suspense</CardTitle>
            <CardDescription>了解 React 中的懒加载机制。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>React.lazy</code> 函数允许你定义一个动态加载的组件。它接受一个函数，这个函数需要调用{" "}
              <code>import()</code> 动态导入组件。<code>React.lazy</code> 返回一个 Promise，这个 Promise
              解析为一个带有默认导出的模块。
            </p>
            <p className="mb-4">
              <code>Suspense</code> 组件允许你在等待加载懒加载组件时显示一些后备内容（如加载指示器）。
            </p>
            <CodeBlock language="tsx">{`import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

export default MyComponent;
`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>懒加载示例</CardTitle>
            <CardDescription>展示 React 懒加载的实际应用。</CardDescription>
          </CardHeader>
          <CardContent>
            <LazyLoadingExample />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>创建你自己的懒加载组件</CardTitle>
            <CardDescription>步骤指南。</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <b>创建组件：</b> 首先，创建一个你想要懒加载的组件。
              </li>
              <li>
                <b>动态导入：</b> 使用 <code>React.lazy</code> 动态导入你的组件。
              </li>
              <li>
                <b>使用 Suspense：</b> 将你的懒加载组件包裹在 <code>Suspense</code> 组件中，并提供一个{" "}
                <code>fallback</code> 属性，用于在组件加载时显示加载指示器。
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>优化懒加载性能。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <b>代码分割：</b> 确保你的代码被合理地分割，以便只加载需要的代码。
              </li>
              <li>
                <b>加载指示器：</b> 提供清晰的加载指示器，让用户知道内容正在加载中。
              </li>
              <li>
                <b>错误处理：</b> 考虑懒加载失败的情况，并提供适当的错误处理机制。
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 最后创建实战案例部分的页面 */}
      </div>
    </div>
  )
}
