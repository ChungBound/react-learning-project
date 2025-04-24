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
import { useState } from "react";

// 示例HOC组件
function withLoading<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithLoading(props: T & { isLoading?: boolean }) {
    const [isLoading, setIsLoading] = useState(props.isLoading || false);

    // 模拟加载完成
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return isLoading ? (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2">加载中...</p>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
}

interface User {
  name: string;
  email: string;
  role: string;
}

// 基础组件
function UserProfile({ user }: { user: User }) {
  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">{user.name}</h3>
      <p className="text-sm text-muted-foreground">邮箱: {user.email}</p>
      <p className="text-sm text-muted-foreground">角色: {user.role}</p>
    </div>
  );
}

// 使用HOC增强的组件
const UserProfileWithLoading = withLoading(UserProfile);

export default function HocPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">高阶组件 (HOC)</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是高阶组件？</CardTitle>
            <CardDescription>
              高阶组件是一种基于 React 组合特性的高级技术。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              高阶组件（Higher-Order Component，简称 HOC）是 React
              中用于复用组件逻辑的高级技术。HOC 本身不是 React API
              的一部分，它是一种基于 React 组合特性而形成的设计模式。
            </p>
            <p className="mb-4">
              具体而言，高阶组件是一个函数，它接收一个组件作为参数，并返回一个新的增强组件。HOC
              不会修改输入组件，也不会使用继承来复制其行为。相反，HOC
              通过将组件包装在容器组件中来组合新组件。
            </p>
            <CodeBlock language="tsx">{`// 高阶组件的基本结构
function withSomething(WrappedComponent) {
  // 返回一个新的组件
  return function(props) {
    // 可以添加新的逻辑、状态或属性
    const newProps = { ...props, somethingNew: 'value' };
    
    // 渲染被包装的组件，传入新的 props
    return <WrappedComponent {...newProps} />;
  };
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>高阶组件的常见用途</CardTitle>
            <CardDescription>了解高阶组件的主要应用场景。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">高阶组件通常用于以下场景：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>代码复用：提取多个组件共用的逻辑</li>
              <li>状态抽象和管理：添加状态和生命周期方法</li>
              <li>props 操作：添加、修改或过滤 props</li>
              <li>渲染劫持：控制组件的渲染过程</li>
              <li>分离关注点：将业务逻辑与 UI 组件分离</li>
            </ul>

            <Tabs defaultValue="loading">
              <TabsList className="mb-4">
                <TabsTrigger value="loading">加载状态</TabsTrigger>
                <TabsTrigger value="auth">权限控制</TabsTrigger>
                <TabsTrigger value="data">数据获取</TabsTrigger>
              </TabsList>
              <TabsContent value="loading">
                <CodeBlock language="tsx">{`// 加载状态高阶组件
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <div>加载中...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// 使用高阶组件
const UserListWithLoading = withLoading(UserList);

// 在父组件中使用
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);
  
  return <UserListWithLoading isLoading={isLoading} users={users} />;
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="auth">
                <CodeBlock language="tsx">{`// 权限控制高阶组件
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { isAuthenticated, user } = useAuth(); // 假设有一个 useAuth 钩子
    
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    if (props.requiredRole && !user.roles.includes(props.requiredRole)) {
      return <div>权限不足</div>;
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// 使用高阶组件
const AdminDashboardWithAuth = withAuth(AdminDashboard);

// 在路由中使用
function Routes() {
  return (
    <Switch>
      <Route path="/admin">
        <AdminDashboardWithAuth requiredRole="admin" />
      </Route>
    </Switch>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="data">
                <CodeBlock language="tsx">{`// 数据获取高阶组件
function withData(WrappedComponent, fetchData) {
  return function WithData(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      fetchData()
        .then(result => {
          setData(result);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, []);
    
    if (loading) return <div>加载中...</div>;
    if (error) return <div>错误: {error.message}</div>;
    
    return <WrappedComponent data={data} {...props} />;
  };
}

// 使用高阶组件
const UserListWithData = withData(UserList, fetchUsers);
const ProductListWithData = withData(ProductList, fetchProducts);

// 在父组件中使用
function App() {
  return (
    <div>
      <UserListWithData />
      <ProductListWithData />
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现一个高阶组件</CardTitle>
            <CardDescription>学习如何创建和使用高阶组件。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              下面我们将实现一个 <code>withLogging</code>{" "}
              高阶组件，它会在组件挂载、更新和卸载时记录日志。
            </p>
            <CodeBlock language="tsx">{`import React, { useEffect } from 'react';

// 创建一个记录组件生命周期的高阶组件
function withLogging(WrappedComponent) {
  // 返回一个新组件
  return function WithLogging(props) {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    
    useEffect(() => {
      // 组件挂载时记录
      console.log(\`[\${componentName}] 已挂载\`);
      
      // 组件卸载时记录
      return () => {
        console.log(\`[\${componentName}] 将卸载\`);
      };
    }, []);
    
    // 组件渲染时记录
    console.log(\`[\${componentName}] 正在渲染\`, props);
    
    // 渲染被包装的组件，传入所有 props
    return <WrappedComponent {...props} />;
  };
}

// 一个简单的组件
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// 使用高阶组件增强 Button
const ButtonWithLogging = withLogging(Button);

// 在父组件中使用
function App() {
  return (
    <div>
      <ButtonWithLogging 
        label="点击我" 
        onClick={() => console.log('按钮被点击')} 
      />
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">
              在上面的例子中，<code>withLogging</code>{" "}
              高阶组件为被包装的组件添加了日志记录功能，而不需要修改原始组件的代码。这展示了高阶组件如何实现关注点分离和代码复用。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>高阶组件的注意事项</CardTitle>
            <CardDescription>使用高阶组件时需要注意的问题。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>不要在渲染方法中使用 HOC</strong>：React 的 diff
                算法使用组件标识来决定是否更新现有子树或丢弃它并挂载新子树。如果渲染方法中返回的组件与前一个渲染中的组件相同，React
                会递归更新子树。如果它们不同，则完全卸载前一个子树。
              </li>
              <li>
                <strong>复制静态方法</strong>：当使用 HOC
                包装组件时，原始组件的静态方法不会自动复制到新组件上。需要手动复制这些方法。
              </li>
              <li>
                <strong>Refs 不会传递</strong>：HOC
                为组件添加了一个容器组件，这意味着新组件没有原始组件的任何静态方法。解决方案是使用
                React.forwardRef API。
              </li>
              <li>
                <strong>包装显示名称以便调试</strong>：HOC 创建的组件会在 React
                开发者工具中显示。为了便于调试，最好使用一个显示名称，表明它是
                HOC 的结果。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 解决静态方法复制问题
function withLogging(WrappedComponent) {
  function WithLogging(props) {
    // ...实现...
  }
  
  // 复制静态方法
  const staticMethods = Object.getOwnPropertyNames(WrappedComponent)
    .filter(name => typeof WrappedComponent[name] === 'function' && name !== 'render')
    .reduce((methods, name) => {
      methods[name] = WrappedComponent[name];
      return methods;
    }, {});
  
  Object.assign(WithLogging, staticMethods);
  
  // 设置显示名称以便调试
  WithLogging.displayName = \`WithLogging(\${WrappedComponent.displayName || WrappedComponent.name || 'Component'})\`;
  
  return WithLogging;
}

// 解决 Refs 不会传递的问题
function withLogging(WrappedComponent) {
  function WithLogging(props, ref) {
    // ...实现...
    return <WrappedComponent {...props} ref={ref} />;
  }
  
  // 使用 forwardRef 传递 refs
  return React.forwardRef(WithLogging);
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>高阶组件 vs Hooks</CardTitle>
            <CardDescription>比较高阶组件和 React Hooks。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              随着 React Hooks
              的引入，一些传统上使用高阶组件解决的问题现在可以用 Hooks
              更简洁地解决。下面比较两种方法：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">高阶组件</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>包装组件，创建新组件</li>
                  <li>使用组合模式</li>
                  <li>可能导致组件嵌套地狱</li>
                  <li>需要额外的组件实例</li>
                  <li>难以传递特定的 props</li>
                  <li>适合复杂的组件逻辑复用</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`// 使用高阶组件
const EnhancedComponent = withSomething(MyComponent);

// 使用
<EnhancedComponent />`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">React Hooks</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>直接在组件内部使用</li>
                  <li>使用函数调用模式</li>
                  <li>避免了嵌套地狱</li>
                  <li>不需要额外的组件实例</li>
                  <li>可以精确控制哪些数据流入组件</li>
                  <li>适合简单的状态逻辑复用</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`// 使用 Hooks
function MyComponent() {
  const something = useSomething();
  return <div>{something}</div>;
}`}</CodeBlock>
              </div>
            </div>
            <p className="mt-4">
              在现代 React 开发中，Hooks
              通常是首选的解决方案，因为它们更简洁、更灵活。但在某些复杂场景下，高阶组件仍然有其价值，特别是在处理横切关注点（如权限控制、数据预取等）时。
            </p>
            <p className="mt-2">
              最佳实践是：优先考虑使用 Hooks，当 Hooks
              不足以解决问题时，再考虑使用高阶组件。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
