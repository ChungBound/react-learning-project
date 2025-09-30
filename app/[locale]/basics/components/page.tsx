"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"

export default function ComponentsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">组件基础</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 React 组件?</CardTitle>
            <CardDescription>组件是 React 应用的构建块，它们是可重用的、独立的代码片段。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              React 组件可以看作是返回 React 元素的 JavaScript 函数或类。组件可以接收输入（称为
              "props"）并返回应该在屏幕上显示的内容。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>函数组件</CardTitle>
            <CardDescription>
              函数组件是最简单的 React 组件形式，它们是接收 props 并返回 React 元素的 JavaScript 函数。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`// 函数组件
function Welcome(props: { name: string }) {
  return <h1>你好, {props.name}</h1>;
}

// 使用箭头函数的函数组件
const Greeting = ({ name }: { name: string }) => {
  return <h1>欢迎, {name}!</h1>;
};

// 使用示例
function App() {
  return (
    <div>
      <Welcome name="小明" />
      <Greeting name="小红" />
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>类组件</CardTitle>
            <CardDescription>类组件是使用 ES6 类语法定义的 React 组件。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              注意：虽然类组件仍然受支持，但 React 团队建议使用函数组件和 Hooks 来编写新代码。
            </p>
            <CodeBlock language="tsx">{`import React from 'react';

// 类组件
class Welcome extends React.Component<{ name: string }> {
  render() {
    return <h1>你好, {this.props.name}</h1>;
  }
}

// 使用示例
function App() {
  return <Welcome name="小明" />;
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>组件组合</CardTitle>
            <CardDescription>
              组件可以在其输出中引用其他组件，这使我们可以使用同一组件抽象来构建任何级别的复杂 UI。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`// 按钮组件
function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {text}
    </button>
  );
}

// 用户信息组件
function UserInfo({ name, email }: { name: string; email: string }) {
  return (
    <div className="border p-4 rounded">
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// 组合这些组件的页面组件
function ProfilePage() {
  const handleLogout = () => {
    console.log('用户登出');
  };

  return (
    <div>
      <h1>用户资料</h1>
      <UserInfo name="张三" email="zhangsan@example.com" />
      <div className="mt-4">
        <Button text="登出" onClick={handleLogout} />
      </div>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>组件拆分</CardTitle>
            <CardDescription>将大型组件拆分为更小、更可管理的部分是 React 开发的最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="before">
              <TabsList className="mb-4">
                <TabsTrigger value="before">拆分前</TabsTrigger>
                <TabsTrigger value="after">拆分后</TabsTrigger>
              </TabsList>
              <TabsContent value="before">
                <CodeBlock language="tsx">{`// 一个大型组件
function UserDashboard({ user }: { user: { name: string; email: string; posts: { title: string; content: string }[] } }) {
  return (
    <div>
      <div className="header">
        <h1>欢迎, {user.name}</h1>
        <p>{user.email}</p>
        <button>编辑资料</button>
        <button>登出</button>
      </div>
      
      <div className="content">
        <h2>你的文章</h2>
        <div className="posts">
          {user.posts.map((post, index) => (
            <div key={index} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="actions">
                <button>编辑</button>
                <button>删除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="after">
                <CodeBlock language="tsx">{`// 用户头部组件
function UserHeader({ name, email }: { name: string; email: string }) {
  return (
    <div className="header">
      <h1>欢迎, {name}</h1>
      <p>{email}</p>
      <div className="actions">
        <button>编辑资料</button>
        <button>登出</button>
      </div>
    </div>
  );
}

// 文章组件
function Post({ title, content }: { title: string; content: string }) {
  return (
    <div className="post">
      <h3>{title}</h3>
      <p>{content}</p>
      <div className="actions">
        <button>编辑</button>
        <button>删除</button>
      </div>
    </div>
  );
}

// 文章列表组件
function PostList({ posts }: { posts: { title: string; content: string }[] }) {
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <Post key={index} title={post.title} content={post.content} />
      ))}
    </div>
  );
}

// 重构后的用户仪表板组件
function UserDashboard({ user }: { user: { name: string; email: string; posts: { title: string; content: string }[] } }) {
  return (
    <div>
      <UserHeader name={user.name} email={user.email} />
      
      <div className="content">
        <h2>你的文章</h2>
        <PostList posts={user.posts} />
      </div>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
            <p className="mt-4 text-muted-foreground">
              通过将大组件拆分为更小的、专注于单一职责的组件，我们可以提高代码的可读性、可维护性和可重用性。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>组件命名约定</CardTitle>
            <CardDescription>React 组件命名遵循一些常见约定。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>组件名称应该始终以大写字母开头（PascalCase）</li>
              <li>组件名称应该是描述性的，表明组件的用途</li>
              <li>避免使用通用名称，如 "Button" 或 "Card"，除非它们确实是通用组件</li>
              <li>对于特定用途的组件，可以使用前缀，如 "UserProfile" 或 "AdminDashboard"</li>
              <li>对于高阶组件，通常使用 "with" 前缀，如 "withAuth" 或 "withTheme"</li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 好的命名示例
function UserProfile() { /* ... */ }
function ProductCard() { /* ... */ }
function NavigationBar() { /* ... */ }
function LoginForm() { /* ... */ }

// 不好的命名示例
function Component() { /* ... */ }  // 太通用
function Stuff() { /* ... */ }      // 不描述性
function X() { /* ... */ }          // 不明确`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
