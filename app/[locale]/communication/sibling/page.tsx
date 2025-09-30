"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"

export default function SiblingCommunicationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">兄弟组件通信</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>通过共同的父组件</CardTitle>
            <CardDescription>最常见的兄弟组件通信方式是通过它们共同的父组件进行状态提升。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在这种模式中，状态保存在父组件中，并通过 props 传递给子组件。当一个子组件需要更新状态时，
              它调用父组件提供的回调函数，然后父组件更新状态并将新值传递给另一个子组件。
            </p>

            <CodeBlock language="tsx">{`import { useState } from 'react';

// 第一个子组件：发送消息
function MessageSender({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  
  return (
    <div className="message-sender">
      <h2>发送消息</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入消息..."
        />
        <button type="submit">发送</button>
      </form>
    </div>
  );
}

// 第二个子组件：显示消息
function MessageDisplay({ messages }: { messages: string[] }) {
  return (
    <div className="message-display">
      <h2>收到的消息</h2>
      {messages.length === 0 ? (
        <p>暂无消息</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 父组件：管理状态
function ChatApp() {
  const [messages, setMessages] = useState<string[]>([]);
  
  const handleSendMessage = (newMessage: string) => {
    setMessages([...messages, newMessage]);
  };
  
  return (
    <div className="chat-app">
      <h1>聊天应用</h1>
      <div className="chat-container">
        <MessageSender onSendMessage={handleSendMessage} />
        <MessageDisplay messages={messages} />
      </div>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 Context API</CardTitle>
            <CardDescription>对于更复杂的场景或多层级组件通信，可以使用 React 的 Context API。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Context 提供了一种在组件树中共享数据的方式，无需显式地通过 props 传递。
              这对于兄弟组件通信特别有用，尤其是当它们不共享一个直接的父组件时。
            </p>

            <CodeBlock language="tsx">{`import { createContext, useContext, useState, ReactNode } from 'react';

// 创建 Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Context Provider 组件
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自定义 Hook 简化 Context 使用
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 第一个兄弟组件：主题切换按钮
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      切换到{theme === 'light' ? '暗色' : '亮色'}主题
    </button>
  );
}

// 第二个兄弟组件：显示当前主题
function ThemeDisplay() {
  const { theme } = useTheme();
  
  return (
    <div>
      当前主题: {theme === 'light' ? '亮色' : '暗色'}
    </div>
  );
}

// 第三个兄弟组件：使用主题的内容
function ThemedContent() {
  const { theme } = useTheme();
  
  const style = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
    color: theme === 'light' ? '#333333' : '#ffffff',
    padding: '20px',
    borderRadius: '5px'
  };
  
  return (
    <div style={style}>
      <h2>主题内容</h2>
      <p>这个内容会根据当前主题自动调整样式。</p>
    </div>
  );
}

// 应用组件：组合所有组件
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>主题示例</h1>
        <ThemeToggle />
        <ThemeDisplay />
        <ThemedContent />
      </div>
    </ThemeProvider>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用自定义事件总线</CardTitle>
            <CardDescription>对于完全解耦的组件通信，可以实现一个简单的事件总线。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              事件总线是一种发布-订阅模式的实现，允许组件发布事件和订阅事件，而不需要直接的引用关系。
            </p>

            <CodeBlock language="tsx">{`// 事件总线实现
class EventBus {
  private listeners: { [event: string]: Function[] } = {};

  subscribe(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    // 返回取消订阅的函数
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
      );
    };
  }

  publish(event: string, data?: any) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach(callback => {
      callback(data);
    });
  }
}

// 创建单例事件总线
const eventBus = new EventBus();

// 在 React 中使用事件总线的自定义 Hook
import { useEffect } from 'react';

function useEventBus(event: string, callback: Function) {
  useEffect(() => {
    // 订阅事件
    const unsubscribe = eventBus.subscribe(event, callback);
    
    // 组件卸载时取消订阅
    return () => {
      unsubscribe();
    };
  }, [event, callback]);
  
  // 返回发布事件的函数
  return (eventName: string, data?: any) => {
    eventBus.publish(eventName, data);
  };
}

// 第一个组件：发送消息
function MessagePublisher() {
  const publishEvent = useEventBus('message', () => {});
  
  const handleSendMessage = () => {
    publishEvent('message', {
      id: Date.now(),
      text: '这是一条新消息',
      timestamp: new Date().toLocaleTimeString()
    });
  };
  
  return (
    <div>
      <h2>消息发布者</h2>
      <button onClick={handleSendMessage}>发送消息</button>
    </div>
  );
}

// 第二个组件：接收消息
function MessageSubscriber() {
  const [messages, setMessages] = useState<any[]>([]);
  
  // 订阅消息事件
  useEventBus('message', (data: any) => {
    setMessages(prev => [...prev, data]);
  });
  
  return (
    <div>
      <h2>消息订阅者</h2>
      {messages.length === 0 ? (
        <p>暂无消息</p>
      ) : (
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>
              {msg.text} - {msg.timestamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 应用组件
function App() {
  return (
    <div>
      <h1>事件总线示例</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <MessagePublisher />
        <MessageSubscriber />
      </div>
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4 text-muted-foreground">
              注意：事件总线模式虽然灵活，但可能导致代码难以追踪和调试。在大多数情况下， React 的内置机制（如
              props、Context）是更好的选择。只有在特定场景下才考虑使用事件总线。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用状态管理库</CardTitle>
            <CardDescription>对于复杂应用，可以使用状态管理库如 Redux、Zustand 或 Jotai。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              状态管理库提供了集中式的状态管理，使得任何组件都可以访问和更新应用状态， 而不需要通过组件树传递 props。
            </p>

            <Tabs defaultValue="zustand">
              <TabsList className="mb-4">
                <TabsTrigger value="zustand">Zustand 示例</TabsTrigger>
                <TabsTrigger value="redux">Redux 示例</TabsTrigger>
              </TabsList>
              <TabsContent value="zustand">
                <CodeBlock language="tsx">{`// 使用 Zustand 进行状态管理
import { create } from 'zustand';

// 定义 store 类型
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// 创建 store
const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// 第一个组件：计数器控制
function CounterControls() {
  const { increment, decrement, reset } = useCounterStore();
  
  return (
    <div>
      <h2>计数器控制</h2>
      <div className="buttons">
        <button onClick={increment}>增加</button>
        <button onClick={decrement}>减少</button>
        <button onClick={reset}>重置</button>
      </div>
    </div>
  );
}

// 第二个组件：计数器显示
function CounterDisplay() {
  const count = useCounterStore((state) => state.count);
  
  return (
    <div>
      <h2>计数器显示</h2>
      <p className="count">当前计数: {count}</p>
    </div>
  );
}

// 应用组件
function App() {
  return (
    <div className="counter-app">
      <h1>Zustand 计数器示例</h1>
      <div className="counter-container">
        <CounterControls />
        <CounterDisplay />
      </div>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="redux">
                <CodeBlock language="tsx">{`// 使用 Redux 进行状态管理
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 创建 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// 导出 actions
export const { increment, decrement, reset } = counterSlice.actions;

// 创建 store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// 定义 RootState 类型
type RootState = ReturnType<typeof store.getState>;

// 第一个组件：计数器控制
function CounterControls() {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h2>计数器控制</h2>
      <div className="buttons">
        <button onClick={() => dispatch(increment())}>增加</button>
        <button onClick={() => dispatch(decrement())}>减少</button>
        <button onClick={() => dispatch(reset())}>重置</button>
      </div>
    </div>
  );
}

// 第二个组件：计数器显示
function CounterDisplay() {
  const count = useSelector((state: RootState) => state.counter.value);
  
  return (
    <div>
      <h2>计数器显示</h2>
      <p className="count">当前计数: {count}</p>
    </div>
  );
}

// 应用组件
function App() {
  return (
    <Provider store={store}>
      <div className="counter-app">
        <h1>Redux 计数器示例</h1>
        <div className="counter-container">
          <CounterControls />
          <CounterDisplay />
        </div>
      </div>
    </Provider>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>选择合适的兄弟组件通信方式的建议。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>简单场景</strong>
                ：对于简单的兄弟组件通信，使用状态提升（将状态放在共同的父组件中）是最简单和最直接的方法。
              </li>
              <li>
                <strong>中等复杂度</strong>：当组件层级较深或需要在多个组件间共享状态时，考虑使用 Context API。
              </li>
              <li>
                <strong>复杂应用</strong>：对于大型应用或复杂的状态管理需求，使用专门的状态管理库（如
                Redux、Zustand、Jotai 等）。
              </li>
              <li>
                <strong>避免过度工程</strong>
                ：不要为了简单的通信需求引入复杂的状态管理解决方案。从简单的方法开始，随着应用的增长再逐步引入更复杂的解决方案。
              </li>
              <li>
                <strong>保持单向数据流</strong>：无论使用哪种方法，都应该遵循 React
                的单向数据流原则，使数据流向清晰可预测。
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
