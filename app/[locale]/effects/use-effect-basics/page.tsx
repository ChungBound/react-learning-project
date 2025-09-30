"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { UseEffectExample } from "@/components/interactive-examples/use-effect-example"
import { TimerExample } from "@/components/interactive-examples/timer-example"

export default function UseEffectBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useEffect 基础</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 useEffect?</CardTitle>
            <CardDescription>useEffect 是 React 的一个内置钩子，用于在函数组件中执行副作用操作。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 React 中，副作用是指那些与渲染无关的操作，比如数据获取、订阅、手动操作 DOM 等。useEffect
              让你可以在函数组件中执行这些操作，实现类似于 class 组件中的生命周期方法的功能。
            </p>
            <p className="mb-4">
              useEffect
              接收两个参数：一个副作用函数和一个依赖数组（可选）。副作用函数会在每次渲染后执行，而依赖数组可以控制何时重新执行这个函数。
            </p>
            <CodeBlock language="tsx">{`import { useEffect } from 'react';

// 基本语法
useEffect(() => {
  // 在这里执行副作用操作
  console.log('组件渲染完成');
  
  // 可选的清理函数
  return () => {
    console.log('组件即将重新渲染或卸载');
    // 清理副作用
  };
}, [/* 依赖数组 */]);`}</CodeBlock>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
              <UseEffectExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 useEffect 的场景</CardTitle>
            <CardDescription>useEffect 适用于各种需要处理副作用的场景。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">以下是一些使用 useEffect 的常见场景：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>数据获取</li>
              <li>订阅外部数据源</li>
              <li>手动操作 DOM</li>
              <li>计时器和动画</li>
              <li>同步两个不同的状态</li>
            </ul>

            <Tabs defaultValue="fetching">
              <TabsList className="mb-4">
                <TabsTrigger value="fetching">数据获取</TabsTrigger>
                <TabsTrigger value="dom">DOM 操作</TabsTrigger>
                <TabsTrigger value="timer">计时器</TabsTrigger>
              </TabsList>
              <TabsContent value="fetching">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 重置状态
    setUser(null);
    setLoading(true);
    setError(null);
    
    // 获取用户数据
    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(response => {
        if (!response.ok) {
          throw new Error('获取用户数据失败');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // 仅在 userId 变化时重新获取

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>邮箱: {user.email}</p>
      <p>电话: {user.phone}</p>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="dom">
                <CodeBlock language="tsx">{`import { useEffect, useRef } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 组件挂载后自动聚焦到输入框
    inputRef.current.focus();
  }, []); // 空依赖数组意味着只在挂载时执行一次

  return (
    <div>
      <label htmlFor="name">姓名:</label>
      <input
        ref={inputRef}
        id="name"
        type="text"
        placeholder="请输入姓名"
      />
    </div>
  );
}

function ResizeObserver() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // 处理窗口大小变化
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 添加事件监听器
    window.addEventListener('resize', handleResize);

    // 清理函数：移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组表示只在挂载和卸载时执行

  return (
    <div>
      <p>窗口尺寸: {dimensions.width} x {dimensions.height}</p>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="timer">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = null;

    // 只有当 isRunning 为 true 时才启动计时器
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    // 清理函数：停止计时器
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // 依赖于 isRunning，当它变化时重新执行

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>计时器: {seconds} 秒</h1>
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
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useEffect 执行时机</CardTitle>
            <CardDescription>了解 useEffect 在 React 组件生命周期中的执行时机。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">useEffect 的执行时机取决于传递给它的依赖数组：</p>
            <Tabs defaultValue="everytime">
              <TabsList className="mb-4">
                <TabsTrigger value="everytime">每次渲染后</TabsTrigger>
                <TabsTrigger value="onmount">仅在挂载时</TabsTrigger>
                <TabsTrigger value="conditional">条件执行</TabsTrigger>
              </TabsList>
              <TabsContent value="everytime">
                <CodeBlock language="tsx">{`useEffect(() => {
  console.log('组件渲染了');
}); // 没有依赖数组，每次渲染后都会执行

function ExampleComponent() {
  const [count, setCount] = useState(0);
  
  // 每次渲染后都会执行
  useEffect(() => {
    console.log(\`组件渲染了，当前计数: \${count}\`);
  });
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}`}</CodeBlock>
                <p className="mt-4 text-muted-foreground">
                  不传递依赖数组会导致 effect 在每次渲染后执行。这在某些情况下可能会导致性能问题，因此应谨慎使用。
                </p>
              </TabsContent>
              <TabsContent value="onmount">
                <CodeBlock language="tsx">{`useEffect(() => {
  console.log('组件挂载了');
  
  return () => {
    console.log('组件卸载了');
  };
}, []); // 空依赖数组，仅在挂载时执行，清理函数在卸载时执行

function OnMountExample() {
  useEffect(() => {
    console.log('组件挂载了');
    
    // 在此可以执行一次性的设置，如初始化外部库
    const thirdPartyLib = initializeThirdPartyLib();
    
    // 清理函数在组件卸载时执行
    return () => {
      console.log('组件卸载了');
      thirdPartyLib.cleanup();
    };
  }, []);
  
  return <div>这个组件会在挂载时记录日志</div>;
}`}</CodeBlock>
                <p className="mt-4 text-muted-foreground">
                  空依赖数组 <code>[]</code> 意味着 effect
                  仅在组件挂载时执行一次，并且清理函数在组件卸载时执行一次。这类似于 class 组件中的{" "}
                  <code>componentDidMount</code> 和 <code>componentWillUnmount</code> 方法。
                </p>
              </TabsContent>
              <TabsContent value="conditional">
                <CodeBlock language="tsx">{`useEffect(() => {
  console.log('id 变化了');
}, [id]); // 依赖于 id，当 id 变化时执行

function UserDetails({ userId, showDetails }) {
  const [user, setUser] = useState(null);
  
  // 仅在 userId 变化时获取用户数据
  useEffect(() => {
    console.log(\`获取用户 ID: \${userId} 的数据\`);
    
    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userId]); // 依赖于 userId
  
  // 仅在 showDetails 变化时执行
  useEffect(() => {
    console.log(\`显示详情: \${showDetails}\`);
  }, [showDetails]);
  
  // 依赖于 userId 和 showDetails
  useEffect(() => {
    console.log(\`用户 ID: \${userId}, 显示详情: \${showDetails}\`);
  }, [userId, showDetails]);
  
  if (!user) return <div>加载中...</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      {showDetails && (
        <div>
          <p>邮箱: {user.email}</p>
          <p>电话: {user.phone}</p>
        </div>
      )}
    </div>
  );
}`}</CodeBlock>
                <p className="mt-4 text-muted-foreground">
                  依赖数组包含特定变量，表示只有当这些变量变化时，effect 才会重新执行。这允许我们精确控制 effect
                  的执行时机，避免不必要的操作。
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useEffect 与异步操作</CardTitle>
            <CardDescription>在 useEffect 中正确处理异步操作。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              useEffect 回调本身不能是异步函数（即不能直接使用 async/await），但可以在其中定义并调用异步函数。
            </p>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 错误方式：useEffect 直接使用 async 函数
    // 这会导致警告，因为 async 函数返回 Promise
    // async () => { /* ... */ } ❌
    
    // 正确方式：在 useEffect 内部定义异步函数
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('网络响应不正常');
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    
    // 可选：清理函数用于处理竞态条件
    return () => {
      // 在这里可以取消请求（如果使用了支持取消的 API）
      console.log('组件重新渲染或卸载，请求可能被取消');
    };
  }, []); // 仅在挂载时获取数据

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h1>文章列表</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4 text-muted-foreground">
              处理异步操作时，需要注意状态管理和清理工作，特别是处理组件可能在请求完成前卸载的情况。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>处理竞态条件</CardTitle>
            <CardDescription>在 useEffect 中处理异步操作时，防止竞态条件。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              当组件重新渲染或状态依赖变化导致多个异步操作同时进行时，可能会出现竞态条件——较旧的异步操作可能会覆盖较新的操作结果。以下是防止这种情况的模式：
            </p>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 如果查询为空，不执行搜索
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let isMounted = true; // 跟踪组件是否仍然挂载
    setLoading(true);

    const fetchResults = async () => {
      try {
        // 模拟 API 调用，不同查询的响应时间可能不同
        const response = await fetch(\`https://api.example.com/search?q=\${query}\`);
        const data = await response.json();
        
        // 仅在组件仍然挂载且这是最新的请求时更新状态
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

    // 清理函数：组件卸载或 query 变化时调用
    return () => {
      console.log(\`清理查询: \${query}\`);
      isMounted = false; // 标记组件为已卸载
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
              在这个例子中，我们使用 <code>isMounted</code> 变量来跟踪组件的挂载状态。当组件卸载或依赖变化时，清理函数将{" "}
              <code>isMounted</code> 设置为 false，这样较旧的异步操作就不会更新状态。
            </p>
            <p className="mt-4 text-muted-foreground">
              注意：React 18
              中的自动批处理和并发特性可能会影响异步操作的处理方式。在复杂情况下，考虑使用更专业的数据获取库，如 React
              Query 或 SWR。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useEffect vs useLayoutEffect</CardTitle>
            <CardDescription>了解 useEffect 和 useLayoutEffect 的区别。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              React 提供了两种 effect 钩子：<code>useEffect</code> 和 <code>useLayoutEffect</code>
              。它们的主要区别在于执行时机：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                <code>useEffect</code> 在浏览器绘制完成后异步执行
              </li>
              <li>
                <code>useLayoutEffect</code> 在浏览器绘制前同步执行
              </li>
            </ul>
            <CodeBlock language="tsx">{`import { useState, useEffect, useLayoutEffect } from 'react';

function ComparisonExample() {
  const [color, setColor] = useState('red');
  
  // 在浏览器绘制后异步执行
  useEffect(() => {
    console.log('useEffect 执行');
    // 这可能导致闪烁，因为先显示红色，然后变成蓝色
    if (color === 'red') {
      setColor('blue');
    }
  }, [color]);
  
  // 在浏览器绘制前同步执行
  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect 执行');
  //   // 不会闪烁，因为在绘制前就已经修改了颜色
  //   if (color === 'red') {
  //     setColor('blue');
  //   }
  // }, [color]);
  
  console.log('渲染', color);
  
  return (
    <div style={{ color }}>
      <p>当前颜色: {color}</p>
      <button onClick={() => setColor('red')}>
        改变颜色
      </button>
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">
              一般情况下，应该使用 <code>useEffect</code>，因为它不会阻塞浏览器绘制，更有利于应用性能。只有在需要在 DOM
              变更后立即读取布局信息（如元素尺寸、位置）或防止闪烁时，才使用 <code>useLayoutEffect</code>。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>常见问题与最佳实践</CardTitle>
            <CardDescription>使用 useEffect 时的常见问题和最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>依赖数组问题</strong>：确保包含 effect
                中使用的所有外部变量（状态、props、上下文等）。遗漏依赖可能导致旧数据的问题。
              </li>
              <li>
                <strong>无限循环</strong>：如果 effect 更新了它所依赖的状态，可能会导致无限渲染循环。确保 effect
                中的状态更新不会导致再次触发相同的 effect。
              </li>
              <li>
                <strong>多次订阅</strong>：对于订阅类型的 effect，确保在清理函数中正确取消订阅，避免内存泄漏和重复订阅。
              </li>
              <li>
                <strong>分离 effect</strong>：每个 effect 应该只做一件事。如果一个组件需要多个不相关的副作用，使用多个
                useEffect 调用更好。
              </li>
            </ul>

            <CodeBlock language="tsx" className="mt-4">{`// 问题：依赖数组遗漏变量
function BadExample({ id }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData(id).then(setData);
  }, []); // ❌ 遗漏了 id 依赖
  
  // ...
}

// 解决方案：包含所有依赖
function GoodExample({ id }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData(id).then(setData);
  }, [id]); // ✅ 正确包含 id 依赖
  
  // ...
}

// 问题：无限循环
function InfiniteLoopExample() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // 每次渲染都会增加 count，导致无限循环
    setCount(count + 1); // ❌ 导致无限循环
  }, [count]);
  
  // ...
}

// 解决方案：使用函数式更新或移除依赖
function FixedExample() {
  const [count, setCount] = useState(0);
  
  // 方法 1：仅在挂载时执行一次
  useEffect(() => {
    setCount(prevCount => prevCount + 1); // ✅ 只执行一次
  }, []);
  
  // 方法 2：使用 useRef 跟踪是否已经执行
  const hasRunRef = useRef(false);
  useEffect(() => {
    if (!hasRunRef.current) {
      setCount(count + 1);
      hasRunRef.current = true;
    }
  }, [count]);
  
  // ...
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
