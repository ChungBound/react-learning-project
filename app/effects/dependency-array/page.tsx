"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 示例组件：依赖数组示例
function DependencyArrayExample() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")

  // 无依赖数组：每次渲染后都会执行
  useEffect(() => {
    console.log("无依赖数组：每次渲染后都会执行")
  })

  // 空依赖数组：仅在组件挂载时执行一次
  useEffect(() => {
    console.log("空依赖数组：仅在组件挂载时执行一次")
  }, [])

  // 依赖于 count：仅在 count 变化时执行
  useEffect(() => {
    console.log(`依赖于 count：count 变化为 ${count}`)
    document.title = `计数: ${count}`
  }, [count])

  // 依赖于 name：仅在 name 变化时执行
  useEffect(() => {
    console.log(`依赖于 name：name 变化为 "${name}"`)
  }, [name])

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">依赖数组示例</h3>
        <p className="text-sm text-muted-foreground">打开浏览器控制台查看日志输出</p>

        <div className="space-y-2">
          <p>计数: {count}</p>
          <Button onClick={() => setCount(count + 1)}>增加计数</Button>
        </div>

        <div className="space-y-2">
          <p>名称: {name || "(空)"}</p>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="输入名称..." />
        </div>
      </div>
    </Card>
  )
}

// 示例组件：依赖项遗漏问题
function MissingDependencyExample() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [result, setResult] = useState(0)

  // 错误示例：遗漏依赖项
  useEffect(() => {
    setResult(count * multiplier)
    // 警告：依赖项列表中缺少 'multiplier'
  }, [count]) // 应该是 [count, multiplier]

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">依赖项遗漏示例</h3>
        <p className="text-sm text-muted-foreground">
          注意：此示例故意遗漏了依赖项，以展示问题。在实际代码中应避免这种情况。
        </p>

        <div className="space-y-2">
          <p>计数: {count}</p>
          <Button onClick={() => setCount(count + 1)} className="mr-2">
            增加计数
          </Button>
        </div>

        <div className="space-y-2">
          <p>乘数: {multiplier}</p>
          <Button onClick={() => setMultiplier(multiplier + 1)}>增加乘数</Button>
        </div>

        <div className="p-2 bg-muted rounded-md">
          <p>
            结果 (count × multiplier): <strong>{result}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            注意：当只改变乘数时，结果不会更新，因为 effect 只依赖于 count。
          </p>
        </div>
      </div>
    </Card>
  )
}

export default function DependencyArrayPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">依赖数组</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是依赖数组？</CardTitle>
            <CardDescription>依赖数组是 useEffect 的第二个参数，用于控制 effect 的执行时机。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              依赖数组是传递给 <code>useEffect</code>、<code>useMemo</code>、<code>useCallback</code>{" "}
              等钩子的第二个参数。它是一个数组，包含 effect 函数中使用的所有外部变量（如 props、state 等）。React
              会使用这个数组来决定何时重新执行 effect。
            </p>
            <CodeBlock language="tsx">{`useEffect(() => {
  // 这是 effect 函数
  console.log(\`计数: \${count}\`);
  document.title = \`计数: \${count}\`;
}, [count]); // 这是依赖数组`}</CodeBlock>
            <p className="mt-4">
              在上面的例子中，<code>[count]</code> 是依赖数组，它告诉 React 只有当 <code>count</code> 变化时才重新执行
              effect。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>依赖数组的三种形式</CardTitle>
            <CardDescription>了解依赖数组的不同形式及其行为。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">依赖数组有三种形式，每种形式都有不同的行为：</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">无依赖数组</h3>
                <CodeBlock language="tsx">{`useEffect(() => {
  // 每次渲染后都会执行
});`}</CodeBlock>
                <p className="mt-2 text-sm text-muted-foreground">
                  不提供依赖数组时，effect 会在每次渲染后执行。这类似于 class 组件中的 componentDidUpdate。
                </p>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">空依赖数组</h3>
                <CodeBlock language="tsx">{`useEffect(() => {
  // 仅在组件挂载时执行一次
  // 清理函数在组件卸载时执行
  return () => {
    // 清理代码
  };
}, []);`}</CodeBlock>
                <p className="mt-2 text-sm text-muted-foreground">
                  提供空数组时，effect 仅在组件挂载时执行一次，清理函数在组件卸载时执行。这类似于 class 组件中的
                  componentDidMount 和 componentWillUnmount。
                </p>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">有依赖的数组</h3>
                <CodeBlock language="tsx">{`useEffect(() => {
  // 在组件挂载时
  // 以及依赖项变化时执行
}, [dep1, dep2]);`}</CodeBlock>
                <p className="mt-2 text-sm text-muted-foreground">
                  提供包含依赖项的数组时，effect 会在组件挂载时以及任何依赖项变化时执行。
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
              <DependencyArrayExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>依赖项的正确使用</CardTitle>
            <CardDescription>如何正确指定依赖项，避免常见错误。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              依赖数组应该包含 effect 中使用的所有外部变量（props、state、context 等）。遗漏依赖项可能导致
              bug，如使用过时的值。
            </p>
            <CodeBlock language="tsx">{`// 正确示例：包含所有依赖项
function Example({ id }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData(id).then(result => setData(result));
  }, [id]); // 正确：包含了 effect 中使用的外部变量 id
  
  // ...
}`}</CodeBlock>
            <p className="mt-4">React 的 ESLint 规则（eslint-plugin-react-hooks）可以帮助检测遗漏的依赖项。</p>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">依赖项遗漏示例：</h4>
              <MissingDependencyExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>处理依赖项变化频繁的情况</CardTitle>
            <CardDescription>如何处理依赖项频繁变化导致的问题。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">有时，依赖项可能变化非常频繁，导致 effect 执行过多次。以下是一些处理这种情况的策略：</p>
            <Tabs defaultValue="useCallback">
              <TabsList className="mb-4">
                <TabsTrigger value="useCallback">使用 useCallback</TabsTrigger>
                <TabsTrigger value="useMemo">使用 useMemo</TabsTrigger>
                <TabsTrigger value="useRef">使用 useRef</TabsTrigger>
              </TabsList>
              <TabsContent value="useCallback">
                <CodeBlock language="tsx">{`import { useState, useEffect, useCallback } from 'react';

function SearchComponent({ query }) {
  const [results, setResults] = useState([]);
  
  // 使用 useCallback 记忆化函数
  const fetchResults = useCallback(async () => {
    const response = await fetch(\`/api/search?q=\${query}\`);
    const data = await response.json();
    setResults(data);
  }, [query]); // 只有 query 变化时才会创建新函数
  
  useEffect(() => {
    fetchResults();
  }, [fetchResults]); // 依赖于记忆化的函数
  
  // ...
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="useMemo">
                <CodeBlock language="tsx">{`import { useState, useEffect, useMemo } from 'react';

function DataProcessor({ data, filter }) {
  const [processedData, setProcessedData] = useState([]);
  
  // 使用 useMemo 记忆化计算结果
  const filteredData = useMemo(() => {
    return data.filter(item => item.includes(filter));
  }, [data, filter]); // 只有 data 或 filter 变化时才重新计算
  
  useEffect(() => {
    // 进一步处理过滤后的数据
    const result = filteredData.map(item => ({ id: item, value: item.length }));
    setProcessedData(result);
  }, [filteredData]); // 依赖于记忆化的数据
  
  // ...
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="useRef">
                <CodeBlock language="tsx">{`import { useState, useEffect, useRef } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  
  // 使用 useRef 存储不需要触发重新渲染的值
  const timerRef = useRef(null);
  
  useEffect(() => {
    // 清除之前的定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // 设置新的定时器
    timerRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // 清理函数
    return () => {
      clearInterval(timerRef.current);
    };
  }, []); // 空依赖数组，只在挂载时执行一次
  
  // ...
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>依赖循环问题</CardTitle>
            <CardDescription>如何处理依赖循环导致的无限重渲染。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              依赖循环是指 effect 更新了它所依赖的状态，导致 effect 再次执行，形成无限循环。以下是一些解决方法：
            </p>
            <Tabs defaultValue="functional">
              <TabsList className="mb-4">
                <TabsTrigger value="functional">使用函数式更新</TabsTrigger>
                <TabsTrigger value="ref">使用 useRef</TabsTrigger>
                <TabsTrigger value="reducer">使用 useReducer</TabsTrigger>
              </TabsList>
              <TabsContent value="functional">
                <CodeBlock language="tsx">{`// 问题：无限循环
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // 这会导致无限循环，因为每次 effect 执行都会更新 count
    // 然后 count 变化又会触发 effect 执行
    setCount(count + 1);
  }, [count]);
  
  // ...
}

// 解决方案：使用函数式更新
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // 使用函数式更新，不依赖于当前的 count 值
    setCount(prevCount => prevCount + 1);
  }, []); // 空依赖数组，只在挂载时执行一次
  
  // ...
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="ref">
                <CodeBlock language="tsx">{`// 使用 useRef 跟踪值，避免依赖循环
function AutoSave({ document }) {
  const [isSaving, setIsSaving] = useState(false);
  const documentRef = useRef(document);
  
  // 更新 ref 值，但不触发重新渲染
  useEffect(() => {
    documentRef.current = document;
  }, [document]);
  
  // 自动保存逻辑
  useEffect(() => {
    const saveDocument = async () => {
      setIsSaving(true);
      await saveToServer(documentRef.current);
      setIsSaving(false);
    };
    
    const intervalId = setInterval(saveDocument, 5000);
    
    return () => clearInterval(intervalId);
  }, []); // 空依赖数组，避免依赖 isSaving 导致的循环
  
  // ...
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="reducer">
                <CodeBlock language="tsx">{`// 使用 useReducer 集中管理相关状态，避免依赖循环
import { useReducer, useEffect } from 'react';

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function DataFetcher({ url }) {
  // 使用 useReducer 管理相关状态
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    loading: false,
    error: null
  });
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url]); // 只依赖于 url，避免依赖于 state 中的值
  
  // ...
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>常见陷阱和最佳实践</CardTitle>
            <CardDescription>使用依赖数组时的常见问题和最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">常见陷阱</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>遗漏依赖项，导致使用过时的值</li>
                  <li>过度依赖，导致不必要的 effect 执行</li>
                  <li>依赖循环，导致无限重渲染</li>
                  <li>依赖对象或数组，但没有正确处理引用相等性</li>
                  <li>在依赖数组中使用不稳定的值（如内联函数或对象）</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">最佳实践</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>包含 effect 中使用的所有外部变量作为依赖项</li>
                  <li>使用 ESLint 规则（eslint-plugin-react-hooks）检测依赖项问题</li>
                  <li>使用 useCallback 和 useMemo 记忆化函数和值，减少不必要的 effect 执行</li>
                  <li>
                    使用函数式更新（如 <code>setCount(c =&gt; c + 1)</code>）避免依赖某些状态
                  </li>
                  <li>使用 useRef 存储不需要触发重新渲染的值</li>
                  <li>考虑使用 useReducer 管理相关状态，减少依赖项</li>
                  <li>将复杂的 effect 逻辑拆分为多个较小的 effect，每个 effect 只关注一个方面</li>
                </ul>
              </div>
            </div>

            <CodeBlock language="tsx" className="mt-4">{`// 最佳实践示例
import { useState, useEffect, useCallback, useMemo } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 使用 useCallback 记忆化函数
  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }
  }, [userId]); // 只依赖于 userId
  
  // 获取用户数据
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // 依赖于记忆化的函数
  
  // 获取用户帖子（仅在有用户数据后）
  useEffect(() => {
    if (!user) return;
    
    const fetchPosts = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}/posts\`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts');
      }
    };
    
    fetchPosts();
  }, [userId, user]); // 依赖于 userId 和 user
  
  // 使用 useMemo 记忆化计算结果
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts]); // 只在 posts 变化时重新计算
  
  // ...
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
