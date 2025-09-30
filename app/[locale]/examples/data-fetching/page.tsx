"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// 用户类型
interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

// 帖子类型
interface Post {
  id: number
  title: string
  body: string
}

// 使用 fetch 获取数据的示例组件
function FetchExample() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 获取用户数据
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "发生未知错误")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleRefresh = () => {
    setUsers([])
    setLoading(true)
    setError(null)

    // 模拟网络延迟
    setTimeout(async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "发生未知错误")
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>用户列表</CardTitle>
          <CardDescription>使用 fetch API 获取的用户数据</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="border p-3 rounded-md">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm">{user.phone}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 使用自定义 Hook 获取数据的示例组件
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "发生未知错误")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, refreshKey])

  const refresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return { data, loading, error, refresh }
}

function CustomHookExample() {
  const { data: posts, loading, error, refresh } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts")

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>帖子列表</CardTitle>
          <CardDescription>使用自定义 Hook 获取的帖子数据</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={refresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {posts?.slice(0, 5).map((post) => (
              <div key={post.id} className="border p-3 rounded-md">
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm mt-1">{post.body.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DataFetchingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">数据获取与展示</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>数据获取概述</CardTitle>
            <CardDescription>在 React 中获取和展示数据的常见方式。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 React 应用中，从外部 API 获取数据是一个常见需求。React
              本身不提供数据获取功能，但可以使用各种方法来获取和管理数据：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                使用原生 <code>fetch</code> API 或 <code>axios</code> 库
              </li>
              <li>
                结合 <code>useState</code> 和 <code>useEffect</code> 钩子管理数据状态和副作用
              </li>
              <li>创建自定义钩子封装数据获取逻辑</li>
              <li>使用专门的数据获取库，如 React Query、SWR 等</li>
              <li>在 Next.js 中使用服务器组件进行数据获取</li>
            </ul>
            <p>本页面将展示几种常见的数据获取和展示方式，包括处理加载状态、错误处理和数据刷新等功能。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 fetch 和 useEffect</CardTitle>
            <CardDescription>最基本的数据获取方式。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              使用 <code>fetch</code> API 结合 <code>useEffect</code> 和 <code>useState</code> 是最基本的数据获取方式：
            </p>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 获取用户数据
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // 空依赖数组，只在组件挂载时执行一次

  if (error) return <div>错误: {error}</div>;
  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>

            <div className="mt-6">
              <FetchExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>创建自定义数据获取 Hook</CardTitle>
            <CardDescription>封装数据获取逻辑，提高代码复用性。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">为了提高代码复用性，可以创建自定义 Hook 来封装数据获取逻辑：</p>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

// 自定义数据获取 Hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "发生未知错误");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refreshKey]);

  // 提供刷新数据的方法
  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return { data, loading, error, refresh };
}

// 使用自定义 Hook
function PostList() {
  const { data: posts, loading, error, refresh } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (error) return <div>错误: {error}</div>;
  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <h1>帖子列表</h1>
      <button onClick={refresh}>刷新</button>
      <ul>
        {posts?.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>

            <div className="mt-6">
              <CustomHookExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用数据获取库</CardTitle>
            <CardDescription>使用专门的数据获取库简化数据管理。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              对于更复杂的数据获取需求，可以使用专门的数据获取库，如 React Query 或
              SWR。这些库提供了缓存、自动重试、轮询、分页等高级功能。
            </p>

            <Tabs defaultValue="react-query">
              <TabsList className="mb-4">
                <TabsTrigger value="react-query">React Query</TabsTrigger>
                <TabsTrigger value="swr">SWR</TabsTrigger>
              </TabsList>
              <TabsContent value="react-query">
                <CodeBlock language="tsx">{`import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

// 创建 QueryClient 实例
const queryClient = new QueryClient();

// 包装应用
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

// 使用 useQuery 获取数据
function UserList() {
  const { data, isLoading, error, refetch } = useQuery('users', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    return response.json();
  });

  if (error) return <div>错误: {error.message}</div>;
  if (isLoading) return <div>加载中...</div>;

  return (
    <div>
      <h1>用户列表</h1>
      <button onClick={() => refetch()}>刷新</button>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="swr">
                <CodeBlock language="tsx">{`import useSWR from 'swr';

// 创建 fetcher 函数
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error! Status: \${response.status}\`);
  }
  return response.json();
};

// 使用 useSWR 获取数据
function UserList() {
  const { data, error, isValidating, mutate } = useSWR(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  );

  if (error) return <div>错误: {error.message}</div>;
  if (!data) return <div>加载中...</div>;

  return (
    <div>
      <h1>用户列表</h1>
      <button 
        onClick={() => mutate()} 
        disabled={isValidating}
      >
        {isValidating ? '刷新中...' : '刷新'}
      </button>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>处理加载状态</CardTitle>
            <CardDescription>提供良好的用户体验。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在数据加载过程中，显示加载状态是提供良好用户体验的重要部分。有多种方式可以实现加载状态：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>简单的加载指示器（如"加载中..."文本或旋转图标）</li>
              <li>骨架屏（Skeleton）：显示内容的大致轮廓</li>
              <li>进度条：显示加载进度</li>
              <li>内容占位符：使用模拟数据临时填充界面</li>
            </ul>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function UserListWithSkeleton() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>用户列表</h1>
      {loading ? (
        // 骨架屏加载状态
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>错误处理</CardTitle>
            <CardDescription>优雅地处理数据获取错误。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">在数据获取过程中，错误是不可避免的。优雅地处理错误可以提高用户体验：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>显示友好的错误消息</li>
              <li>提供重试选项</li>
              <li>记录错误以便调试</li>
              <li>根据错误类型提供不同的处理方式</li>
            </ul>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

function UserListWithErrorHandling() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('获取用户数据出错:', err);
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>加载中...</div>;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>错误</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <Button onClick={fetchUsers} className="mt-2">重试</Button>
      </Alert>
    );
  }

  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>数据刷新</CardTitle>
            <CardDescription>实现数据刷新功能。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">数据刷新是保持数据最新的重要功能。有多种方式可以实现数据刷新：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>手动刷新：提供刷新按钮</li>
              <li>自动刷新：定时轮询数据</li>
              <li>基于事件的刷新：在特定事件发生时刷新数据</li>
              <li>焦点刷新：当用户重新关注页面时刷新数据</li>
            </ul>
            <CodeBlock language="tsx">{`import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

function UserListWithRefresh() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      const data = await response.json();
      setUsers(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 自动轮询（每60秒刷新一次）
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUsers();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [fetchUsers]);

  // 焦点刷新
  useEffect(() => {
    const handleFocus = () => {
      fetchUsers();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchUsers]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>用户列表</h1>
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUsers} 
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            最后更新: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </div>
      
      {loading ? (
        <div>加载中...</div>
      ) : error ? (
        <div>错误: {error}</div>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next.js 中的数据获取</CardTitle>
            <CardDescription>使用 Next.js 服务器组件进行数据获取。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 Next.js 应用中，可以使用服务器组件直接在服务器上获取数据，这样可以减少客户端的 JavaScript
              体积，提高性能和 SEO。
            </p>
            <CodeBlock language="tsx">{`// app/users/page.tsx
// 这是一个服务器组件，默认在服务器上运行
export default async function UsersPage() {
  // 直接在服务器上获取数据，无需使用 useState 或 useEffect
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    // 可以设置缓存和重新验证策略
    next: { revalidate: 3600 } // 每小时重新验证一次
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const users = await response.json();
  
  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 错误处理组件
// app/users/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>出错了！</h2>
      <p>{error.message}</p>
      <Button onClick={reset}>重试</Button>
    </div>
  );
}

// 加载状态组件
// app/users/loading.tsx
export default function Loading() {
  return <div>加载中...</div>;
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>数据获取和展示的最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>使用适当的数据获取方式</strong>
                ：根据应用的复杂度和需求选择合适的数据获取方式。对于简单应用，使用 fetch + useEffect
                可能足够；对于复杂应用，考虑使用专门的数据获取库。
              </li>
              <li>
                <strong>处理所有状态</strong>：确保处理加载、成功和错误状态，提供良好的用户体验。
              </li>
              <li>
                <strong>实现数据缓存</strong>：避免不必要的网络请求，提高性能和用户体验。
              </li>
              <li>
                <strong>处理竞态条件</strong>：当有多个并发请求时，确保只使用最新请求的结果。
              </li>
              <li>
                <strong>实现错误重试</strong>：在网络错误或服务器错误时提供重试机制。
              </li>
              <li>
                <strong>优化数据获取</strong>：只获取需要的数据，使用分页、过滤等技术减少数据量。
              </li>
              <li>
                <strong>考虑离线支持</strong>：在网络不可用时提供离线功能，使用本地存储缓存数据。
              </li>
              <li>
                <strong>使用类型安全</strong>：使用 TypeScript 定义数据类型，提高代码质量和开发体验。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 处理竞态条件的示例
function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(url, { signal });
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);
  
  return { data, loading, error };
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
