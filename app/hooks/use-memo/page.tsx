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
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 示例组件：计算开销大的操作
function ExpensiveCalculationExample() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  // 使用 useMemo 缓存计算结果
  const expensiveResult = useMemo(() => {
    console.log("执行昂贵计算...");
    // 模拟耗时操作
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += 1;
    }
    return count * 2;
  }, [count]); // 只有 count 变化时才重新计算

  const theme = {
    backgroundColor: dark ? "#333" : "#fff",
    color: dark ? "#fff" : "#333",
  };

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4" style={theme}>
        <h3 className="text-lg font-medium">昂贵计算示例</h3>
        <p className="text-sm text-muted-foreground">
          打开控制台查看计算何时执行
        </p>

        <div
          className="p-4 rounded-md"
          style={{ backgroundColor: dark ? "#444" : "#f0f0f0" }}
        >
          <p>计数: {count}</p>
          <p>计算结果 (count × 2): {expensiveResult}</p>
        </div>

        <div className="space-x-2">
          <Button onClick={() => setCount(count + 1)}>增加计数</Button>
          <Button variant="outline" onClick={() => setDark(!dark)}>
            切换主题
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          注意：点击"增加计数"会触发重新计算，而点击"切换主题"不会。
        </p>
      </div>
    </Card>
  );
}

// 示例组件：引用相等性
function ReferenceEqualityExample() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(25);
  const [count, setCount] = useState(0);

  // 不使用 useMemo - 每次渲染都会创建新对象
  const userWithoutMemo = { name, age };

  // 使用 useMemo - 只有 name 或 age 变化时才创建新对象
  const userWithMemo = useMemo(() => ({ name, age }), [name, age]);

  // 检查引用是否变化
  const [prevUserWithoutMemo, setPrevUserWithoutMemo] =
    useState(userWithoutMemo);
  const [prevUserWithMemo, setPrevUserWithMemo] = useState(userWithMemo);

  const referenceChangedWithoutMemo = prevUserWithoutMemo !== userWithoutMemo;
  const referenceChangedWithMemo = prevUserWithMemo !== userWithMemo;

  // 更新前一个引用
  useMemo(() => {
    setPrevUserWithoutMemo(userWithoutMemo);
    setPrevUserWithMemo(userWithMemo);
  }, [userWithoutMemo, userWithMemo]);

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">引用相等性示例</h3>

        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入名称"
              className="max-w-xs"
            />
            <Button variant="outline" onClick={() => setAge(age + 1)}>
              增加年龄
            </Button>
            <Button variant="outline" onClick={() => setCount(count + 1)}>
              增加计数
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-md">
            <p>名称: {name || "(空)"}</p>
            <p>年龄: {age}</p>
            <p>计数: {count}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-2">不使用 useMemo</h4>
              <p className="text-sm">
                引用是否变化: {referenceChangedWithoutMemo ? "是" : "否"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                每次渲染都会创建新对象，即使只改变计数。
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-medium mb-2">使用 useMemo</h4>
              <p className="text-sm">
                引用是否变化: {referenceChangedWithMemo ? "是" : "否"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                只有当名称或年龄变化时才会创建新对象。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function UseMemoPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useMemo</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 useMemo？</CardTitle>
            <CardDescription>
              useMemo 是 React 的一个内置钩子，用于记忆计算结果。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useMemo</code> 是一个用于性能优化的 React
              钩子，它可以"记忆"（缓存）计算结果，避免在每次渲染时重新计算。
              当依赖项没有变化时，<code>useMemo</code>{" "}
              会返回上一次计算的结果，而不是重新执行计算函数。
            </p>
            <CodeBlock language="tsx">{`import { useMemo } from 'react';

// 基本语法
const memoizedValue = useMemo(() => {
  // 执行计算并返回结果
  return computeExpensiveValue(a, b);
}, [a, b]); // 依赖项数组`}</CodeBlock>
            <p className="mt-4">
              <code>useMemo</code>{" "}
              接收两个参数：一个创建函数和一个依赖项数组。创建函数会在渲染期间执行，但只有当依赖项变化时才会重新执行。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>为什么使用 useMemo？</CardTitle>
            <CardDescription>了解 useMemo 的使用场景和好处。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              使用 <code>useMemo</code> 主要有两个原因：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">1. 避免昂贵的计算</h3>
                <p>
                  当计算过程很耗时时，<code>useMemo</code>{" "}
                  可以避免在每次渲染时都重新计算。只有当依赖项变化时，才会重新执行计算。
                </p>
                <CodeBlock language="tsx" className="mt-2">{`// 避免昂贵的计算
const memoizedResult = useMemo(() => {
  console.log('执行昂贵计算...');
  // 假设这是一个耗时的计算
  return computeExpensiveValue(a, b);
}, [a, b]);`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">2. 保持引用相等性</h3>
                <p>
                  <code>useMemo</code>{" "}
                  可以用来缓存对象或数组的引用，避免在每次渲染时创建新的引用，这对于避免不必要的重新渲染很有用。
                </p>
                <CodeBlock language="tsx" className="mt-2">{`// 保持引用相等性
const memoizedObject = useMemo(() => {
  return { id, name };
}, [id, name]);`}</CodeBlock>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useMemo 的使用场景</CardTitle>
            <CardDescription>何时应该使用 useMemo。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              以下是一些适合使用 <code>useMemo</code> 的场景：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>计算开销大的操作（如复杂的数据转换、排序、过滤等）</li>
              <li>
                需要保持引用相等性的对象或数组（如传递给子组件的 props
                或依赖项）
              </li>
              <li>
                作为其他 Hook 的依赖项（如 <code>useEffect</code>、
                <code>useCallback</code> 等）
              </li>
              <li>需要避免重复创建的复杂对象（如图表配置、样式对象等）</li>
            </ul>
            <p className="mb-4">
              但请记住，<code>useMemo</code>{" "}
              本身也有成本。对于简单的计算或很少变化的值，使用{" "}
              <code>useMemo</code> 可能不会带来明显的性能提升。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useMemo 示例</CardTitle>
            <CardDescription>几个使用 useMemo 的实际例子。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="expensive">
              <TabsList className="mb-4">
                <TabsTrigger value="expensive">昂贵计算</TabsTrigger>
                <TabsTrigger value="reference">引用相等性</TabsTrigger>
                <TabsTrigger value="derived">派生状态</TabsTrigger>
              </TabsList>
              <TabsContent value="expensive">
                <CodeBlock language="tsx">{`import { useState, useMemo } from 'react';

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);
  
  // 使用 useMemo 缓存计算结果
  const expensiveResult = useMemo(() => {
    console.log('执行昂贵计算...');
    // 模拟耗时操作
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += 1;
    }
    return count * 2;
  }, [count]); // 只有 count 变化时才重新计算
  
  const theme = {
    backgroundColor: dark ? '#333' : '#fff',
    color: dark ? '#fff' : '#333'
  };
  
  return (
    <div style={theme}>
      <h1>昂贵计算示例</h1>
      <p>计数: {count}</p>
      <p>计算结果 (count × 2): {expensiveResult}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <button onClick={() => setDark(!dark)}>切换主题</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <ExpensiveCalculationExample />
                </div>
              </TabsContent>
              <TabsContent value="reference">
                <CodeBlock language="tsx">{`import { useState, useMemo, useEffect } from 'react';

function ReferenceEquality() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [count, setCount] = useState(0);
  
  // 不使用 useMemo - 每次渲染都会创建新对象
  const userWithoutMemo = { name, age };
  
  // 使用 useMemo - 只有 name 或 age 变化时才创建新对象
  const userWithMemo = useMemo(() => ({ name, age }), [name, age]);
  
  // 检查引用是否变化
  useEffect(() => {
    console.log('不使用 useMemo 的对象引用变化了');
  }, [userWithoutMemo]);
  
  useEffect(() => {
    console.log('使用 useMemo 的对象引用变化了');
  }, [userWithMemo]);
  
  return (
    <div>
      <h1>引用相等性示例</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入名称"
      />
      <button onClick={() => setAge(age + 1)}>增加年龄</button>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      
      <p>名称: {name}</p>
      <p>年龄: {age}</p>
      <p>计数: {count}</p>
      
      <p>
        查看控制台，观察当你改变名称、年龄或计数时，
        哪个对象的引用会变化。
      </p>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <ReferenceEqualityExample />
                </div>
              </TabsContent>
              <TabsContent value="derived">
                <CodeBlock language="tsx">{`import { useState, useMemo } from 'react';

function DerivedState() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [filter, setFilter] = useState('all');
  
  // 使用 useMemo 计算派生状态
  const filteredNumbers = useMemo(() => {
    console.log('过滤数字...');
    
    if (filter === 'all') {
      return numbers;
    } else if (filter === 'even') {
      return numbers.filter(n => n % 2 === 0);
    } else if (filter === 'odd') {
      return numbers.filter(n => n % 2 !== 0);
    }
    
    return numbers;
  }, [numbers, filter]); // 依赖于 numbers 和 filter
  
  // 使用 useMemo 计算统计信息
  const stats = useMemo(() => {
    console.log('计算统计信息...');
    
    return {
      count: filteredNumbers.length,
      sum: filteredNumbers.reduce((a, b) => a + b, 0),
      average: filteredNumbers.length > 0
        ? filteredNumbers.reduce((a, b) => a + b, 0) / filteredNumbers.length
        : 0
    };
  }, [filteredNumbers]); // 依赖于 filteredNumbers
  
  const addNumber = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setNumbers([...numbers, newNumber]);
  };
  
  return (
    <div>
      <h1>派生状态示例</h1>
      <div>
        <button onClick={addNumber}>添加随机数</button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">全部</option>
          <option value="even">偶数</option>
          <option value="odd">奇数</option>
        </select>
      </div>
      
      <div>
        <h2>数字列表</h2>
        <ul>
          {filteredNumbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>统计信息</h2>
        <p>数量: {stats.count}</p>
        <p>总和: {stats.sum}</p>
        <p>平均值: {stats.average.toFixed(2)}</p>
      </div>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useMemo vs useCallback</CardTitle>
            <CardDescription>
              了解 useMemo 和 useCallback 的区别。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useMemo</code> 和 <code>useCallback</code>{" "}
              都是用于性能优化的 React 钩子，但它们有不同的用途：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
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
            <CardTitle>useMemo 的性能考虑</CardTitle>
            <CardDescription>何时使用 useMemo，何时不使用。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              虽然 <code>useMemo</code>{" "}
              可以提高性能，但它并不是万能的。以下是一些使用{" "}
              <code>useMemo</code> 的注意事项：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">何时使用 useMemo</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>计算开销大（如复杂的数据处理）</li>
                  <li>需要保持引用相等性以避免不必要的重新渲染</li>
                  <li>作为其他 Hook 的依赖项</li>
                  <li>计算结果需要在多次渲染中保持一致</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
