"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/code-block";
import { useState, useCallback, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 示例组件：记忆化回调函数
function CallbackExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 不使用 useCallback - 每次渲染都会创建新函数
  const handleClickWithoutCallback = () => {
    console.log("点击处理函数（无 useCallback）被调用，count:", count);
  };

  // 使用 useCallback - 只有当 count 变化时才创建新函数
  const handleClickWithCallback = useCallback(() => {
    console.log("点击处理函数（使用 useCallback）被调用，count:", count);
  }, [count]);

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">记忆化回调函数示例</h3>
        <p className="text-sm text-muted-foreground">
          打开控制台查看函数引用是否变化
        </p>

        <div className="space-y-2">
          <p>计数: {count}</p>
          <Button onClick={() => setCount(count + 1)} className="mr-2">
            增加计数
          </Button>
        </div>

        <div className="space-y-2">
          <p>文本: {text || "(空)"}</p>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入文本..."
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <CallbackButton
            onClick={handleClickWithoutCallback}
            label="无 useCallback"
          />
          <CallbackButton
            onClick={handleClickWithCallback}
            label="使用 useCallback"
          />
        </div>
      </div>
    </Card>
  );
}

// 记忆化的按钮组件
const CallbackButton = memo(
  ({ onClick, label }: { onClick: () => void; label: string }) => {
    // 跟踪重新渲染
    useEffect(() => {
      console.log(`${label} 按钮重新渲染`);
    });

    return (
      <div className="p-4 border rounded-md">
        <p className="text-sm mb-2">{label}</p>
        <Button variant="outline" onClick={onClick}>
          点击我
        </Button>
      </div>
    );
  }
);

CallbackButton.displayName = "CallbackButton";

// 示例组件：依赖项示例
function DependencyExample() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(true);

  // 依赖于 count
  const handleCountCallback = useCallback(() => {
    alert(`当前计数: ${count}`);
  }, [count]);

  // 依赖于 enabled
  const handleToggleCallback = useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);

  // 依赖于 count 和 enabled
  const handleBothCallback = useCallback(() => {
    if (enabled) {
      alert(`当前计数: ${count}`);
    } else {
      alert("功能已禁用");
    }
  }, [count, enabled]);

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">依赖项示例</h3>

        <div className="space-y-2">
          <p>计数: {count}</p>
          <p>状态: {enabled ? "启用" : "禁用"}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setCount(count + 1)}>增加计数</Button>
          <Button variant="outline" onClick={handleToggleCallback}>
            切换状态
          </Button>
          <Button variant="secondary" onClick={handleCountCallback}>
            显示计数
          </Button>
          <Button variant="secondary" onClick={handleBothCallback}>
            条件显示
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function UseCallbackPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useCallback</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 useCallback？</CardTitle>
            <CardDescription>
              useCallback 是 React 的一个内置钩子，用于记忆化回调函数。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useCallback</code> 是一个用于性能优化的 React
              钩子，它可以"记忆"（缓存）回调函数，避免在每次渲染时创建新的函数引用。
              当依赖项没有变化时，
              <code>useCallback</code>{" "}
              会返回上一次创建的函数引用，而不是创建一个新的函数。
            </p>
            <CodeBlock language="tsx">{`import { useCallback } from 'react';

// 基本语法
const memoizedCallback = useCallback(() => {
  // 回调函数的代码
  doSomething(a, b);
}, [a, b]); // 依赖项数组`}</CodeBlock>
            <p className="mt-4">
              <code>useCallback</code>{" "}
              接收两个参数：一个回调函数和一个依赖项数组。只有当依赖项变化时，才会返回一个新的函数引用。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>为什么使用 useCallback？</CardTitle>
            <CardDescription>
              了解 useCallback 的使用场景和好处。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              使用 <code>useCallback</code> 主要有以下原因：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                避免不必要的子组件重新渲染（当子组件使用 React.memo 或
                shouldComponentUpdate 时）
              </li>
              <li>
                避免在依赖项数组中引起无限循环（如在 useEffect 中使用函数）
              </li>
              <li>保持函数引用的稳定性，特别是当函数被传递给多个组件时</li>
              <li>优化事件处理函数的性能，特别是在复杂组件中</li>
            </ul>
            <p className="mb-4">
              但请记住，<code>useCallback</code>{" "}
              本身也有成本。对于简单的函数或很少变化的函数，使用{" "}
              <code>useCallback</code> 可能不会带来明显的性能提升。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useCallback 示例</CardTitle>
            <CardDescription>几个使用 useCallback 的实际例子。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">基本用法</TabsTrigger>
                <TabsTrigger value="dependency">依赖项</TabsTrigger>
                <TabsTrigger value="memo">与 memo 结合</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <CodeBlock language="tsx">{`import { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // 不使用 useCallback - 每次渲染都会创建新函数
  const handleIncrementWithoutCallback = () => {
    setCount(count + 1);
  };
  
  // 使用 useCallback - 只有当 count 变化时才创建新函数
  const handleIncrementWithCallback = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  // 使用函数式更新 - 不依赖于 count
  const handleIncrementWithCallbackFunctional = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // 空依赖数组，函数不会重新创建
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrementWithoutCallback}>
        增加 (无 useCallback)
      </button>
      <button onClick={handleIncrementWithCallback}>
        增加 (使用 useCallback)
      </button>
      <button onClick={handleIncrementWithCallbackFunctional}>
        增加 (函数式更新)
      </button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <CallbackExample />
                </div>
              </TabsContent>
              <TabsContent value="dependency">
                <CodeBlock language="tsx">{`import { useState, useCallback } from 'react';

function DependencyExample() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(true);
  
  // 依赖于 count
  const handleCountCallback = useCallback(() => {
    alert(\`当前计数: \${count}\`);
  }, [count]);
  
  // 依赖于 enabled
  const handleToggleCallback = useCallback(() => {
    setEnabled(prev => !prev);
  }, []);
  
  // 依赖于 count 和 enabled
  const handleBothCallback = useCallback(() => {
    if (enabled) {
      alert(\`当前计数: \${count}\`);
    } else {
      alert('功能已禁用');
    }
  }, [count, enabled]);
  
  return (
    <div>
      <p>计数: {count}</p>
      <p>状态: {enabled ? '启用' : '禁用'}</p>
      
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <button onClick={handleToggleCallback}>切换状态</button>
      <button onClick={handleCountCallback}>显示计数</button>
      <button onClick={handleBothCallback}>条件显示</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <DependencyExample />
                </div>
              </TabsContent>
              <TabsContent value="memo">
                <CodeBlock language="tsx">{`import { useState, useCallback, memo } from 'react';

// 使用 memo 包装的子组件
const MemoizedButton = memo(({ onClick, label }) => {
  console.log(\`\${label} 按钮渲染\`);
  
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // 不使用 useCallback - 每次渲染都会创建新函数
  const handleClickWithoutCallback = () => {
    console.log('点击处理函数（无 useCallback）被调用');
  };
  
  // 使用 useCallback - 函数引用保持稳定
  const handleClickWithCallback = useCallback(() => {
    console.log('点击处理函数（使用 useCallback）被调用');
  }, []);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入文本..."
      />
      
      {/* 每次父组件渲染时都会重新渲染，因为 onClick 属性每次都是新函数 */}
      <MemoizedButton
        onClick={handleClickWithoutCallback}
        label="无 useCallback"
      />
      
      {/* 只有当 useCallback 的依赖项变化时才会重新渲染 */}
      <MemoizedButton
        onClick={handleClickWithCallback}
        label="使用 useCallback"
      />
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useCallback vs useMemo</CardTitle>
            <CardDescription>
              了解 useCallback 和 useMemo 的区别。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useCallback</code> 和 <code>useMemo</code>{" "}
              都是用于性能优化的 React 钩子，但它们有不同的用途：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">useCallback</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>专门用于记忆函数</li>
                  <li>返回记忆化的函数</li>
                  <li>适用于传递给子组件的回调函数</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`// useCallback 示例
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">useMemo</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>记忆任何计算结果（值、对象、数组等）</li>
                  <li>返回记忆化的值</li>
                  <li>适用于昂贵的计算和保持引用相等性</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`// useMemo 示例
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`}</CodeBlock>
              </div>
            </div>
            <p className="mt-4">
              实际上，<code>useCallback(fn, deps)</code> 相当于{" "}
              <code>useMemo(() =&gt; fn, deps)</code>。 两者的区别在于{" "}
              <code>useMemo</code> 可以记忆任何值，而 <code>useCallback</code>{" "}
              专门用于记忆函数。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useCallback 与 useEffect</CardTitle>
            <CardDescription>在 useEffect 中使用 useCallback。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useCallback</code> 经常与 <code>useEffect</code>{" "}
              一起使用，特别是当 effect 依赖于函数时。这可以避免不必要的 effect
              执行。
            </p>
            <CodeBlock language="tsx">{`import { useState, useCallback, useEffect } from 'react';

function SearchComponent({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 使用 useCallback 记忆化搜索函数
  const fetchResults = useCallback(async () => {
    if (!query) return;
    
    setLoading(true);
    try {
      const response = await fetch(\`/api/search?q=\${query}\`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('搜索出错:', error);
    } finally {
      setLoading(false);
    }
  }, [query]); // 只有 query 变化时才创建新函数
  
  // 使用 useEffect 调用搜索函数
  useEffect(() => {
    fetchResults();
  }, [fetchResults]); // 依赖于记忆化的函数
  
  return (
    <div>
      <h2>搜索结果: {query}</h2>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <ul>
          {results.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">
              在上面的例子中，<code>fetchResults</code> 函数使用{" "}
              <code>useCallback</code> 记忆化，只有当 <code>query</code>{" "}
              变化时才会创建新函数。 这样，<code>useEffect</code> 只会在{" "}
              <code>query</code> 变化时执行，避免了不必要的 API 调用。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useCallback 与 TypeScript</CardTitle>
            <CardDescription>
              在 TypeScript 中使用 useCallback。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 TypeScript 中使用 <code>useCallback</code>{" "}
              时，可以为回调函数指定类型，提高代码的类型安全性。
            </p>
            <CodeBlock language="tsx">{`import { useCallback } from 'react';

function TypedCallbacks() {
  // 基本类型
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('按钮被点击', event);
  }, []);
  
  // 带参数的回调函数
  const handleItemClick = useCallback((id: number, name: string) => {
    console.log(\`项目被点击: \${id}, \${name}\`);
  }, []);
  
  // 返回值的回调函数
  const calculateTotal = useCallback((items: { price: number }[]): number => {
    return items.reduce((total, item) => total + item.price, 0);
  }, []);
  
  // 泛型回调函数
  const processData = useCallback(<T extends { id: number }>(data: T[]): T[] => {
    return data.filter(item => item.id > 0);
  }, []);
  
  return (
    <div>
      <button onClick={handleClick}>点击我</button>
      <button onClick={() => handleItemClick(1, 'Item 1')}>点击项目</button>
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">
              使用 TypeScript
              可以提高代码的类型安全性，减少运行时错误，并提供更好的开发体验。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>常见陷阱和最佳实践</CardTitle>
            <CardDescription>
              使用 useCallback 时的常见问题和最佳实践。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">常见陷阱</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>过度使用 useCallback，导致代码复杂性增加</li>
                  <li>忘记在依赖项数组中包含所有依赖</li>
                  <li>在不需要的地方使用 useCallback，如简单的内联函数</li>
                  <li>忽略闭包陷阱，导致使用过时的值</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">最佳实践</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    只在必要时使用 useCallback，如传递给使用 memo 的子组件的函数
                  </li>
                  <li>正确指定依赖项，包含回调函数中使用的所有外部变量</li>
                  <li>
                    考虑使用函数式更新（如 setCount(prev ={">"}; prev +
                    1)）减少依赖
                  </li>
                  <li>将相关逻辑封装在自定义钩子中，提高代码可读性</li>
                  <li>
                    使用 ESLint 规则（eslint-plugin-react-hooks）检测依赖项问题
                  </li>
                </ul>
              </div>
            </div>

            <CodeBlock language="tsx" className="mt-4">{`// 闭包陷阱示例
function ClosureTrap() {
  const [count, setCount] = useState(0);
  
  // 错误：count 被闭包捕获，但函数不会重新创建
  const handleAlertStale = useCallback(() => {
    alert(\`当前计数: \${count}\`);
  }, []); // 空依赖数组，函数不会重新创建
  
  // 正确：包含所有依赖项
  const handleAlertFresh = useCallback(() => {
    alert(\`当前计数: \${count}\`);
  }, [count]); // 依赖于 count，当 count 变化时函数会重新创建
  
  // 另一种方法：使用 ref 跟踪最新值
  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);
  
  const handleAlertRef = useCallback(() => {
    alert(\`当前计数: \${countRef.current}\`);
  }, []); // 空依赖数组，但通过 ref 访问最新值
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <button onClick={handleAlertStale}>显示过时的计数</button>
      <button onClick={handleAlertFresh}>显示最新的计数</button>
      <button onClick={handleAlertRef}>通过 ref 显示计数</button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>性能考虑</CardTitle>
            <CardDescription>
              何时使用 useCallback，何时不使用。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              虽然 <code>useCallback</code>{" "}
              可以提高性能，但它并不是万能的。以下是一些使用{" "}
              <code>useCallback</code> 的注意事项：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">
                  何时使用 useCallback
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>传递给使用 memo 的子组件的函数</li>
                  <li>作为其他 Hook 的依赖项（如 useEffect）</li>
                  <li>频繁重新渲染的组件中的事件处理函数</li>
                  <li>需要保持引用稳定的函数</li>
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">
                  何时不使用 useCallback
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>组件内部使用的函数，不传递给子组件</li>
                  <li>
                    简单的内联函数，如 {"onClick={() => setCount(count + 1)}"}
                  </li>
                  <li>很少重新渲染的组件</li>
                  <li>不关心函数引用稳定性的场景</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              记住，<code>useCallback</code>{" "}
              本身也有成本。它会增加代码复杂性，并占用内存来存储记忆化的函数。在某些情况下，过度使用{" "}
              <code>useCallback</code> 可能会导致性能下降而不是提升。
            </p>
            <CodeBlock
              language="tsx"
              className="mt-4"
            >{`// 不需要 useCallback 的例子子子
function SimpleComponent() {
  const [count, setCount] = useState(0);= useState(0);
  
  // 不需要 useCallback，简单的内联函数
  return (
    <button onClick={() => setCount(count + 1)}>
      增加计数: {count}
    </button>
  );
}

// 需要 useCallback 的例子
function ComplexComponent({ onItemSelect }) {
  const [items, setItems] = useState([]);
  
  // 需要 useCallback，传递给记忆化的子组件
  const handleItemClick = useCallback((id) => {
    const selectedItem = items.find(item => item.id === id);
    onItemSelect(selectedItem);
  }, [items, onItemSelect]);
  
  return (
    <div>
      {items.map(item => (
        <MemoizedItem
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
