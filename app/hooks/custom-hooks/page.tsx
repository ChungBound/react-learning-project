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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { useWindowSize } from "@/hooks/useWindowSize";

// 示例组件：使用 useLocalStorage
function LocalStorageExample() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div className="space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入你的名字"
      />
      <p>你的名字是: {name}</p>
    </div>
  );
}

// 示例组件：使用 useWindowSize
function WindowSizeExample() {
  const [mounted, setMounted] = useState(false);
  const { width, height } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const isTablet = width ? width >= 768 && width < 1024 : false;
  const isDesktop = width ? width >= 1024 : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <p>窗口宽度: {width}px</p>
      <p>窗口高度: {height}px</p>
      {width && (
        <div className="mt-2">
          {isMobile && (
            <p className="text-sm text-muted-foreground">当前是移动设备视图</p>
          )}
          {isTablet && (
            <p className="text-sm text-muted-foreground">当前是平板设备视图</p>
          )}
          {isDesktop && (
            <p className="text-sm text-muted-foreground">当前是桌面设备视图</p>
          )}
        </div>
      )}
    </div>
  );
}

// 自定义钩子：useFetch
function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 用于处理组件卸载后的情况
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          ...options,
          signal,
        });

        if (!response.ok) {
          throw new Error("HTTP error! Status: " + response.status);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (error) {
        if (
          isMounted &&
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          setError(error);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 清理函数
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, options]);

  return { data, loading, error };
}

export default function CustomHooksPage() {
  // useLocalStorage 示例 - 主题设置
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [userPreferences, setUserPreferences] = useLocalStorage(
    "userPreferences",
    {
      fontSize: 16,
      notifications: true,
      language: "zh-CN",
    }
  );

  // useDebounce 示例 - 搜索和计数器
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCount = useDebounce(count, 1000);

  // useWindowSize 示例
  const { width, height } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const isTablet = width ? width >= 768 && width < 1024 : false;
  const isDesktop = width ? width >= 1024 : false;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">自定义 Hooks</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是自定义 Hooks？</CardTitle>
            <CardDescription>
              自定义 Hooks 是一种复用状态逻辑的方式。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              自定义 Hooks 是一种在 React
              组件之间复用状态逻辑的方式，而不需要更改组件结构。它们是以 "use"
              开头的函数，可以调用其他 Hooks，并且可以在多个组件中重复使用。
            </p>
            <p className="mb-4">自定义 Hooks 的主要优点：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>提取重复逻辑到可复用的函数中</li>
              <li>将复杂组件分解为更小的函数</li>
              <li>使用命名约定（以 "use" 开头）使代码更具可读性</li>
              <li>使组件逻辑更加清晰和可测试</li>
            </ul>
            <CodeBlock language="tsx">{`// 自定义 Hook 的基本结构
function useCustomHook(initialValue) {
  // 可以使用 React 内置的 Hooks
  const [state, setState] = useState(initialValue);
  
  // 可以包含自定义逻辑
  useEffect(() => {
    // 副作用代码
  }, []);
  
  // 可以定义自定义函数
  const customFunction = () => {
    // 函数逻辑
  };
  
  // 返回需要在组件中使用的值
  return { state, customFunction };
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>创建自定义 Hooks</CardTitle>
            <CardDescription>如何创建和使用自定义 Hooks。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">创建自定义 Hook 的步骤：</p>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>创建一个以 "use" 开头的函数</li>
              <li>在函数内部使用 React 内置的 Hooks</li>
              <li>定义自定义逻辑</li>
              <li>返回组件需要的值</li>
            </ol>
            <p className="mb-4">
              自定义 Hook 可以接受任意参数，并且可以返回任何值。它们遵循与内置
              Hooks 相同的规则，如只能在函数组件或其他 Hooks 中调用。
            </p>
            <CodeBlock language="tsx">{`// 示例：创建一个管理表单字段的自定义 Hook
function useFormField(initialValue = '') {
  // 使用 useState 管理字段值
  const [value, setValue] = useState(initialValue);
  
  // 使用 useState 管理错误信息
  const [error, setError] = useState('');
  
  // 处理字段变化的函数
  const handleChange = (e) => {
    setValue(e.target.value);
    // 清除错误
    if (error) setError('');
  };
  
  // 验证字段的函数
  const validate = (required = false) => {
    if (required && !value) {
      setError('此字段是必填的');
      return false;
    }
    return true;
  };
  
  // 重置字段的函数
  const reset = () => {
    setValue(initialValue);
    setError('');
  };
  
  // 返回组件需要的值和函数
  return {
    value,
    error,
    handleChange,
    validate,
    reset
  };
}

// 在组件中使用
function LoginForm() {
  const username = useFormField('');
  const password = useFormField('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 验证字段
    const isUsernameValid = username.validate(true);
    const isPasswordValid = password.validate(true);
    
    if (isUsernameValid && isPasswordValid) {
      // 提交表单
      console.log('表单提交', { username: username.value, password: password.value });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名:</label>
        <input
          type="text"
          value={username.value}
          onChange={username.handleChange}
        />
        {username.error && <p>{username.error}</p>}
      </div>
      
      <div>
        <label>密码:</label>
        <input
          type="password"
          value={password.value}
          onChange={password.handleChange}
        />
        {password.error && <p>{password.error}</p>}
      </div>
      
      <button type="submit">登录</button>
      <button type="button" onClick={() => {
        username.reset();
        password.reset();
      }}>重置</button>
    </form>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>常用的自定义 Hooks</CardTitle>
            <CardDescription>
              一些常见且有用的自定义 Hooks 示例。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="localStorage">
              <TabsList className="mb-4">
                <TabsTrigger value="localStorage">useLocalStorage</TabsTrigger>
                <TabsTrigger value="windowSize">useWindowSize</TabsTrigger>
                <TabsTrigger value="fetch">useFetch</TabsTrigger>
              </TabsList>
              <TabsContent value="localStorage">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

// 自定义 Hook：在 localStorage 中持久化状态
function useLocalStorage<T>(key: string, initialValue: T) {
  // 状态用于存储值
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // 从 localStorage 获取值
      const item = window.localStorage.getItem(key);
      // 如果值存在则解析，否则返回初始值
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 更新 localStorage 的函数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许值是一个函数，类似于 useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 保存到状态
      setStoredValue(valueToStore);
      // 保存到 localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// 使用示例
function ProfileForm() {
  const [name, setName] = useLocalStorage<string>('name', '');
  const [age, setAge] = useLocalStorage<number>('age', 0);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="姓名"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="年龄"
      />
      <div>
        <p>姓名: {name}</p>
        <p>年龄: {age}</p>
      </div>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <LocalStorageExample />
                </div>
              </TabsContent>
              <TabsContent value="windowSize">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

// 自定义 Hook：获取窗口大小
function useWindowSize() {
  // 初始化状态为 undefined，避免服务器端渲染问题
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return;

    // 处理窗口大小变化的函数
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 添加事件监听器
    window.addEventListener('resize', handleResize);
    
    // 立即调用一次，设置初始大小
    handleResize();
    
    // 清理函数
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 空依赖数组，只在挂载时执行一次

  return windowSize;
}

// 使用示例
function ResponsiveComponent() {
  const size = useWindowSize();
  
  return (
    <div>
      <p>窗口宽度: {size.width}px</p>
      <p>窗口高度: {size.height}px</p>
      {size.width && (
        <div>
          {isMobile && <p>移动设备</p>}
          {isTablet && <p>平板设备</p>}
          {isDesktop && <p>桌面设备</p>}
        </div>
      )}
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    实时示例：
                  </h4>
                  <WindowSizeExample />
                </div>
              </TabsContent>
              <TabsContent value="fetch">
                <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

// 自定义 Hook：数据获取
function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(url, {
          ...options,
          signal,
        });
        
        if (!response.ok) {
          throw new Error('HTTP error! Status: ' + response.status);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (error) {
        if (isMounted && error instanceof Error && error.name !== 'AbortError') {
          setError(error);
          setData(null);
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
  }, [url, options]);

  return { data, loading, error };
}

// 使用示例
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(
    'https://api.example.com/users/' + userId
  );

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  if (!data) return <div>无数据</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>邮箱: {data.email}</p>
      <p>电话: {data.phone}</p>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>自定义 Hooks 的组合</CardTitle>
            <CardDescription>如何组合多个自定义 Hooks。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              自定义 Hooks
              的一个强大特性是它们可以相互组合，创建更复杂的逻辑。这种组合方式使代码更加模块化和可维护。
            </p>
            <CodeBlock language="tsx">{`// 基础 Hooks
function useLocalStorage(key, initialValue) {
  // 实现省略...
  return [storedValue, setValue];
}

function useFetch(url, options) {
  // 实现省略...
  return { data, loading, error, refetch };
}

// 组合 Hooks
function useCachedFetch(url, key, options) {
  // 使用 useLocalStorage 存储缓存数据
  const [cachedData, setCachedData] = useLocalStorage(key, null);
  
  // 使用 useFetch 获取新数据
  const { data, loading, error, refetch } = useFetch(url, options);
  
  // 组合逻辑
  useEffect(() => {
    if (data) {
      setCachedData(data);
    }
  }, [data, setCachedData]);
  
  // 返回缓存数据或新数据
  return {
    data: data || cachedData,
    loading,
    error,
    refetch,
    isFromCache: !data && cachedData
  };
}

// 使用示例
function UserDashboard() {
  const { data, loading, error, isFromCache } = useCachedFetch(
    'https://api.example.com/dashboard',
    'dashboard-cache',
    { headers: { 'Content-Type': 'application/json' } }
  );
  
  if (loading && !data) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  
  return (
    <div>
      {isFromCache && <p>显示缓存数据...</p>}
      <Dashboard data={data} />
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>自定义 Hooks 与 TypeScript</CardTitle>
            <CardDescription>
              在 TypeScript 中使用自定义 Hooks。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              TypeScript 可以为自定义 Hooks
              提供类型安全，使其更加健壮和易于使用。以下是在 TypeScript
              中定义和使用自定义 Hooks 的示例：
            </p>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

// 定义返回类型
interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// 定义参数类型
interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

// 自定义 Hook 带有类型
function useCounter({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1
}: UseCounterOptions = {}): UseCounterResult {
  const [count, setCount] = useState<number>(initialValue);
  
  const increment = () => {
    setCount(prevCount => Math.min(max, prevCount + step));
  };
  
  const decrement = () => {
    setCount(prevCount => Math.max(min, prevCount - step));
  };
  
  const reset = () => {
    setCount(initialValue);
  };
  
  return { count, increment, decrement, reset };
}

// 使用示例
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter({
    initialValue: 10,
    min: 0,
    max: 20,
    step: 2
  });
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>减少</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">使用 TypeScript 的好处：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>提供更好的代码补全和类型检查</li>
              <li>使 Hook 的参数和返回值更加明确</li>
              <li>减少运行时错误</li>
              <li>提高代码可读性和可维护性</li>
              <li>便于团队协作</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>测试自定义 Hooks</CardTitle>
            <CardDescription>如何测试自定义 Hooks。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              测试自定义 Hooks 可以使用{" "}
              <code>@testing-library/react-hooks</code>{" "}
              库，它提供了一种简单的方法来测试 Hooks
              的行为，而不需要创建完整的组件。
            </p>
            <CodeBlock language="tsx">{`// useCounter.js
import { useState } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// useCounter.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  test('should initialize with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
  
  test('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  test('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
  
  test('should reset counter', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});`}</CodeBlock>
            <p className="mt-4">测试自定义 Hooks 的关键点：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                使用 <code>renderHook</code> 函数渲染 Hook
              </li>
              <li>
                使用 <code>act</code> 函数包装会导致状态更新的操作
              </li>
              <li>
                通过 <code>result.current</code> 访问 Hook 返回的值
              </li>
              <li>测试初始状态、状态更新和副作用</li>
              <li>考虑边界情况和错误处理</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>使用自定义 Hooks 的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>命名清晰</strong>：使用描述性的名称，以 "use"
                开头，清晰表明 Hook 的用途。
              </li>
              <li>
                <strong>单一职责</strong>：每个 Hook
                应该只做一件事，并做好这件事。
              </li>
              <li>
                <strong>组合而非复杂</strong>：创建小型、可组合的
                Hooks，而不是大型、复杂的 Hooks。
              </li>
              <li>
                <strong>文档化</strong>：为 Hook
                添加注释，说明其用途、参数和返回值。
              </li>
              <li>
                <strong>错误处理</strong>
                ：妥善处理可能的错误，提供有用的错误信息。
              </li>
              <li>
                <strong>性能考虑</strong>：注意 Hook
                的性能影响，避免不必要的重新渲染。
              </li>
              <li>
                <strong>测试</strong>：为 Hook
                编写单元测试，确保其行为符合预期。
              </li>
              <li>
                <strong>类型安全</strong>：使用 TypeScript 为 Hook
                提供类型定义。
              </li>
            </ul>
            <CodeBlock
              language="tsx"
              className="mt-4"
            >{`// 一个遵循最佳实践的自定义 Hook 示例
import { useState, useEffect, useCallback } from 'react';

/**
 * 用于管理异步操作的 Hook
 * @param asyncFunction - 异步函数
 * @param immediate - 是否立即执行
 * @param initialData - 初始数据
 * @returns 包含数据、加载状态、错误和执行函数的对象
 */
function useAsync<T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  initialData: T | null = null
) {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<E | null>(null);
  
  // 使用 useCallback 记忆化执行函数
  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (e) {
      setError(e as E);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);
  
  // 如果 immediate 为 true，则在挂载时执行
  useEffect(() => {
    if (immediate) {
      execute().catch(() => {
        // 错误已在 execute 中处理
      });
    }
  }, [execute, immediate]);
  
  return { data, loading, error, execute };
}

// 使用示例
function UserProfile({ userId }) {
  const fetchUserData = useCallback(async () => {
    const response = await fetch('/api/users/' + userId);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  }, [userId]);
  
  const { data, loading, error, execute } = useAsync(fetchUserData);
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  if (!data) return <div>无数据</div>;
  
  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={execute}>刷新</button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>自定义 Hooks 示例</CardTitle>
            <CardDescription>使用自定义 Hooks 的示例。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              自定义 Hooks 可以用于多种场景，包括但不限于：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>在 localStorage 中持久化状态</li>
              <li>获取窗口大小</li>
              <li>数据获取</li>
              <li>防抖</li>
            </ul>
            <p className="mb-4">以下是一些示例：</p>
            <Tabs defaultValue="localStorage">
              <TabsList className="mb-4">
                <TabsTrigger value="localStorage">useLocalStorage</TabsTrigger>
                <TabsTrigger value="windowSize">useWindowSize</TabsTrigger>
                <TabsTrigger value="fetch">useFetch</TabsTrigger>
              </TabsList>
              <TabsContent value="localStorage">
                <CodeBlock language="tsx">{`import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="windowSize">
                <CodeBlock language="tsx">{`import { useState } from "react";

export function useWindowSize(): { width: number; height: number } {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="fetch">
                <CodeBlock language="tsx">{`import { useState } from "react";

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          ...options,
          signal,
        });

        if (!response.ok) {
          throw new Error('HTTP error! Status: ' + response.status);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (error) {
        if (isMounted && error instanceof Error && error.name !== 'AbortError') {
          setError(error);
          setData(null);
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
  }, [url, options]);

  return { data, loading, error };
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
