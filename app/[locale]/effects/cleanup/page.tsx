"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

// 示例组件：计时器
function TimerExample() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isRunning) {
      // 设置定时器
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)

      console.log("定时器已启动")
    }

    // 清理函数
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
        console.log("定时器已清理")
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">计时器示例</h3>
        <p className="text-sm text-muted-foreground mb-2">查看控制台以了解清理函数的执行</p>
        <p className="text-2xl font-bold mb-4">{seconds} 秒</p>
        <div className="flex justify-center gap-2">
          <Button onClick={handleStartStop}>{isRunning ? "暂停" : "开始"}</Button>
          <Button variant="outline" onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>
    </Card>
  )
}

// 示例组件：事件监听器
function EventListenerExample() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    if (!isTracking) return

    // 鼠标移动事件处理函数
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // 添加事件监听器
    window.addEventListener("mousemove", handleMouseMove)
    console.log("添加了鼠标移动事件监听器")

    // 清理函数：移除事件监听器
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      console.log("移除了鼠标移动事件监听器")
    }
  }, [isTracking])

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">事件监听器示例</h3>
        <p className="text-sm text-muted-foreground mb-2">查看控制台以了解清理函数的执行</p>
        <Button onClick={() => setIsTracking(!isTracking)} className="mb-4">
          {isTracking ? "停止跟踪" : "开始跟踪"}
        </Button>
        {isTracking ? (
          <p>
            鼠标位置: X: {mousePosition.x}, Y: {mousePosition.y}
          </p>
        ) : (
          <p>点击按钮开始跟踪鼠标位置</p>
        )}
      </div>
    </Card>
  )
}

// 示例组件：组件挂载/卸载
function MountUnmountExample() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">组件挂载/卸载示例</h3>
        <p className="text-sm text-muted-foreground mb-2">查看控制台以了解清理函数的执行</p>
        <Button onClick={() => setIsVisible(!isVisible)} className="mb-4">
          {isVisible ? "卸载子组件" : "挂载子组件"}
        </Button>
        {isVisible && <ChildComponent />}
      </div>
    </Card>
  )
}

// 子组件
function ChildComponent() {
  useEffect(() => {
    console.log("子组件已挂载")

    // 模拟资源分配
    const resource = { id: Date.now(), name: "示例资源" }
    console.log(`分配资源: ${JSON.stringify(resource)}`)

    // 清理函数
    return () => {
      console.log("子组件将卸载")
      console.log(`释放资源: ${JSON.stringify(resource)}`)
    }
  }, [])

  return <div className="p-4 border rounded-md">我是子组件</div>
}

export default function CleanupPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">清理副作用</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是副作用清理？</CardTitle>
            <CardDescription>了解为什么以及如何清理 React 组件中的副作用。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 React 中，副作用清理是指在组件卸载或依赖项变化导致 effect 重新执行前，清理之前 effect
              创建的资源或订阅。这对于防止内存泄漏和意外行为至关重要。
            </p>
            <p className="mb-4">
              清理函数是通过在 <code>useEffect</code> 中返回一个函数来实现的。这个返回的函数会在以下情况下执行：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>组件卸载时</li>
              <li>依赖项变化导致 effect 重新执行前（清理旧的 effect）</li>
            </ul>
            <CodeBlock language="tsx">{`useEffect(() => {
  // 副作用代码
  console.log('Effect 执行');
  
  // 返回清理函数
  return () => {
    console.log('Effect 清理');
    // 清理代码
  };
}, [dependency]);`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>需要清理的常见副作用</CardTitle>
            <CardDescription>了解哪些副作用需要清理。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">以下是一些常见的需要清理的副作用：</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">定时器和间隔器</h3>
                <CodeBlock language="tsx">{`useEffect(() => {
  const timerId = setTimeout(() => {
    // 定时器代码
  }, 1000);
  
  // 清理函数
  return () => {
    clearTimeout(timerId);
  };
}, []);

useEffect(() => {
  const intervalId = setInterval(() => {
    // 间隔器代码
  }, 1000);
  
  // 清理函数
  return () => {
    clearInterval(intervalId);
  };
}, []);`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">事件监听器</h3>
                <CodeBlock language="tsx">{`useEffect(() => {
  const handleResize = () => {
    // 处理窗口大小变化
  };
  
  // 添加事件监听器
  window.addEventListener('resize', handleResize);
  
  // 清理函数：移除事件监听器
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">订阅</h3>
                <CodeBlock language="tsx">{`useEffect(() => {
  // 创建订阅
  const subscription = someObservable.subscribe(
    value => {
      // 处理新值
    }
  );
  
  // 清理函数：取消订阅
  return () => {
    subscription.unsubscribe();
  };
}, [someObservable]);`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">WebSocket 连接</h3>
                <CodeBlock language="tsx">{`useEffect(() => {
  // 创建 WebSocket 连接
  const socket = new WebSocket('wss://example.com');
  
  socket.onmessage = (event) => {
    // 处理消息
  };
  
  // 清理函数：关闭连接
  return () => {
    socket.close();
  };
}, []);`}</CodeBlock>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>清理函数的执行时机</CardTitle>
            <CardDescription>了解清理函数何时执行。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">清理函数在以下两种情况下执行：</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">组件卸载时</h3>
                <p>
                  当组件从 DOM 中移除时，React 会执行清理函数。这类似于 class 组件中的 <code>componentWillUnmount</code>{" "}
                  生命周期方法。
                </p>
                <CodeBlock language="tsx" className="mt-2">{`function Example() {
  useEffect(() => {
    console.log('组件挂载');
    
    return () => {
      console.log('组件卸载');
    };
  }, []);
  
  return <div>Example</div>;
}`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">依赖项变化时</h3>
                <p>
                  当依赖项变化导致 effect 重新执行时，React 会先执行上一次 effect 的清理函数，然后再执行新的 effect。
                </p>
                <CodeBlock language="tsx" className="mt-2">{`function Example({ id }) {
  useEffect(() => {
    console.log(\`获取数据，id: \${id}\`);
    
    return () => {
      console.log(\`清理旧数据，id: \${id}\`);
    };
  }, [id]); // 当 id 变化时
  
  return <div>Example {id}</div>;
}`}</CodeBlock>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
              <MountUnmountExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实际示例</CardTitle>
            <CardDescription>清理副作用的实际示例。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="timer">
              <TabsList className="mb-4">
                <TabsTrigger value="timer">计时器</TabsTrigger>
                <TabsTrigger value="eventListener">事件监听器</TabsTrigger>
                <TabsTrigger value="fetch">数据获取</TabsTrigger>
              </TabsList>
              <TabsContent value="timer">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let intervalId = null;
    
    if (isRunning) {
      // 设置定时器
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      
      console.log('定时器已启动');
    }
    
    // 清理函数
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log('定时器已清理');
      }
    };
  }, [isRunning]); // 依赖于 isRunning
  
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  
  return (
    <div>
      <h2>{seconds} 秒</h2>
      <button onClick={handleStartStop}>
        {isRunning ? '暂停' : '开始'}
      </button>
      <button onClick={handleReset}>重置</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <TimerExample />
                </div>
              </TabsContent>
              <TabsContent value="eventListener">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);
  
  useEffect(() => {
    if (!isTracking) return;
    
    // 鼠标移动事件处理函数
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    // 添加事件监听器
    window.addEventListener('mousemove', handleMouseMove);
    console.log('添加了鼠标移动事件监听器');
    
    // 清理函数：移除事件监听器
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('移除了鼠标移动事件监听器');
    };
  }, [isTracking]); // 依赖于 isTracking
  
  return (
    <div>
      <button onClick={() => setIsTracking(!isTracking)}>
        {isTracking ? '停止跟踪' : '开始跟踪'}
      </button>
      {isTracking ? (
        <p>鼠标位置: X: {position.x}, Y: {position.y}</p>
      ) : (
        <p>点击按钮开始跟踪鼠标位置</p>
      )}
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <EventListenerExample />
                </div>
              </TabsContent>
              <TabsContent value="fetch">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 用于跟踪组件是否仍然挂载
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        // 只有在组件仍然挂载时才更新状态
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        // 只有在组件仍然挂载时才更新状态
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    // 清理函数：防止在组件卸载后设置状态
    return () => {
      isMounted = false;
      console.log('数据获取已取消');
    };
  }, [url]); // 依赖于 url
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!data) return null;
  
  return (
    <div>
      <h2>数据</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>处理竞态条件</CardTitle>
            <CardDescription>使用清理函数处理异步操作中的竞态条件。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              竞态条件是指当多个异步操作同时进行时，后发起的操作可能先完成，导致旧的操作结果覆盖新的操作结果。清理函数可以帮助处理这种情况。
            </p>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // 跳过空查询
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    let isMounted = true;
    setLoading(true);
    
    const fetchResults = async () => {
      try {
        // 模拟 API 调用，不同查询的响应时间可能不同
        const response = await fetch(\`/api/search?q=\${query}\`);
        const data = await response.json();
        
        // 只有在组件仍然挂载且这是最新的请求时更新状态
        if (isMounted) {
          console.log(\`设置结果，查询: \${query}\`);
          setResults(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('搜索出错:', error);
          setResults([]);
          setLoading(false);
        }
      }
    };
    
    fetchResults();
    
    // 清理函数：防止竞态条件
    return () => {
      console.log(\`取消查询: \${query}\`);
      isMounted = false;
    };
  }, [query]); // 依赖于 query
  
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
              在上面的例子中，当 <code>query</code>{" "}
              变化时，会发起一个新的搜索请求。如果用户快速输入，可能会发起多个请求。通过使用
              <code>isMounted</code> 标志和清理函数，我们确保只有最新请求的结果会被设置到状态中。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>常见错误和最佳实践</CardTitle>
            <CardDescription>使用清理函数时的常见错误和最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">常见错误</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>忘记清理定时器、事件监听器或订阅</li>
                  <li>在清理函数中使用过时的闭包值</li>
                  <li>在组件卸载后设置状态，导致内存泄漏警告</li>
                  <li>忽略竞态条件，导致旧的异步操作结果覆盖新的结果</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">最佳实践</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>始终为创建的资源或订阅提供清理函数</li>
                  <li>
                    使用 <code>isMounted</code> 标志防止在组件卸载后设置状态
                  </li>
                  <li>使用 AbortController 取消进行中的 fetch 请求</li>
                  <li>使用 useRef 存储需要在清理函数中访问的值，避免闭包问题</li>
                  <li>为每个 effect 提供专门的清理逻辑，不要在一个 effect 中处理多个不相关的副作用</li>
                </ul>
              </div>
            </div>

            <CodeBlock language="tsx" className="mt-4">{`// 使用 AbortController 取消 fetch 请求
import { useState, useEffect } from 'react';

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // 创建 AbortController
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        const result = await response.json();
        setData(result);
      } catch (error) {
        // 忽略取消请求的错误
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    };
    
    fetchData();
    
    // 清理函数：取消请求
    return () => {
      controller.abort();
    };
  }, [url]);
  
  return <div>{/* 渲染数据 */}</div>;
}

// 使用 useRef 解决闭包问题
import { useState, useEffect, useRef } from 'react';

function IntervalCounter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  
  // 更新 ref 值
  useEffect(() => {
    countRef.current = count;
  }, [count]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 使用 ref 值而不是闭包中的 count
      console.log('Current count:', countRef.current);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []); // 空依赖数组，只在挂载时执行一次
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
