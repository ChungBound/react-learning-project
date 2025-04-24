"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { useState, useReducer } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus, RotateCcw, Trash, Check, X } from "lucide-react"

// 示例组件：计数器
function CounterExample() {
  // 定义reducer函数
  const counterReducer = (state: { count: number }, action: { type: string; payload?: number }) => {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 }
      case "DECREMENT":
        return { count: state.count - 1 }
      case "RESET":
        return { count: 0 }
      case "SET":
        return { count: action.payload || 0 }
      default:
        return state
    }
  }

  // 使用useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">计数器示例</h3>
        <p className="text-2xl font-bold mb-4">当前计数: {state.count}</p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => dispatch({ type: "DECREMENT" })}>
            <Minus className="h-4 w-4 mr-1" /> 减少
          </Button>
          <Button variant="outline" onClick={() => dispatch({ type: "RESET" })}>
            <RotateCcw className="h-4 w-4 mr-1" /> 重置
          </Button>
          <Button variant="outline" onClick={() => dispatch({ type: "INCREMENT" })}>
            <Plus className="h-4 w-4 mr-1" /> 增加
          </Button>
        </div>
        <div className="mt-4">
          <Button onClick={() => dispatch({ type: "SET", payload: 10 })}>设置为10</Button>
        </div>
      </div>
    </Card>
  )
}

// 示例组件：待办事项
function TodoExample() {
  // 定义reducer函数
  const todoReducer = (
    state: { todos: { id: number; text: string; completed: boolean }[] },
    action: { type: string; payload?: any },
  ) => {
    switch (action.type) {
      case "ADD_TODO":
        return {
          todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
        }
      case "TOGGLE_TODO":
        return {
          todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
          ),
        }
      case "DELETE_TODO":
        return {
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        }
      case "CLEAR_COMPLETED":
        return {
          todos: state.todos.filter((todo) => !todo.completed),
        }
      default:
        return state
    }
  }

  // 使用useReducer
  const [state, dispatch] = useReducer(todoReducer, { todos: [] })
  const [newTodo, setNewTodo] = useState("")

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: "ADD_TODO", payload: newTodo })
      setNewTodo("")
    }
  }

  return (
    <Card className="p-4 border-dashed">
      <div>
        <h3 className="text-lg font-medium mb-4">待办事项示例</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            placeholder="添加新待办..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button onClick={handleAddTodo}>添加</Button>
        </div>

        {state.todos.length === 0 ? (
          <p className="text-center text-muted-foreground">暂无待办事项</p>
        ) : (
          <div className="space-y-2">
            {state.todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-2 border rounded-md"
                style={{ textDecoration: todo.completed ? "line-through" : "none" }}
              >
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
                  >
                    {todo.completed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4 opacity-0" />}
                  </Button>
                  <span>{todo.text}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
                清除已完成
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default function UseReducerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useReducer 钩子</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 useReducer？</CardTitle>
            <CardDescription>
              useReducer 是 React 的一个内置钩子，它是 useState 的替代方案，适用于复杂的状态逻辑。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useReducer</code> 接收一个 reducer 函数和一个初始状态，返回当前状态和一个 dispatch
              函数。当你需要管理包含多个子值的复杂状态逻辑，或者当下一个状态依赖于之前的状态时，useReducer 比 useState
              更适用。
            </p>
            <CodeBlock language="tsx">{`import { useReducer } from 'react';

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  // 使用 useReducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      计数: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useReducer 基本语法</CardTitle>
            <CardDescription>了解如何使用 useReducer 钩子。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useReducer</code> 钩子的基本语法如下：
            </p>
            <CodeBlock language="tsx">{`const [state, dispatch] = useReducer(reducer, initialState, init);`}</CodeBlock>
            <p className="mt-4">参数说明：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <code>reducer</code>: 一个函数，接收当前状态和一个动作（action），返回新的状态
              </li>
              <li>
                <code>initialState</code>: 初始状态值
              </li>
              <li>
                <code>init</code>: （可选）初始化函数，用于计算初始状态
              </li>
            </ul>
            <p className="mt-4">返回值：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <code>state</code>: 当前状态
              </li>
              <li>
                <code>dispatch</code>: 一个函数，用于发送动作（action）给 reducer
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 useReducer 的示例</CardTitle>
            <CardDescription>几个使用 useReducer 的实际例子。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="counter">
              <TabsList className="mb-4">
                <TabsTrigger value="counter">计数器</TabsTrigger>
                <TabsTrigger value="todo">待办事项</TabsTrigger>
              </TabsList>
              <TabsContent value="counter">
                <CodeBlock language="tsx">{`import { useReducer } from 'react';

// 定义 reducer 函数
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  // 使用 useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <h1>计数器</h1>
      <p>当前计数: {state.count}</p>
      <div>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>减少</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>重置</button>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>增加</button>
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>
          设置为10
        </button>
      </div>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <CounterExample />
                </div>
              </TabsContent>
              <TabsContent value="todo">
                <CodeBlock language="tsx">{`import { useReducer, useState } from 'react';

// 定义 reducer 函数
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'CLEAR_COMPLETED':
      return {
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }
}

function TodoList() {
  // 使用 useReducer
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [newTodo, setNewTodo] = useState('');
  
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };
  
  return (
    <div>
      <h1>待办事项列表</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="添加新待办..."
        />
        <button onClick={handleAddTodo}>添加</button>
      </div>
      
      {state.todos.length === 0 ? (
        <p>暂无待办事项</p>
      ) : (
        <ul>
          {state.todos.map(todo => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              />
              <span>{todo.text}</span>
              <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {state.todos.some(todo => todo.completed) && (
        <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
          清除已完成
        </button>
      )}
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <TodoExample />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useState vs useReducer</CardTitle>
            <CardDescription>了解何时使用 useState 和何时使用 useReducer。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useState</code> 和 <code>useReducer</code> 都是用于管理组件状态的钩子，但它们适用于不同的场景：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">使用 useState 的场景</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>状态逻辑简单</li>
                  <li>状态之间相互独立</li>
                  <li>状态更新逻辑简单</li>
                  <li>状态结构简单（如数字、字符串、布尔值）</li>
                  <li>团队更熟悉 useState</li>
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">使用 useReducer 的场景</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>状态逻辑复杂</li>
                  <li>状态之间有依赖关系</li>
                  <li>状态更新逻辑复杂</li>
                  <li>状态结构复杂（如嵌套对象、数组）</li>
                  <li>需要在多个事件处理函数中更新相同的状态</li>
                  <li>需要更好的测试性和可维护性</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              一般来说，当状态逻辑变得复杂时，考虑从 <code>useState</code> 迁移到 <code>useReducer</code>。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 TypeScript 定义类型</CardTitle>
            <CardDescription>为 useReducer 添加类型定义。</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`import { useReducer } from 'react';

// 定义状态类型
interface State {
  count: number;
  loading: boolean;
  error: string | null;
}

// 定义动作类型
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// 定义 reducer 函数
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      // 使用类型守卫确保所有 action 类型都被处理
      const _exhaustiveCheck: never = action;
      return state;
  }
}

function Counter() {
  // 初始状态
  const initialState: State = {
    count: 0,
    loading: false,
    error: null
  };
  
  // 使用 useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      {state.loading ? (
        <p>加载中...</p>
      ) : state.error ? (
        <p>错误: {state.error}</p>
      ) : (
        <>
          <p>计数: {state.count}</p>
          <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
          <button onClick={() => dispatch({ type: 'RESET' })}>重置</button>
          <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
        </>
      )}
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4 text-muted-foreground">
              使用 TypeScript 可以提高代码的类型安全性，减少运行时错误，并提供更好的开发体验。特别是对于复杂的 reducer
              函数，类型定义可以帮助确保所有的 action 类型都被正确处理。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 useReducer 与 Context</CardTitle>
            <CardDescription>结合 useReducer 和 Context API 进行全局状态管理。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useReducer</code> 和 Context API 可以结合使用，创建一个简单的全局状态管理解决方案，类似于 Redux。
            </p>
            <CodeBlock language="tsx">{`import { createContext, useContext, useReducer, ReactNode } from 'react';

// 定义状态类型
interface State {
  count: number;
  theme: 'light' | 'dark';
}

// 定义动作类型
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'TOGGLE_THEME' };

// 定义 Context 类型
interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// 创建 Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// 定义 reducer 函数
function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

// 创建 Provider 组件
function AppProvider({ children }: { children: ReactNode }) {
  // 初始状态
  const initialState: State = {
    count: 0,
    theme: 'light'
  };
  
  // 使用 useReducer
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // 提供 Context 值
  const value = { state, dispatch };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// 创建自定义 Hook
function useApp() {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
}

// 使用示例
function Counter() {
  const { state, dispatch } = useApp();
  
  return (
    <div style={{ background: state.theme === 'light' ? '#fff' : '#333', color: state.theme === 'light' ? '#333' : '#fff' }}>
      <p>计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
        切换主题
      </button>
    </div>
  );
}

// 应用组件
function App() {
  return (
    <AppProvider>
      <div className="app">
        <h1>应用</h1>
        <Counter />
      </div>
    </AppProvider>
  );
}`}</CodeBlock>
            <p className="mt-4">
              这种模式非常适合中小型应用的状态管理。对于大型应用，可能需要考虑使用专门的状态管理库，如 Redux、Zustand
              等。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>使用 useReducer 的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>保持 reducer 函数纯净</strong>：reducer 函数应该是纯函数，不应该有副作用，如 API
                调用、修改全局变量等。
              </li>
              <li>
                <strong>使用描述性的 action 类型</strong>：使用清晰、描述性的 action 类型名称，如"ADD_TODO"而不是"ADD"。
              </li>
              <li>
                <strong>使用 action 创建函数</strong>：对于复杂的 action，可以创建辅助函数来生成 action 对象。
              </li>
              <li>
                <strong>拆分复杂的 reducer</strong>：当 reducer 变得复杂时，可以将其拆分为多个小的
                reducer，然后组合它们。
              </li>
              <li>
                <strong>使用 TypeScript</strong>：为 state 和 action 定义类型，提高代码的类型安全性。
              </li>
              <li>
                <strong>使用初始化函数</strong>：对于复杂的初始状态计算，可以使用 useReducer
                的第三个参数（初始化函数）。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 使用初始化函数
function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({ initialCount }) {
  // 使用初始化函数
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
