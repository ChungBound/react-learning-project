"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"

export default function ParentToChildPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">父组件向子组件传值</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>使用 Props 传递数据</CardTitle>
            <CardDescription>
              在 React 中，父组件通过 props 向子组件传递数据，这是最基本的组件通信方式。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Props 是从父组件传递到子组件的数据。子组件通过参数接收这些 props，并可以在其渲染逻辑中使用它们。
            </p>

            <CodeBlock language="tsx">{`// 子组件
function ChildComponent({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h2>子组件</h2>
      <p>名字: {name}</p>
      <p>年龄: {age}</p>
    </div>
  );
}

// 父组件
function ParentComponent() {
  const userName = "张三";
  const userAge = 30;
  
  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent name={userName} age={userAge} />
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>传递复杂数据</CardTitle>
            <CardDescription>Props 可以是任何 JavaScript 数据类型，包括对象、数组和函数。</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`// 定义用户类型
type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

// 子组件
function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <h2>{user.name}的资料</h2>
      <p>邮箱: {user.email}</p>
      <p>状态: {user.isActive ? '在线' : '离线'}</p>
    </div>
  );
}

// 父组件
function UserDashboard() {
  const userData: User = {
    id: 1,
    name: "李四",
    email: "lisi@example.com",
    isActive: true
  };
  
  return (
    <div>
      <h1>用户仪表板</h1>
      <UserProfile user={userData} />
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>传递多个 Props</CardTitle>
            <CardDescription>你可以向子组件传递任意数量的 props。</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`// 子组件接收多个 props
function ProductCard({ 
  name, 
  price, 
  description, 
  inStock, 
  imageUrl 
}: { 
  name: string; 
  price: number; 
  description: string; 
  inStock: boolean; 
  imageUrl: string;
}) {
  return (
    <div className="product-card">
      <img src={imageUrl || "/placeholder.svg"} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>价格: ¥{price}</p>
      <p>{inStock ? '有货' : '缺货'}</p>
    </div>
  );
}

// 父组件传递多个 props
function ProductList() {
  return (
    <div>
      <h1>产品列表</h1>
      <ProductCard 
        name="智能手机" 
        price={2999} 
        description="最新款智能手机，性能强劲" 
        inStock={true} 
        imageUrl="/images/phone.jpg" 
      />
      <ProductCard 
        name="笔记本电脑" 
        price={5999} 
        description="轻薄笔记本，续航持久" 
        inStock={false} 
        imageUrl="/images/laptop.jpg" 
      />
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用解构赋值简化 Props</CardTitle>
            <CardDescription>使用 JavaScript 的解构赋值语法可以使 props 的使用更加简洁。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="without">
              <TabsList className="mb-4">
                <TabsTrigger value="without">不使用解构</TabsTrigger>
                <TabsTrigger value="with">使用解构</TabsTrigger>
              </TabsList>
              <TabsContent value="without">
                <CodeBlock language="tsx">{`// 不使用解构赋值
function Greeting(props: { name: string; greeting: string }) {
  return (
    <div>
      <h1>{props.greeting}, {props.name}!</h1>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="with">
                <CodeBlock language="tsx">{`// 使用解构赋值
function Greeting({ name, greeting }: { name: string; greeting: string }) {
  return (
    <div>
      <h1>{greeting}, {name}!</h1>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>默认 Props 值</CardTitle>
            <CardDescription>你可以为组件的 props 设置默认值，以防父组件没有提供这些值。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="destructuring">
              <TabsList className="mb-4">
                <TabsTrigger value="destructuring">使用解构默认值</TabsTrigger>
                <TabsTrigger value="defaultProps">使用 defaultProps</TabsTrigger>
              </TabsList>
              <TabsContent value="destructuring">
                <CodeBlock language="tsx">{`// 使用解构赋值设置默认值
function Button({ 
  text = "点击", 
  color = "blue", 
  disabled = false 
}: { 
  text?: string; 
  color?: string; 
  disabled?: boolean;
}) {
  return (
    <button 
      style={{ backgroundColor: color }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// 使用示例
function App() {
  return (
    <div>
      <Button />  {/* 使用所有默认值 */}
      <Button text="提交" />  {/* 覆盖 text，使用其他默认值 */}
      <Button text="保存" color="green" />  {/* 覆盖多个默认值 */}
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="defaultProps">
                <CodeBlock language="tsx">{`// 使用 defaultProps 设置默认值
function Button({ 
  text, 
  color, 
  disabled 
}: { 
  text: string; 
  color: string; 
  disabled: boolean;
}) {
  return (
    <button 
      style={{ backgroundColor: color }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// 设置默认 props
Button.defaultProps = {
  text: "点击",
  color: "blue",
  disabled: false
};

// 使用示例
function App() {
  return (
    <div>
      <Button />  {/* 使用所有默认值 */}
      <Button text="提交" />  {/* 覆盖 text，使用其他默认值 */}
      <Button text="保存" color="green" />  {/* 覆盖多个默认值 */}
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
            <p className="mt-4 text-muted-foreground">
              注意：虽然 defaultProps 仍然有效，但在使用 TypeScript 和函数组件时，
              推荐使用解构赋值的默认值方式，因为它与 TypeScript 的类型系统更好地集成。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props 的不可变性</CardTitle>
            <CardDescription>在 React 中，props 是只读的，子组件不应该修改接收到的 props。</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`// 错误示例：尝试修改 props
function Counter({ count }: { count: number }) {
  // 错误！不应该修改 props
  count = count + 1;  // 这会导致错误
  
  return <div>{count}</div>;
}

// 正确示例：使用 state 来管理可变数据
import { useState, useEffect } from 'react';

function Counter({ initialCount }: { initialCount: number }) {
  // 正确！使用 state 来存储可变数据
  const [count, setCount] = useState(initialCount);
  
  // 当 initialCount 变化时更新 count
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4 text-muted-foreground">
              Props 的不可变性是 React 单向数据流的重要部分。如果需要基于 props 修改数据， 应该在组件内部使用
              state，或者通过回调函数通知父组件进行更改。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
