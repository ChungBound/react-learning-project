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
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 示例组件：DOM 引用
function DomRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const focusInput = () => {
    // 使用 ref 直接操作 DOM
    inputRef.current?.focus();
  };

  const getInputValue = () => {
    if (inputRef.current) {
      setMessage(`当前输入值: ${inputRef.current.value}`);
    }
  };

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">DOM 引用示例</h3>

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="输入一些文本..."
            className="max-w-xs"
          />
          <Button onClick={focusInput}>聚焦</Button>
          <Button variant="outline" onClick={getInputValue}>
            获取值
          </Button>
        </div>

        {message && <p className="p-2 bg-muted rounded-md">{message}</p>}
      </div>
    </Card>
  );
}

// 示例组件：保存前一个值
function PreviousValueExample() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number | undefined>(undefined);

  // 在每次渲染后更新 ref
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  const prevCount = prevCountRef.current;

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">保存前一个值示例</h3>

        <div className="p-4 bg-muted rounded-md">
          <p>当前计数: {count}</p>
          <p>前一个计数: {prevCount !== undefined ? prevCount : "无"}</p>
        </div>

        <Button onClick={() => setCount(count + 1)}>增加计数</Button>
      </div>
    </Card>
  );
}

// 示例组件：计时器
function TimerExample() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      // 启动计时器
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (timerRef.current) {
      // 停止计时器
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">计时器示例</h3>
        <p className="text-2xl font-bold mb-4">{seconds} 秒</p>
        <div className="flex justify-center gap-2">
          <Button onClick={handleStartStop}>
            {isRunning ? "暂停" : "开始"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>
    </Card>
  );
}

// 示例组件：可变引用
function MutableRefExample() {
  const [renderCount, setRenderCount] = useState(0);
  const countRef = useRef(0);

  // 增加 ref 值（不会触发重新渲染）
  const handleIncreaseRef = () => {
    countRef.current += 1;
    console.log("Ref 计数:", countRef.current);
  };

  // 增加 state 值（会触发重新渲染）
  const handleIncreaseState = () => {
    setRenderCount(renderCount + 1);
  };

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">可变引用示例</h3>
        <p className="text-sm text-muted-foreground">
          打开控制台查看 ref 值的变化
        </p>

        <div className="p-4 bg-muted rounded-md">
          <p>Ref 计数 (不触发重新渲染): {countRef.current}</p>
          <p>State 计数 (触发重新渲染): {renderCount}</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleIncreaseRef}>增加 Ref 计数</Button>
          <Button variant="outline" onClick={handleIncreaseState}>
            增加 State 计数
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function UseRefPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useRef</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 useRef？</CardTitle>
            <CardDescription>
              useRef 是 React 的一个内置钩子，用于保存可变值。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useRef</code> 是一个 React 钩子，它返回一个可变的 ref
              对象，其 <code>.current</code>{" "}
              属性被初始化为传入的参数。返回的对象在组件的整个生命周期内保持不变。
            </p>
            <CodeBlock language="tsx">{`import { useRef } from 'react';

// 基本语法
const refContainer = useRef(initialValue);`}</CodeBlock>
            <p className="mt-4">
              <code>useRef</code> 有两个主要用途：
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>访问 DOM 元素</li>
              <li>保存任何可变值，这些值在更改时不会触发组件重新渲染</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useRef 的基本用法</CardTitle>
            <CardDescription>了解如何使用 useRef 钩子。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dom">
              <TabsList className="mb-4">
                <TabsTrigger value="dom">访问 DOM 元素</TabsTrigger>
                <TabsTrigger value="mutable">保存可变值</TabsTrigger>
              </TabsList>
              <TabsContent value="dom">
                <CodeBlock language="tsx">{`import { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  // 创建一个 ref
  const inputRef = useRef(null);
  
  // 点击按钮时聚焦输入框
  const focusInput = () => {
    // 通过 current 属性访问 DOM 元素
    inputRef.current.focus();
  };
  
  return (
    <div>
      {/* 将 ref 附加到 DOM 元素 */}
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <DomRefExample />
                </div>
              </TabsContent>
              <TabsContent value="mutable">
                <CodeBlock language="tsx">{`import { useRef, useState } from 'react';

function Counter() {
  const [renderCount, setRenderCount] = useState(0);
  
  // 创建一个 ref 来存储可变值
  const countRef = useRef(0);
  
  // 增加 ref 值（不会触发重新渲染）
  const handleIncreaseRef = () => {
    countRef.current += 1;
    console.log('Ref 计数:', countRef.current);
  };
  
  // 增加 state 值（会触发重新渲染）
  const handleIncreaseState = () => {
    setRenderCount(renderCount + 1);
  };
  
  return (
    <div>
      <p>Ref 计数 (不触发重新渲染): {countRef.current}</p>
      <p>State 计数 (触发重新渲染): {renderCount}</p>
      
      <button onClick={handleIncreaseRef}>增加 Ref 计数</button>
      <button onClick={handleIncreaseState}>增加 State 计数</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <MutableRefExample />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useRef vs useState</CardTitle>
            <CardDescription>了解 useRef 和 useState 的区别。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useRef</code> 和 <code>useState</code>{" "}
              都可以在组件渲染之间保存值，但它们有几个关键区别：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">useState</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>更新会触发组件重新渲染</li>
                  <li>状态更新是异步的</li>
                  <li>通过 setter 函数更新</li>
                  <li>适用于需要在 UI 中反映的值</li>
                </ul>
                <CodeBlock
                  language="tsx"
                  className="mt-2"
                >{`const [count, setCount] = useState(0);

// 更新会触发重新渲染
const increment = () => {
  setCount(count + 1);
};`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">useRef</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>更新不会触发组件重新渲染</li>
                  <li>更新是同步的</li>
                  <li>直接修改 .current 属性</li>
                  <li>适用于不需要在 UI 中反映的值</li>
                </ul>
                <CodeBlock
                  language="tsx"
                  className="mt-2"
                >{`const countRef = useRef(0);

// 更新不会触发重新渲染
const increment = () => {
  countRef.current += 1;
  console.log(countRef.current);
};`}</CodeBlock>
              </div>
            </div>
            <p className="mt-4">
              选择使用 <code>useState</code> 还是 <code>useRef</code>{" "}
              取决于你是否需要在值变化时重新渲染组件。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useRef 的常见用例</CardTitle>
            <CardDescription>了解 useRef 的实际应用场景。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="previous">
              <TabsList className="mb-4">
                <TabsTrigger value="previous">保存前一个值</TabsTrigger>
                <TabsTrigger value="timer">管理定时器</TabsTrigger>
                <TabsTrigger value="form">表单处理</TabsTrigger>
              </TabsList>
              <TabsContent value="previous">
                <CodeBlock language="tsx">{`import { useState, useEffect, useRef } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // 创建一个 ref 来存储前一个值
  const prevCountRef = useRef<number | undefined>(undefined);
  
  // 在每次渲染后更新 ref
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  // 读取前一个值
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <p>前一个计数: {prevCount !== undefined ? prevCount : '无'}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <PreviousValueExample />
                </div>
              </TabsContent>
              <TabsContent value="timer">
                <CodeBlock language="tsx">{`import { useState, useEffect, useRef } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // 使用 ref 存储定时器 ID
  const timerRef = useRef(null);
  
  useEffect(() => {
    if (isRunning) {
      // 启动定时器
      timerRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (timerRef.current) {
      // 停止定时器
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);
  
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  
  return (
    <div>
      <p>{seconds} 秒</p>
      <button onClick={handleStartStop}>
        {isRunning ? '暂停' : '开始'}
      </button>
      <button onClick={handleReset}>重置</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <TimerExample />
                </div>
              </TabsContent>
              <TabsContent value="form">
                <CodeBlock language="tsx">{`import { useRef, FormEvent } from 'react';

function Form() {
  // 创建多个 ref 来访问表单元素
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // 获取表单值
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    
    console.log('表单数据:', formData);
    
    // 重置表单
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    
    // 聚焦到第一个输入框
    nameRef.current.focus();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">姓名:</label>
        <input id="name" ref={nameRef} type="text" />
      </div>
      <div>
        <label htmlFor="email">邮箱:</label>
        <input id="email" ref={emailRef} type="email" />
      </div>
      <div>
        <label htmlFor="password">密码:</label>
        <input id="password" ref={passwordRef} type="password" />
      </div>
      <button type="submit">提交</button>
    </form>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useRef 与 TypeScript</CardTitle>
            <CardDescription>在 TypeScript 中使用 useRef。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 TypeScript 中使用 <code>useRef</code> 时，可以指定 ref
              对象的类型。这有助于提供更好的类型检查和代码补全。
            </p>
            <CodeBlock language="tsx">{`import { useRef, useEffect } from 'react';

function TypedRefs() {
  // DOM 元素的 ref
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 可变值的 ref
  const countRef = useRef<number>(0);
  const userRef = useRef<{ name: string; age: number } | null>(null);
  
  useEffect(() => {
    // 访问 DOM 元素
    if (divRef.current) {
      divRef.current.style.backgroundColor = 'lightblue';
    }
    
    // 修改可变值
    countRef.current += 1;
    userRef.current = { name: 'John', age: 30 };
  }, []);
  
  return (
    <div ref={divRef}>
      <input ref={inputRef} type="text" />
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">注意事项：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                对于 DOM 元素的 ref，初始值通常是 <code>null</code>
                ，因为在组件挂载前 ref 不会被赋值。
              </li>
              <li>对于可变值的 ref，初始值应该与类型兼容。</li>
              <li>
                使用 <code>useRef&lt;T&gt;(initialValue)</code> 时，
                <code>initialValue</code> 应该是 <code>T</code> 类型或{" "}
                <code>null</code>。
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useRef 的注意事项</CardTitle>
            <CardDescription>使用 useRef 时需要注意的问题。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>不会触发重新渲染</strong>：修改 <code>ref.current</code>{" "}
                不会触发组件重新渲染。如果需要在 UI 中反映变化，应该使用{" "}
                <code>useState</code>。
              </li>
              <li>
                <strong>不要在渲染期间读取或写入 ref</strong>：React
                的渲染应该是纯函数，而修改 ref 是副作用。应该在事件处理函数或
                useEffect 中修改 ref。
              </li>
              <li>
                <strong>避免过度使用</strong>：虽然 useRef
                很方便，但过度使用可能导致代码难以理解和维护。只在必要时使用。
              </li>
              <li>
                <strong>不要用 ref 替代状态</strong>：虽然 ref
                可以存储值，但它不应该替代状态管理。状态变化应该通过 useState 或
                useReducer 管理。
              </li>
              <li>
                <strong>小心闭包陷阱</strong>：在异步代码或回调函数中使用 ref
                时，要注意闭包可能捕获过时的值。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 闭包陷阱示例
function ClosureTrap() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  
  // 更新 ref 以反映最新的 count
  useEffect(() => {
    countRef.current = count;
  }, [count]);
  
  const handleClick = () => {
    // 延迟执行
    setTimeout(() => {
      // 错误：使用闭包中的 count，可能是过时的值
      console.log('Count from closure:', count);
      
      // 正确：使用 ref 获取最新值
      console.log('Count from ref:', countRef.current);
    }, 3000);
    
    // 立即更新 count
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>增加并延迟打印</button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useRef 与其他钩子的结合使用</CardTitle>
            <CardDescription>
              如何将 useRef 与其他 React 钩子结合使用。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`import { useState, useEffect, useRef, useCallback } from 'react';

function CombinedHooks() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  // 使用 ref 存储前一个值
  const prevCountRef = useRef(count);
  
  // 使用 ref 存储 DOM 元素
  const inputRef = useRef(null);
  
  // 使用 useEffect 更新 ref
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  // 使用 useCallback 和 ref 创建记忆化的函数
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // 使用 ref 检测组件是否已挂载
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // 使用 ref 存储异步操作的取消函数
  const cancelRef = useRef(null);
  
  const fetchData = useCallback(() => {
    // 取消之前的请求
    if (cancelRef.current) {
      cancelRef.current();
    }
    
    let isCancelled = false;
    cancelRef.current = () => {
      isCancelled = true;
    };
    
    // 模拟异步操作
    setTimeout(() => {
      if (!isCancelled && isMountedRef.current) {
        console.log('数据获取完成');
      }
    }, 2000);
  }, []);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <p>前一个计数: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={focusInput}>聚焦输入框</button>
      
      <button onClick={fetchData}>获取数据</button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>使用 useRef 的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>明确 ref 的用途</strong>：使用有意义的名称，如{" "}
                <code>inputRef</code>、<code>timerRef</code> 等，清楚地表明 ref
                的用途。
              </li>
              <li>
                <strong>使用 TypeScript</strong>：为 ref
                指定明确的类型，提高代码的类型安全性。
              </li>
              <li>
                <strong>在 useEffect 中更新 ref</strong>：如果 ref
                需要跟踪某个状态，在 useEffect 中更新它。
              </li>
              <li>
                <strong>使用自定义钩子封装 ref 逻辑</strong>：对于复杂的 ref
                用例，考虑创建自定义钩子。
              </li>
              <li>
                <strong>谨慎操作 DOM</strong>：虽然 ref 允许直接操作
                DOM，但应该谨慎使用，避免与 React 的声明式模型冲突。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 自定义钩子示例
import { useRef, useEffect } from 'react';

// 自定义钩子：跟踪前一个值
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// 自定义钩子：管理定时器
function useInterval(callback, delay) {
  const callbackRef = useRef(callback);
  
  // 更新回调函数
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (delay !== null) {
      const intervalId = setInterval(() => {
        callbackRef.current();
      }, delay);
      
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

// 使用自定义钩子
function MyComponent({ value }) {
  const [count, setCount] = useState(0);
  const prevValue = usePrevious(value);
  
  useInterval(() => {
    setCount(count + 1);
  }, 1000);
  
  return (
    <div>
      <p>当前值: {value}</p>
      <p>前一个值: {prevValue}</p>
      <p>计数: {count}</p>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
