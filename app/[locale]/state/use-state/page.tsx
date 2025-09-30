"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import { CounterExample } from "@/components/interactive-examples/counter-example"
import { ToggleExample } from "@/components/interactive-examples/toggle-example"
import { FormExample } from "@/components/interactive-examples/form-example"
import { FunctionUpdateExample } from "@/components/interactive-examples/function-update-example"
import { ObjectStateExample } from "@/components/interactive-examples/object-state-example"
import { ArrayStateExample } from "@/components/interactive-examples/array-state-example"

export default function UseStatePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">useState 钩子</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 useState？</CardTitle>
            <CardDescription>useState 是 React 的一个内置钩子，它允许你在函数组件中添加状态。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 React 中，组件的状态是指随时间变化并且会影响组件渲染的数据。
              <code>useState</code> 钩子是 React 提供的一种在函数组件中管理状态的方法。
              它返回一个状态值和一个更新该状态的函数。
            </p>
            <CodeBlock language="tsx">{`import { useState } from 'react';

function Counter() {
  // 声明一个名为 "count" 的状态变量，初始值为 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useState 基本语法</CardTitle>
            <CardDescription>了解如何声明和使用状态变量。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>useState</code> 钩子的基本语法如下：
            </p>
            <CodeBlock language="tsx">{`// 基本语法
const [state, setState] = useState(initialState);

// 使用示例
const [name, setName] = useState('张三');
const [age, setAge] = useState(25);
const [isActive, setIsActive] = useState(true);
const [items, setItems] = useState([1, 2, 3]);
const [user, setUser] = useState({ name: '李四', email: 'lisi@example.com' });`}</CodeBlock>
            <p className="mt-4">这里：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <code>state</code> 是当前状态值
              </li>
              <li>
                <code>setState</code> 是更新状态的函数
              </li>
              <li>
                <code>initialState</code> 是状态的初始值
              </li>
            </ul>
            <p className="mt-4">
              状态更新函数（如 <code>setName</code>
              ）可以接收新的状态值，也可以接收一个函数，该函数接收前一个状态值并返回新的状态值。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 useState 的示例</CardTitle>
            <CardDescription>几个使用 useState 的实际例子。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="counter">
              <TabsList className="mb-4">
                <TabsTrigger value="counter">计数器</TabsTrigger>
                <TabsTrigger value="form">表单</TabsTrigger>
                <TabsTrigger value="toggle">切换开关</TabsTrigger>
              </TabsList>
              <TabsContent value="counter">
                <CodeBlock language="tsx">{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  const reset = () => {
    setCount(0);
  };
  
  return (
    <div>
      <h1>计数器</h1>
      <p>当前计数: {count}</p>
      <div>
        <button onClick={decrement}>减少</button>
        <button onClick={reset}>重置</button>
        <button onClick={increment}>增加</button>
      </div>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <CounterExample />
                </div>
              </TabsContent>
              <TabsContent value="form">
                <CodeBlock language="tsx">{`import { useState } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    // 处理表单提交...
    alert(\`提交的数据: \${name}, \${email}, \${message}\`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">姓名：</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="email">邮箱：</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="message">留言：</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      
      <button type="submit">提交</button>
    </form>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <FormExample />
                </div>
              </TabsContent>
              <TabsContent value="toggle">
                <CodeBlock language="tsx">{`import { useState } from 'react';

function ToggleButton() {
  const [isOn, setIsOn] = useState(false);
  
  const toggle = () => {
    setIsOn(!isOn);
  };
  
  return (
    <div>
      <button 
        onClick={toggle}
        style={{
          backgroundColor: isOn ? 'green' : 'red',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none'
        }}
      >
        {isOn ? '开' : '关'}
      </button>
      <p>当前状态: {isOn ? '开启' : '关闭'}</p>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <ToggleExample />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>函数式更新</CardTitle>
            <CardDescription>使用函数式方法更新状态，特别是当新状态基于之前的状态时。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              当新的状态值依赖于之前的状态值时，推荐使用函数式更新。这可以避免由于 React 的批处理更新机制导致的问题。
            </p>
            <Tabs defaultValue="problem">
              <TabsList className="mb-4">
                <TabsTrigger value="problem">问题示例</TabsTrigger>
                <TabsTrigger value="solution">函数式更新解决方案</TabsTrigger>
              </TabsList>
              <TabsContent value="problem">
                <CodeBlock language="tsx">{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // 这种方式可能有问题
  const incrementThreeTimes = () => {
    setCount(count + 1); // 基于当前的 count
    setCount(count + 1); // 仍然基于相同的 count
    setCount(count + 1); // 仍然基于相同的 count
    // 结果只会 +1，而不是 +3
  };
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={incrementThreeTimes}>+3</button>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="solution">
                <CodeBlock language="tsx">{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // 使用函数式更新
  const incrementThreeTimes = () => {
    setCount(prevCount => prevCount + 1); // 基于最新的状态
    setCount(prevCount => prevCount + 1); // 基于上一次更新后的状态
    setCount(prevCount => prevCount + 1); // 基于上一次更新后的状态
    // 结果会 +3
  };
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={incrementThreeTimes}>+3</button>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
              <FunctionUpdateExample />
            </div>

            <p className="mt-4">函数式更新适用于以下情况：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>新状态依赖于之前的状态</li>
              <li>在同一个事件处理函数中多次更新同一个状态</li>
              <li>处理异步操作中的状态更新</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用对象和数组状态</CardTitle>
            <CardDescription>管理对象和数组类型的状态。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              使用 <code>useState</code> 管理对象和数组类型的状态需要特别注意，因为 React
              使用浅比较来决定是否重新渲染组件。
            </p>
            <Tabs defaultValue="object">
              <TabsList className="mb-4">
                <TabsTrigger value="object">对象状态</TabsTrigger>
                <TabsTrigger value="array">数组状态</TabsTrigger>
              </TabsList>
              <TabsContent value="object">
                <CodeBlock language="tsx">{`import { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });
  
  // 错误方式：直接修改状态对象
  const updateWrong = () => {
    user.preferences.theme = 'dark'; // 直接修改状态
    setUser(user); // 这不会触发重新渲染，因为引用没有改变
  };
  
  // 正确方式：创建新对象
  const updateCorrect = () => {
    setUser({
      ...user, // 复制所有现有属性
      preferences: {
        ...user.preferences, // 复制所有现有偏好
        theme: 'dark' // 只更新主题
      }
    });
  };
  
  return (
    <div>
      <h1>用户信息</h1>
      <p>姓名: {user.name}</p>
      <p>邮箱: {user.email}</p>
      <p>主题: {user.preferences.theme}</p>
      <p>通知: {user.preferences.notifications ? '开启' : '关闭'}</p>
      <button onClick={updateCorrect}>切换到暗色主题</button>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <ObjectStateExample />
                </div>
              </TabsContent>
              <TabsContent value="array">
                <CodeBlock language="tsx">{`import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React', completed: false },
    { id: 2, text: '完成项目', completed: false }
  ]);
  
  // 添加新待办事项
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]); // 创建新数组
  };
  
  // 切换待办事项的完成状态
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // 删除待办事项
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <h1>待办事项列表</h1>
      <input
        type="text"
        placeholder="添加新待办..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            addTodo(e.target.value.trim());
            e.target.value = '';
          }
        }}
      />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <ArrayStateExample />
                </div>
              </TabsContent>
            </Tabs>
            <p className="mt-4 text-muted-foreground">
              注意：当处理复杂的状态逻辑时，考虑使用 <code>useReducer</code>{" "}
              钩子，它更适合管理包含多个子值的复杂状态对象。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>延迟初始化</CardTitle>
            <CardDescription>优化昂贵的初始状态计算。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              如果初始状态的计算比较昂贵，可以传递一个函数给 <code>useState</code>
              ，这个函数将只在组件的初始渲染时被调用。
            </p>
            <CodeBlock language="tsx">{`import { useState } from 'react';

function ExpensiveInitComponent() {
  // 不好的方式：每次渲染都会执行昂贵计算
  // const initialState = expensiveCalculation();
  // const [state, setState] = useState(initialState);
  
  // 好的方式：只在初始渲染时执行昂贵计算
  const [state, setState] = useState(() => {
    console.log('执行昂贵的初始状态计算...');
    // 假设这是一个昂贵的计算
    return expensiveCalculation();
  });
  
  return (
    <div>
      <p>状态值: {state}</p>
      <button onClick={() => setState(state + 1)}>更新状态</button>
    </div>
  );
}

// 模拟昂贵的计算
function expensiveCalculation() {
  // 在实际应用中，这可能是处理大量数据或复杂逻辑的函数
  console.log('执行昂贵计算...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result;
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>常见陷阱和最佳实践</CardTitle>
            <CardDescription>使用 useState 时的一些常见问题和最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>状态更新是异步的</strong>：React
                可能会批量处理状态更新，因此在调用状态更新函数后，不能立即读取新的状态值。如果需要基于新状态执行操作，使用{" "}
                <code>useEffect</code> 或者回调函数。
              </li>
              <li>
                <strong>使用多个状态变量</strong>：对于不相关的状态逻辑，使用多个 <code>useState</code>{" "}
                调用，而不是将所有状态合并到一个对象中。
              </li>
              <li>
                <strong>不要在循环、条件或嵌套函数中调用 useState</strong>：React 依赖于 Hooks
                的调用顺序来正确跟踪状态，所以 Hooks 必须总是在组件的顶层调用。
              </li>
              <li>
                <strong>保持状态最小化</strong>
                ：只将真正需要的数据存储在状态中，可以从状态中导出的值不需要存储在状态中。
              </li>
              <li>
                <strong>适当拆分状态</strong>：当状态逻辑变得复杂时，考虑将其拆分为多个独立的状态变量，或者使用{" "}
                <code>useReducer</code>。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 不好的方式：在条件语句中使用 useState
function BadComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // 错误：不能在条件语句中使用 Hooks
  }
  
  return <div>...</div>;
}

// 好的方式：在组件顶层使用 useState
function GoodComponent({ condition }) {
  const [state, setState] = useState(0); // 正确：总是在顶层调用 Hooks
  
  // 在组件内部可以有条件地使用状态
  return (
    <div>
      {condition && <p>状态值: {state}</p>}
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
