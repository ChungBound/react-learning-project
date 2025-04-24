"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"

export default function PropsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Props 属性</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 Props？</CardTitle>
            <CardDescription>Props 是 React 组件间传递数据的方式，它们是组件的输入。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Props（属性）是 React
              中用于组件之间通信的核心机制。它们是从父组件传递给子组件的数据，使子组件能够根据这些数据调整其行为和外观。
              Props 是只读的，子组件不能直接修改它们，这有助于保持应用中的数据流向清晰。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>基础用法</CardTitle>
            <CardDescription>传递和接收 Props 的基本方式。</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`// 定义一个接收 props 的组件
function Greeting({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h1>你好，{name}！</h1>
      <p>你今年 {age} 岁了。</p>
    </div>
  );
}

// 使用组件并传递 props
function App() {
  return (
    <div>
      <Greeting name="小明" age={25} />
      <Greeting name="小红" age={23} />
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">
              在上面的例子中，<code>name</code> 和 <code>age</code> 是传递给 <code>Greeting</code> 组件的
              props。组件通过解构参数接收这些 props，并在渲染中使用它们。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props 类型</CardTitle>
            <CardDescription>在 TypeScript 中为 Props 定义类型。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">使用 TypeScript 可以为组件的 props 定义明确的类型，提供更好的开发体验和类型安全性。</p>
            <Tabs defaultValue="inline">
              <TabsList className="mb-4">
                <TabsTrigger value="inline">内联类型</TabsTrigger>
                <TabsTrigger value="interface">接口</TabsTrigger>
                <TabsTrigger value="type">类型别名</TabsTrigger>
              </TabsList>
              <TabsContent value="inline">
                <CodeBlock language="tsx">{`// 使用内联类型
function UserCard({ name, email, isActive }: { 
  name: string; 
  email: string; 
  isActive: boolean 
}) {
  return (
    <div className={isActive ? "active-card" : "inactive-card"}>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>状态: {isActive ? "在线" : "离线"}</span>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="interface">
                <CodeBlock language="tsx">{`// 使用接口定义 props 类型
interface UserCardProps {
  name: string;
  email: string;
  isActive: boolean;
}

function UserCard({ name, email, isActive }: UserCardProps) {
  return (
    <div className={isActive ? "active-card" : "inactive-card"}>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>状态: {isActive ? "在线" : "离线"}</span>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="type">
                <CodeBlock language="tsx">{`// 使用类型别名定义 props 类型
type UserCardProps = {
  name: string;
  email: string;
  isActive: boolean;
};

function UserCard({ name, email, isActive }: UserCardProps) {
  return (
    <div className={isActive ? "active-card" : "inactive-card"}>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>状态: {isActive ? "在线" : "离线"}</span>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>默认 Props</CardTitle>
            <CardDescription>为组件的 props 设置默认值。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">可以为组件的 props 设置默认值，这样在没有传递特定 prop 时，组件将使用默认值。</p>
            <Tabs defaultValue="es6">
              <TabsList className="mb-4">
                <TabsTrigger value="es6">ES6 解构默认值</TabsTrigger>
                <TabsTrigger value="defaultProps">defaultProps</TabsTrigger>
              </TabsList>
              <TabsContent value="es6">
                <CodeBlock language="tsx">{`// 使用 ES6 解构赋值设置默认值
function Button({ 
  text = "点击", 
  color = "blue", 
  size = "medium", 
  onClick 
}: { 
  text?: string; 
  color?: string; 
  size?: "small" | "medium" | "large"; 
  onClick: () => void;
}) {
  return (
    <button 
      className={\`btn btn-\${size} btn-\${color}\`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="defaultProps">
                <CodeBlock language="tsx">{`// 使用 defaultProps 设置默认值
interface ButtonProps {
  text: string;
  color: string;
  size: "small" | "medium" | "large";
  onClick: () => void;
}

function Button({ text, color, size, onClick }: ButtonProps) {
  return (
    <button 
      className={\`btn btn-\${size} btn-\${color}\`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "点击",
  color: "blue",
  size: "medium"
};`}</CodeBlock>
              </TabsContent>
            </Tabs>
            <p className="mt-4 text-muted-foreground">
              注意：在 TypeScript 中使用 ES6 解构默认值时，需要将相应的 prop 类型标记为可选的（使用 <code>?</code>{" "}
              符号）。 使用 <code>defaultProps</code> 的方式在新的 React 版本中不再推荐，推荐使用解构默认值的方式。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>children Props</CardTitle>
            <CardDescription>使用 children prop 组合组件。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>children</code> 是一个特殊的 prop，它允许组件接收嵌套内容。这是 React 组合模式的基础。
            </p>
            <CodeBlock language="tsx">{`// 一个简单的容器组件
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// 使用 Card 组件
function App() {
  return (
    <div>
      <Card title="欢迎">
        <p>这是卡片内容。</p>
        <button>点击我</button>
      </Card>
      
      <Card title="用户信息">
        <ul>
          <li>姓名: 张三</li>
          <li>年龄: 30</li>
          <li>职业: 工程师</li>
        </ul>
      </Card>
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">
              在这个例子中，<code>Card</code> 组件接收 <code>children</code> prop，它包含所有嵌套在组件标签之间的内容。
              这使得 <code>Card</code> 组件可以灵活地包装各种内容，提高了组件的可复用性。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props 解构与展开</CardTitle>
            <CardDescription>使用解构和展开语法简化 props 处理。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="destructuring">
              <TabsList className="mb-4">
                <TabsTrigger value="destructuring">解构 Props</TabsTrigger>
                <TabsTrigger value="spreading">展开 Props</TabsTrigger>
              </TabsList>
              <TabsContent value="destructuring">
                <CodeBlock language="tsx">{`// 使用解构简化 props 访问
function UserProfile({ name, email, avatar }: { 
  name: string; 
  email: string; 
  avatar: string;
}) {
  return (
    <div className="profile">
      <img src={avatar || "/placeholder.svg"} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// 不使用解构
function UserProfile(props: { 
  name: string; 
  email: string; 
  avatar: string;
}) {
  return (
    <div className="profile">
      <img src={props.avatar || "/placeholder.svg"} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="spreading">
                <CodeBlock language="tsx">{`// 使用展开语法传递 props
interface UserData {
  name: string;
  email: string;
  avatar: string;
}

function UserAvatar({ avatar, name }: { avatar: string; name: string }) {
  return <img src={avatar || "/placeholder.svg"} alt={name} className="avatar" />;
}

function UserInfo({ name, email }: { name: string; email: string }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

function UserProfile(props: UserData) {
  return (
    <div className="profile">
      <UserAvatar {...props} />
      <UserInfo {...props} />
    </div>
  );
}

// 使用组件
function App() {
  const userData = {
    name: "李四",
    email: "lisi@example.com",
    avatar: "/images/lisi.jpg"
  };
  
  return <UserProfile {...userData} />;
}`}</CodeBlock>
                <p className="mt-4 text-muted-foreground">
                  注意：虽然展开语法很方便，但过度使用可能会导致组件接收不必要的 props，或者使得组件间的数据流不够明确。
                  建议谨慎使用展开语法，尤其是在传递来自外部的对象时。
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Props 验证与必要性</CardTitle>
            <CardDescription>使用 TypeScript 验证 props 并标记必要性。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">TypeScript 可以帮助我们验证 props 的类型，并标记哪些 props 是必需的，哪些是可选的。</p>
            <CodeBlock language="tsx">{`// 使用 TypeScript 定义必需和可选的 props
interface ArticleProps {
  title: string;           // 必需
  content: string;         // 必需
  author: string;          // 必需
  publishDate: Date;       // 必需
  tags?: string[];         // 可选
  commentCount?: number;   // 可选
  onLike?: () => void;     // 可选
}

function Article({
  title,
  content,
  author,
  publishDate,
  tags = [],
  commentCount = 0,
  onLike
}: ArticleProps) {
  return (
    <article>
      <h1>{title}</h1>
      <p>作者: {author}</p>
      <p>发布日期: {publishDate.toLocaleDateString()}</p>
      
      <div className="content">{content}</div>
      
      {tags.length > 0 && (
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      <div className="footer">
        <span>评论: {commentCount}</span>
        {onLike && (
          <button onClick={onLike}>点赞</button>
        )}
      </div>
    </article>
  );
}`}</CodeBlock>
            <p className="mt-4">
              在这个例子中，我们使用 TypeScript 接口定义了 <code>ArticleProps</code>，其中：
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <code>title</code>, <code>content</code>, <code>author</code>, <code>publishDate</code> 是必需的
              </li>
              <li>
                <code>tags</code>, <code>commentCount</code>, <code>onLike</code> 是可选的 (使用 <code>?</code> 标记)
              </li>
              <li>对于可选 props，我们在解构时提供默认值</li>
              <li>
                对于可选的函数 props 如 <code>onLike</code>，我们在使用前检查它是否存在
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>使用 Props 的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>保持 Props 简单</strong>：每个组件应该只接收它需要的 props。如果一个组件需要大量的
                props，可能需要考虑将它拆分为更小的组件。
              </li>
              <li>
                <strong>使用解构</strong>：使用解构语法使得 props 的使用更加清晰。
              </li>
              <li>
                <strong>提供默认值</strong>：为可选的 props 提供合理的默认值，减少使用组件时的配置负担。
              </li>
              <li>
                <strong>使用 TypeScript</strong>：使用 TypeScript 定义 props 的类型，提供更好的开发体验和类型安全性。
              </li>
              <li>
                <strong>避免过度使用展开语法</strong>：虽然展开语法很方便，但过度使用可能会使组件接收不必要的
                props，或者使得组件间的数据流不够明确。
              </li>
              <li>
                <strong>命名约定</strong>：使用清晰的名称，对于处理事件的 props，使用 "on" 前缀 (如 <code>onClick</code>
                , <code>onSubmit</code>)。
              </li>
              <li>
                <strong>Props 不可变性</strong>：不要在组件内部修改 props。如果需要基于 props 的值进行修改，使用 state。
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
