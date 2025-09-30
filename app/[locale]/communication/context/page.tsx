"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { ContextExample } from "@/components/interactive-examples/context-example"

export default function ContextPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">跨层级通信 (Context)</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 Context？</CardTitle>
            <CardDescription>
              Context 提供了一种在组件树中共享值的方式，而不必显式地通过组件树的每个层级传递 props。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在典型的 React 应用中，数据是通过 props
              从父组件向下传递到子组件的（即所谓的"自上而下"或单向数据流）。但对于某些类型的属性（如主题、用户信息、语言偏好等），如果需要在多个层级的组件中使用，通过
              props 层层传递会变得非常繁琐。
            </p>
            <p className="mb-4">Context 提供了一种不必通过中间组件传递 props 的方式，实现了跨层级数据传递。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>创建和使用 Context</CardTitle>
            <CardDescription>Context 的基本用法。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">使用 Context 主要分为三步：</p>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>
                创建 Context (<code>React.createContext</code>)
              </li>
              <li>
                提供 Context 值 (<code>Context.Provider</code>)
              </li>
              <li>
                消费 Context 值 (<code>useContext</code>)
              </li>
            </ol>
            <CodeBlock language="tsx">{`import { createContext, useContext, useState } from 'react';

// 步骤 1: 创建 Context
const ThemeContext = createContext<'light' | 'dark'>('light');

// 步骤 2: 提供 Context 值
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      <div className="app">
        <h1>主题示例</h1>
        <ThemedButton onClick={toggleTheme} />
        <ThemedContent />
      </div>
    </ThemeContext.Provider>
  );
}

// 步骤 3: 消费 Context 值
function ThemedButton({ onClick }: { onClick: () => void }) {
  const theme = useContext(ThemeContext);
  
  return (
    <button 
      onClick={onClick}
      style={{ 
        background: theme === 'light' ? '#f0f0f0' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      切换到{theme === 'light' ? '暗色' : '亮色'}主题
    </button>
  );
}

function ThemedContent() {
  const theme = useContext(ThemeContext);
  
  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#222',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px'
      }}
    >
      <h2>当前主题: {theme}</h2>
      <p>这是一些使用当前主题样式的内容。</p>
    </div>
  );
}`}</CodeBlock>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
              <ContextExample />
            </div>
          </CardContent>
        </Card>

        {/* 其余内容保持不变 */}
        <Card>
          <CardHeader>
            <CardTitle>使用默认值和类型</CardTitle>
            <CardDescription>为 Context 提供默认值和类型定义。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              创建 Context 时，可以提供一个默认值。当组件没有找到匹配的 Provider 时，将使用这个默认值。
            </p>
            <p className="mb-4">使用 TypeScript 时，应该为 Context 和其值定义明确的类型。</p>
            <CodeBlock language="tsx">{`import { createContext, useContext, ReactNode } from 'react';

// 定义 Context 值的类型
interface UserContextType {
  username: string;
  isAdmin: boolean;
}

// 创建 Context 并提供默认值
const UserContext = createContext<UserContextType>({
  username: 'Guest',
  isAdmin: false
});

// 创建 Provider 组件
interface UserProviderProps {
  user: UserContextType;
  children: ReactNode;
}

function UserProvider({ user, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

// 创建自定义 Hook 来使用 Context
function useUser() {
  return useContext(UserContext);
}

// 在组件中使用
function UserProfile() {
  const { username, isAdmin } = useUser();
  
  return (
    <div>
      <h2>用户资料</h2>
      <p>用户名: {username}</p>
      <p>权限: {isAdmin ? '管理员' : '普通用户'}</p>
    </div>
  );
}

// 在应用中使用 Provider
function App() {
  const user = {
    username: 'Admin123',
    isAdmin: true
  };
  
  return (
    <UserProvider user={user}>
      <div className="app">
        <h1>我的应用</h1>
        <UserProfile />
      </div>
    </UserProvider>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 Context 管理状态</CardTitle>
            <CardDescription>结合 useState 和 useReducer 使用 Context 创建状态管理解决方案。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Context 常与 useState 或 useReducer 结合使用，创建简单的状态管理解决方案。</p>
            <Tabs defaultValue="useState">
              <TabsList className="mb-4">
                <TabsTrigger value="useState">使用 useState</TabsTrigger>
                <TabsTrigger value="useReducer">使用 useReducer</TabsTrigger>
              </TabsList>
              <TabsContent value="useState">
                <CodeBlock language="tsx">{`import { createContext, useContext, useState, ReactNode } from 'react';

// 定义 Context 类型
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// 创建 Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 创建 Provider 组件
function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // 检查商品是否已在购物车中
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // 如果已存在，更新数量
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // 否则添加新商品
        return [...prevItems, item];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  // 提供 Context 值
  const value = {
    items,
    addItem,
    removeItem,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 创建自定义 Hook
function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}

// 示例组件
function Product({ product }: { product: { id: string; name: string; price: number } }) {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };
  
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>¥{product.price}</p>
      <button onClick={handleAddToCart}>加入购物车</button>
    </div>
  );
}

function Cart() {
  const { items, removeItem, clearCart } = useCart();
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div className="cart">
      <h2>购物车</h2>
      {items.length === 0 ? (
        <p>购物车为空</p>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} - ¥{item.price} x {item.quantity}
                <button onClick={() => removeItem(item.id)}>移除</button>
              </li>
            ))}
          </ul>
          <p>总计: ¥{total}</p>
          <button onClick={clearCart}>清空购物车</button>
        </>
      )}
    </div>
  );
}

// 应用组件
function App() {
  const products = [
    { id: '1', name: '商品 1', price: 100 },
    { id: '2', name: '商品 2', price: 200 },
    { id: '3', name: '商品 3', price: 300 }
  ];
  
  return (
    <CartProvider>
      <div className="app">
        <h1>购物网站</h1>
        <div className="products">
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Cart />
      </div>
    </CartProvider>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="useReducer">
                <CodeBlock language="tsx">{`import { createContext, useContext, useReducer, ReactNode } from 'react';

// 定义状态和动作类型
interface TodoState {
  todos: Todo[];
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' };

// 定义 Context 类型
interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

// 创建 Context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// 创建 reducer 函数
function todoReducer(state: TodoState, action: TodoAction): TodoState {
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
    case 'REMOVE_TODO':
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

// 创建 Provider 组件
function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  
  const value = { state, dispatch };
  
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// 创建自定义 Hook
function useTodo() {
  const context = useContext(TodoContext);
  
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  
  return context;
}

// 示例组件
function TodoForm() {
  const { dispatch } = useTodo();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('todo') as HTMLInputElement;
    if (input.value.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input.value });
      input.value = '';
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="todo"
        placeholder="添加新任务..."
      />
      <button type="submit">添加</button>
    </form>
  );
}

function TodoList() {
  const { state, dispatch } = useTodo();
  
  return (
    <div>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      {state.todos.some(todo => todo.completed) && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        >
          清除已完成
        </button>
      )}
    </div>
  );
}

// 应用组件
function App() {
  return (
    <TodoProvider>
      <div className="app">
        <h1>待办事项列表</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>多个 Context 的使用</CardTitle>
            <CardDescription>在应用中组合多个 Context。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在复杂应用中，可能需要使用多个 Context 来管理不同类型的全局状态，如主题、用户认证、语言偏好等。
            </p>
            <CodeBlock language="tsx">{`import { createContext, useContext, useState, ReactNode } from 'react';

// 创建多个 Context
const ThemeContext = createContext<'light' | 'dark'>('light');
const LanguageContext = createContext<'zh' | 'en'>('zh');
const AuthContext = createContext<{ user: string | null; isAuthenticated: boolean }>({
  user: null,
  isAuthenticated: false
});

// 创建 Provider 组件
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button onClick={toggleTheme}>
          切换主题
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };
  
  return (
    <LanguageContext.Provider value={language}>
      <div>
        <button onClick={toggleLanguage}>
          切换语言: {language === 'zh' ? '中文' : 'English'}
        </button>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false
  });
  
  const login = (username: string) => {
    setAuth({
      user: username,
      isAuthenticated: true
    });
  };
  
  const logout = () => {
    setAuth({
      user: null,
      isAuthenticated: false
    });
  };
  
  return (
    <AuthContext.Provider value={auth}>
      <div>
        {!auth.isAuthenticated ? (
          <button onClick={() => login('user123')}>登录</button>
        ) : (
          <button onClick={logout}>登出</button>
        )}
        {children}
      </div>
    </AuthContext.Provider>
  );
}

// 创建自定义 Hooks
function useTheme() {
  return useContext(ThemeContext);
}

function useLanguage() {
  return useContext(LanguageContext);
}

function useAuth() {
  return useContext(AuthContext);
}

// 消费多个 Context 的组件
function Content() {
  const theme = useTheme();
  const language = useLanguage();
  const auth = useAuth();
  
  const texts = {
    zh: {
      welcome: '欢迎',
      guest: '访客',
      content: '这是一些内容。'
    },
    en: {
      welcome: 'Welcome',
      guest: 'Guest',
      content: 'This is some content.'
    }
  };
  
  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#f8f8f8' : '#333',
        color: theme === 'light' ? '#333' : '#f8f8f8',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}
    >
      <h2>{texts[language].welcome}, {auth.user || texts[language].guest}!</h2>
      <p>{texts[language].content}</p>
      <p>主题: {theme}</p>
      <p>语言: {language === 'zh' ? '中文' : 'English'}</p>
      <p>状态: {auth.isAuthenticated ? '已登录' : '未登录'}</p>
    </div>
  );
}

// 组合多个 Provider
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="app">
            <h1>多 Context 示例</h1>
            <Content />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>性能优化</CardTitle>
            <CardDescription>优化使用 Context 的性能。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Context 的一个潜在问题是，当 Provider 的值变化时，所有消费该 Context
              的组件都会重新渲染，即使它们实际上并不使用变化的部分。以下是一些优化技巧：
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>将状态拆分为多个 Context，避免不必要的重新渲染</li>
              <li>使用 React.memo 包装消费 Context 的组件</li>
              <li>使用 useMemo 缓存 Provider 的值</li>
            </ol>
            <CodeBlock language="tsx">{`import { createContext, useContext, useState, useMemo, ReactNode, memo } from 'react';

// 将状态拆分为多个 Context
const UserContext = createContext<string | null>(null);
const ThemeContext = createContext<'light' | 'dark'>('light');

// Provider 组件
function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // 使用 useMemo 缓存 Provider 的值
  const userContextValue = useMemo(() => user, [user]);
  const themeContextValue = useMemo(() => theme, [theme]);
  
  const login = () => setUser('user123');
  const logout = () => setUser(null);
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  
  return (
    <UserContext.Provider value={userContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div>
          <button onClick={login}>登录</button>
          <button onClick={logout}>登出</button>
          <button onClick={toggleTheme}>切换主题</button>
          {children}
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// 使用 memo 包装消费 Context 的组件
const UserDisplay = memo(() => {
  const user = useContext(UserContext);
  console.log('UserDisplay 渲染');
  
  return (
    <div>
      <h2>用户: {user || '未登录'}</h2>
    </div>
  );
});

const ThemeDisplay = memo(() => {
  const theme = useContext(ThemeContext);
  console.log('ThemeDisplay 渲染');
  
  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#f8f8f8' : '#333',
        color: theme === 'light' ? '#333' : '#f8f8f8',
        padding: '10px'
      }}
    >
      <h2>当前主题: {theme}</h2>
    </div>
  );
});

// 应用组件
function App() {
  return (
    <AppProvider>
      <div className="app">
        <h1>Context 性能优化示例</h1>
        <UserDisplay />
        <ThemeDisplay />
      </div>
    </AppProvider>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>使用 Context 的一些建议和最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>适当使用 Context</strong>：Context
                主要用于在组件树中传递全局数据。对于只在组件树的一小部分中使用的数据，考虑使用组件组合或 props 传递。
              </li>
              <li>
                <strong>创建自定义 Hook</strong>：为每个 Context 创建一个自定义 Hook，简化消费 Context
                的代码并提供更好的错误处理。
              </li>
              <li>
                <strong>分离关注点</strong>：根据不同的功能或领域将应用状态拆分到不同的 Context 中。
              </li>
              <li>
                <strong>考虑性能影响</strong>：Context 值的变化会导致所有消费该 Context 的组件重新渲染。设计 Context
                结构时要考虑这一点。
              </li>
              <li>
                <strong>结合其他状态管理工具</strong>：对于复杂应用，考虑将 Context 与 useReducer
                结合使用，或者使用专门的状态管理库如 Redux、Zustand 等。
              </li>
              <li>
                <strong>提供合理的默认值</strong>：为 Context 提供有意义的默认值，确保在没有 Provider
                的情况下组件也能正常工作。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 良好实践示例：自定义 Hook 和错误处理

import { createContext, useContext, useState, ReactNode } from 'react';

// 定义 Context 类型
interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// 创建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 组件
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  
  const login = (username: string) => {
    setUser(username);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: user !== null
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 自定义 Hook
function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// 导出
export { AuthProvider, useAuth };

// 使用方式
import { AuthProvider, useAuth } from './auth-context';

function LoginButton() {
  const { login } = useAuth();
  
  return (
    <button onClick={() => login('user123')}>
      登录
    </button>
  );
}

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <p>请先登录</p>;
  }
  
  return (
    <div>
      <h2>欢迎, {user}!</h2>
      <button onClick={logout}>登出</button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <h1>认证示例</h1>
        <LoginButton />
        <UserProfile />
      </div>
    </AuthProvider>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
