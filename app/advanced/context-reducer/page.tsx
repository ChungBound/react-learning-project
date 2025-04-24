"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeBlock from "@/components/code-block";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { Button } from "@/components/ui/button";

// 示例：简单的计数器应用
const CounterContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// 定义 State 和 Action 的接口
interface State {
  count: number;
}

interface Action {
  type: "INCREMENT" | "DECREMENT" | "RESET";
}

// 定义 reducer
function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      throw new Error(`未知的 action 类型: ${action.type}`);
  }
}

// 创建 Provider 组件
function CounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 自定义 Hook 简化使用
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter 必须在 CounterProvider 内使用");
  }
  return context;
}

// 计数器显示组件
function CounterDisplay() {
  const { state } = useCounter();

  return (
    <div className="text-center text-2xl font-bold my-4">{state.count}</div>
  );
}

// 计数器控制组件
function CounterControls() {
  const { dispatch } = useCounter();

  return (
    <div className="flex justify-center gap-2">
      <Button variant="outline" onClick={() => dispatch({ type: "DECREMENT" })}>
        减少
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: "RESET" })}>
        重置
      </Button>
      <Button variant="outline" onClick={() => dispatch({ type: "INCREMENT" })}>
        增加
      </Button>
    </div>
  );
}

// 组合使用
function CounterExample() {
  return (
    <CounterProvider>
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">计数器示例</h3>
        <CounterDisplay />
        <CounterControls />
      </div>
    </CounterProvider>
  );
}

export default function ContextReducerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Context + useReducer</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Context + useReducer 模式</CardTitle>
            <CardDescription>
              结合 Context 和 useReducer 实现全局状态管理。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Context + useReducer 是一种强大的状态管理模式，它结合了 React 的
              Context API 和 useReducer
              Hook，提供了一种轻量级的全局状态管理解决方案，无需引入额外的库（如
              Redux）。
            </p>
            <p className="mb-4">
              这种模式特别适合中小型应用，或者大型应用中的特定功能模块，它提供了集中式的状态管理，同时保持了
              React 的简洁性和灵活性。
            </p>
            <CodeBlock language="tsx">{`// Context + useReducer 的基本结构
import { createContext, useContext, useReducer } from 'react';

// 创建 Context
const MyContext = createContext();

// 定义 reducer
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_1':
      return { ...state, /* 更新状态 */ };
    case 'ACTION_2':
      return { ...state, /* 更新状态 */ };
    default:
      return state;
  }
}

// 创建 Provider 组件
function MyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}

// 自定义 Hook 简化使用
function useMyContext() {
  return useContext(MyContext);
}

// 导出
export { MyProvider, useMyContext };`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>为什么使用 Context + useReducer？</CardTitle>
            <CardDescription>了解这种模式的优势和适用场景。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Context + useReducer 模式有以下优势：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>无需额外的库，使用 React 内置功能</li>
              <li>集中式状态管理，便于调试和维护</li>
              <li>可预测的状态更新，通过 action 描述变化</li>
              <li>适合处理复杂的状态逻辑</li>
              <li>避免了 props 层层传递（props drilling）</li>
              <li>可以创建多个独立的状态容器，按功能模块划分</li>
            </ul>
            <p className="mb-4">这种模式特别适合以下场景：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>中小型应用的全局状态管理</li>
              <li>大型应用中的特定功能模块</li>
              <li>需要在多个组件间共享状态的场景</li>
              <li>状态逻辑复杂，需要集中管理的场景</li>
              <li>团队熟悉 React，不想引入额外库的场景</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现一个计数器应用</CardTitle>
            <CardDescription>
              使用 Context + useReducer 实现一个简单的计数器应用。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              下面是一个使用 Context + useReducer 实现的计数器应用示例：
            </p>
            <CodeBlock language="tsx">{`import { createContext, useContext, useReducer } from 'react';

// 创建 Context
const CounterContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// 定义 reducer
function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      throw new Error(\`未知的 action 类型: \${action.type}\`);
  }
}

// 创建 Provider 组件
function CounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 自定义 Hook 简化使用
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter 必须在 CounterProvider 内使用');
  }
  return context;
}

// 计数器显示组件
function CounterDisplay() {
  const { state } = useCounter();
  
  return (
    <div>
      <h2>计数: {state.count}</h2>
    </div>
  );
}

// 计数器控制组件
function CounterControls() {
  const { dispatch } = useCounter();
  
  return (
    <div>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>减少</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>重置</button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>增加</button>
    </div>
  );
}

// 组合使用
function App() {
  return (
    <CounterProvider>
      <div>
        <h1>计数器应用</h1>
        <CounterDisplay />
        <CounterControls />
      </div>
    </CounterProvider>
  );
}`}</CodeBlock>
            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                实时示例：
              </h4>
              <CounterExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现一个待办事项应用</CardTitle>
            <CardDescription>
              使用 Context + useReducer 实现一个更复杂的待办事项应用。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              下面是一个使用 Context + useReducer
              实现的待办事项应用示例，展示了如何处理更复杂的状态逻辑：
            </p>
            <CodeBlock language="tsx">{`import { createContext, useContext, useReducer } from 'react';

// 定义 Action 类型
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const FILTER_TODOS = 'FILTER_TODOS';

// 创建 Context
const TodoContext = createContext();

// 定义 reducer
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case FILTER_TODOS:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

// 初始状态
const initialState = {
  todos: [],
  filter: 'all' // 'all', 'active', 'completed'
};

// 创建 Provider 组件
function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  // 创建 action creators
  const addTodo = text => dispatch({ type: ADD_TODO, payload: text });
  const toggleTodo = id => dispatch({ type: TOGGLE_TODO, payload: id });
  const removeTodo = id => dispatch({ type: REMOVE_TODO, payload: id });
  const filterTodos = filter => dispatch({ type: FILTER_TODOS, payload: filter });
  
  // 计算过滤后的待办事项
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true; // 'all'
  });
  
  return (
    <TodoContext.Provider value={{
      todos: filteredTodos,
      filter: state.filter,
      addTodo,
      toggleTodo,
      removeTodo,
      filterTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
}

// 自定义 Hook 简化使用
function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo 必须在 TodoProvider 内使用');
  }
  return context;
}

// 添加待办事项组件
function AddTodo() {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="添加新待办..."
      />
      <button type="submit">添加</button>
    </form>
  );
}

// 待办事项列表组件
function TodoList() {
  const { todos, toggleTodo, removeTodo } = useTodo();
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => removeTodo(todo.id)}>删除</button>
        </li>
      ))}
    </ul>
  );
}

// 过滤器组件
function TodoFilter() {
  const { filter, filterTodos } = useTodo();
  
  return (
    <div>
      <button
        onClick={() => filterTodos('all')}
        disabled={filter === 'all'}
      >
        全部
      </button>
      <button
        onClick={() => filterTodos('active')}
        disabled={filter === 'active'}
      >
        未完成
      </button>
      <button
        onClick={() => filterTodos('completed')}
        disabled={filter === 'completed'}
      >
        已完成
      </button>
    </div>
  );
}

// 组合使用
function TodoApp() {
  return (
    <TodoProvider>
      <div>
        <h1>待办事项应用</h1>
        <AddTodo />
        <TodoList />
        <TodoFilter />
      </div>
    </TodoProvider>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 TypeScript</CardTitle>
            <CardDescription>
              为 Context + useReducer 添加类型定义。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              使用 TypeScript 可以为 Context + useReducer
              模式提供更好的类型安全性和开发体验。下面是一个使用 TypeScript
              的示例：
            </p>
            <CodeBlock language="tsx">{`import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

// 定义状态类型
interface CounterState {
  count: number;
}

// 定义 Action 类型
type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

// 定义 Context 类型
interface CounterContextType {
  state: CounterState;
  dispatch: Dispatch<CounterAction>;
}

// 创建 Context
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// 定义 reducer
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      // 使用类型守卫确保所有 action 类型都被处理
      const _exhaustiveCheck: never = action;
      return state;
  }
}

// 定义 Provider Props
interface CounterProviderProps {
  children: ReactNode;
  initialCount?: number;
}

// 创建 Provider 组件
function CounterProvider({ children, initialCount = 0 }: CounterProviderProps) {
  const [state, dispatch] = useReducer(counterReducer, { count: initialCount });
  
  // 提供 Context 值
  const value = { state, dispatch };
  
  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

// 自定义 Hook 简化使用
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter 必须在 CounterProvider 内使用');
  }
  return context;
}

// 导出
export { CounterProvider, useCounter };`}</CodeBlock>
            <p className="mt-4">使用 TypeScript 的好处包括：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>类型安全：在编译时捕获类型错误</li>
              <li>更好的代码补全和文档</li>
              <li>更容易重构和维护</li>
              <li>更好的团队协作体验</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Context + useReducer vs Redux</CardTitle>
            <CardDescription>
              比较 Context + useReducer 和 Redux。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Context + useReducer 和 Redux
              都是用于状态管理的解决方案，但它们有一些关键区别：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">
                  Context + useReducer
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>React 内置功能，无需额外库</li>
                  <li>更轻量级，更少的样板代码</li>
                  <li>适合中小型应用</li>
                  <li>可以创建多个独立的状态容器</li>
                  <li>没有内置的中间件系统</li>
                  <li>没有专门的开发工具</li>
                  <li>性能可能不如 Redux</li>
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Redux</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>需要额外的库</li>
                  <li>更多的样板代码</li>
                  <li>适合大型应用</li>
                  <li>单一的状态树</li>
                  <li>强大的中间件系统</li>
                  <li>专门的开发工具</li>
                  <li>经过优化的性能</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              选择哪种方案取决于项目的需求和团队的偏好。对于大多数中小型应用，Context
              + useReducer
              已经足够，而且更加简洁。对于大型应用或有特殊需求（如复杂的异步操作、状态持久化等），Redux
              可能是更好的选择。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>
              使用 Context + useReducer 的一些最佳实践。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>按功能模块划分状态</strong>：为不同的功能模块创建独立的
                Context 和 reducer，而不是将所有状态放在一个全局 Context 中。
              </li>
              <li>
                <strong>创建 action creators</strong>：使用函数封装 dispatch
                调用，使代码更加清晰和可维护。
              </li>
              <li>
                <strong>使用常量定义 action 类型</strong>
                ：避免字符串字面量，减少拼写错误。
              </li>
              <li>
                <strong>提供自定义 Hook</strong>：为每个 Context 创建自定义
                Hook，简化使用并提供错误检查。
              </li>
              <li>
                <strong>使用 TypeScript</strong>：为状态和 action
                提供类型定义，提高代码质量和开发体验。
              </li>
              <li>
                <strong>考虑性能优化</strong>：对于大型应用，考虑使用 useMemo 和
                useCallback 优化性能，或者将状态拆分为更小的粒度。
              </li>
              <li>
                <strong>处理异步操作</strong>：在 action creators
                中处理异步操作，而不是在 reducer 中。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 处理异步操作的示例
import { createContext, useContext, useReducer, ReactNode } from 'react';

// 定义状态和 Action 类型
interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'FETCH_USER_REQUEST' }
  | { type: 'FETCH_USER_SUCCESS'; payload: any }
  | { type: 'FETCH_USER_FAILURE'; payload: string };

// 创建 Context
const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  fetchUser: (id: string) => Promise<void>;
} | undefined>(undefined);

// 定义 reducer
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// 创建 Provider 组件
function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    loading: false,
    error: null
  });
  
  // 异步 action creator
  const fetchUser = async (id: string) => {
    dispatch({ type: 'FETCH_USER_REQUEST' });
    
    try {
      const response = await fetch(\`https://api.example.com/users/\${id}\`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
    }
  };
  
  return (
    <UserContext.Provider value={{ state, dispatch, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 自定义 Hook
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// 使用示例
function UserProfile({ userId }) {
  const { state, fetchUser } = useUser();
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  
  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  if (!state.user) return null;
  
  return (
    <div>
      <h1>{state.user.name}</h1>
      <p>{state.user.email}</p>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
