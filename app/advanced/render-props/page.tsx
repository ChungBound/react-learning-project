"use client";

import React, { useState, JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/code-block";

// 示例组件：鼠标位置追踪器
function MouseTracker({
  render,
}: {
  render: (position: { x: number; y: number }) => JSX.Element;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      className="p-4 border rounded-md h-40 flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {render(position)}
    </div>
  );
}

// 使用 MouseTracker 的示例
function MouseTrackerExample() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div className="text-center">
          <p>鼠标位置：</p>
          <p>
            X: {x}, Y: {y}
          </p>
        </div>
      )}
    />
  );
}

export default function RenderPropsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Render Props 模式</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 Render Props？</CardTitle>
            <CardDescription>
              Render Props 是一种在 React 组件之间共享代码的技术。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Render Props 是指一种在 React 组件之间使用一个值为函数的 prop
              共享代码的简单技术。具体来说，一个组件接收一个函数
              prop，这个函数返回一个 React
              元素，组件则调用这个函数而不是实现自己的渲染逻辑。
            </p>
            <p className="mb-4">
              这种模式的名称来源于这样一个事实：组件不是通过自己的 JSX
              或渲染方法来实现 UI，而是通过调用一个作为 prop
              传入的函数来渲染内容。
            </p>
            <CodeBlock language="tsx">{`// Render Props 的基本结构
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>

// 或者使用 children 作为函数
<DataProvider>
  {data => (
    <h1>Hello {data.target}</h1>
  )}
</DataProvider>`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Render Props 的工作原理</CardTitle>
            <CardDescription>
              了解 Render Props 如何实现组件间的代码共享。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Render Props 的核心思想是将渲染逻辑作为一个函数 prop
              传递给组件，让组件决定何时调用这个函数，以及传递什么参数给这个函数。
            </p>
            <CodeBlock language="tsx">{`// 一个使用 Render Props 的组件
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {/* 调用 render prop，传入当前状态 */}
      {render(position)}
    </div>
  );
}

// 使用 MouseTracker 组件
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <p>鼠标位置：({x}, {y})</p>
      )}
    />
  );
}`}</CodeBlock>
            <p className="mt-4">
              在上面的例子中，<code>MouseTracker</code>{" "}
              组件负责跟踪鼠标位置，并通过调用 <code>render</code>{" "}
              函数将这些数据传递给使用它的组件。这样，使用{" "}
              <code>MouseTracker</code> 的组件可以决定如何渲染鼠标位置数据。
            </p>
            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                实时示例：
              </h4>
              <MouseTrackerExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Render Props 的常见用途</CardTitle>
            <CardDescription>
              了解 Render Props 的主要应用场景。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Render Props 通常用于以下场景：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>共享状态或行为，同时允许不同的渲染方式</li>
              <li>抽象复杂的逻辑，如数据获取、表单处理等</li>
              <li>创建可复用的 UI 模式，如弹窗、下拉菜单等</li>
              <li>实现横切关注点，如权限控制、主题等</li>
            </ul>

            <Tabs defaultValue="toggle">
              <TabsList className="mb-4">
                <TabsTrigger value="toggle">切换状态</TabsTrigger>
                <TabsTrigger value="fetch">数据获取</TabsTrigger>
                <TabsTrigger value="form">表单处理</TabsTrigger>
              </TabsList>
              <TabsContent value="toggle">
                <CodeBlock language="tsx">{`// 切换状态组件
function Toggle({ render }) {
  const [on, setOn] = useState(false);
  
  const toggle = () => setOn(!on);
  
  return render({ on, toggle });
}

// 使用 Toggle 组件
function App() {
  return (
    <Toggle
      render={({ on, toggle }) => (
        <div>
          <button onClick={toggle}>
            {on ? '关闭' : '打开'}
          </button>
          <div>
            {on && <p>内容已显示</p>}
          </div>
        </div>
      )}
    />
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="fetch">
                <CodeBlock language="tsx">{`// 数据获取组件
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading, error });
}

// 使用 DataFetcher 组件
function App() {
  return (
    <DataFetcher
      url="https://api.example.com/data"
      render={({ data, loading, error }) => {
        if (loading) return <p>加载中...</p>;
        if (error) return <p>错误：{error.message}</p>;
        
        return (
          <ul>
            {data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        );
      }}
    />
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="form">
                <CodeBlock language="tsx">{`// 表单处理组件
function Form({ initialValues, onSubmit, render }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 简单验证
    const newErrors = {};
    Object.keys(values).forEach(key => {
      if (!values[key]) {
        newErrors[key] = '此字段是必填的';
      }
    });
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(newErrors);
    }
  };
  
  return render({
    values,
    errors,
    handleChange,
    handleSubmit
  });
}

// 使用 Form 组件
function App() {
  return (
    <Form
      initialValues={{ username: '', password: '' }}
      onSubmit={values => console.log('提交表单', values)}
      render={({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>用户名：</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          
          <div>
            <label>密码：</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          
          <button type="submit">登录</button>
        </form>
      )}
    />
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 children 作为函数</CardTitle>
            <CardDescription>另一种实现 Render Props 的方式。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              除了使用名为 <code>render</code> 的 prop 外，还可以使用{" "}
              <code>children</code> prop 作为函数，这也是一种常见的 Render Props
              模式。
            </p>
            <CodeBlock language="tsx">{`// 使用 children 作为函数
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {/* 调用 children 函数，传入当前状态 */}
      {children(position)}
    </div>
  );
}

// 使用 MouseTracker 组件
function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <p>鼠标位置：({x}, {y})</p>
      )}
    </MouseTracker>
  );
}`}</CodeBlock>
            <p className="mt-4">
              使用 <code>children</code> 作为函数的好处是语法更简洁，特别是在
              JSX
              中嵌套多个组件时。但这种方式可能会让不熟悉这种模式的开发者感到困惑，因为通常{" "}
              <code>children</code> 是用来传递 JSX 元素的。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Render Props vs 高阶组件</CardTitle>
            <CardDescription>比较 Render Props 和高阶组件。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Render Props 和高阶组件（HOC）都是用于在 React
              组件之间复用代码的技术，但它们有不同的优缺点：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Render Props</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>使用函数作为 prop</li>
                  <li>更直接的数据流</li>
                  <li>避免了 HOC 的命名冲突问题</li>
                  <li>可以在 JSX 中动态传递参数</li>
                  <li>可能导致回调地狱</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`<MouseTracker>
  {({ x, y }) => (
    <p>鼠标位置：({x}, {y})</p>
  )}
</MouseTracker>`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">高阶组件</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>使用组件包装</li>
                  <li>可能导致 props 命名冲突</li>
                  <li>难以追踪 props 的来源</li>
                  <li>组合多个 HOC 更简单</li>
                  <li>可能导致组件嵌套地狱</li>
                </ul>
                <CodeBlock
                  language="tsx"
                  className="mt-2"
                >{`const EnhancedComponent = withMouse(MyComponent);

<EnhancedComponent />`}</CodeBlock>
              </div>
            </div>
            <p className="mt-4">
              在实际开发中，可以根据具体需求选择合适的模式。通常，如果需要在渲染时动态决定渲染内容，Render
              Props
              可能更合适；如果需要在组件外部增强组件功能，高阶组件可能更合适。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Render Props vs Hooks</CardTitle>
            <CardDescription>
              比较 Render Props 和 React Hooks。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              随着 React Hooks 的引入，一些传统上使用 Render Props
              解决的问题现在可以用 Hooks 更简洁地解决。下面比较两种方法：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Render Props</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>基于组件的代码复用</li>
                  <li>可能导致嵌套地狱</li>
                  <li>需要额外的组件实例</li>
                  <li>更明确的数据流</li>
                  <li>适合复杂的 UI 逻辑</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`<MouseTracker>
  {({ x, y }) => (
    <p>鼠标位置：({x}, {y})</p>
  )}
</MouseTracker>`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">React Hooks</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>基于函数的代码复用</li>
                  <li>避免了嵌套地狱</li>
                  <li>不需要额外的组件实例</li>
                  <li>可能导致 Hook 调用顺序问题</li>
                  <li>适合简单的状态逻辑</li>
                </ul>
                <CodeBlock
                  language="tsx"
                  className="mt-2"
                >{`function Component() {
  const { x, y } = useMouse();
  return <p>鼠标位置：({x}, {y})</p>;
}`}</CodeBlock>
              </div>
            </div>
            <p className="mt-4">
              在现代 React 开发中，Hooks
              通常是首选的解决方案，因为它们更简洁、更灵活。但在某些复杂场景下，Render
              Props 仍然有其价值，特别是在处理复杂的 UI 交互和组件组合时。
            </p>
            <p className="mt-2">
              最佳实践是：优先考虑使用 Hooks，当 Hooks
              不足以解决问题时，再考虑使用 Render Props。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
