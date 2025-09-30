"use client"

import { Suspense, lazy, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

// 懒加载示例组件
const ParentComponent = lazy(() => import('./components/ChildComponentExample'))
const UserRegistration = lazy(() => import('./components/InputFormExample'))
const DocumentEditor = lazy(() => import('./components/ButtonGroupExample'))
const ParentForm = lazy(() => import('./components/ImperativeHandleExample'))

export default function ChildToParentPage() {
  // 使用 useCallback 优化回调函数
  const handleMessageFromChild = useCallback((message: string) => {
    console.log("收到子组件消息:", message)
    alert(message)
  }, [])

  // 使用 useMemo 优化复杂计算
  const cardContent = useMemo(() => ({
    callback: {
      title: "使用回调函数",
      description: "在 React 中，子组件通过调用父组件传递的回调函数来向父组件传递数据。",
      content: `// 子组件
function ChildComponent({ onMessageSend }: { onMessageSend: (message: string) => void }) {
  const handleClick = () => {
    onMessageSend("来自子组件的消息");
  };
  
  return (
    <div>
      <h2>子组件</h2>
      <button onClick={handleClick}>发送消息到父组件</button>
    </div>
  );
}

// 父组件
function ParentComponent() {
  const handleMessageFromChild = (message: string) => {
    console.log("收到子组件消息:", message);
    alert(message);
  };
  
  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent onMessageSend={handleMessageFromChild} />
    </div>
  );
}`
    },
    form: {
      title: "表单输入示例",
      description: "一个常见的场景是子组件包含表单输入，需要将输入值传递给父组件。",
      content: `// 子组件：表单输入
function InputForm({ onSubmit }: { onSubmit: (data: { name: string; email: string }) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">姓名:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">邮箱:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">提交</button>
    </form>
  );
}

// 父组件
function UserRegistration() {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  
  const handleFormSubmit = (data: { name: string; email: string }) => {
    setUserData(data);
    console.log("表单提交数据:", data);
  };
  
  return (
    <div>
      <h1>用户注册</h1>
      <InputForm onSubmit={handleFormSubmit} />
      
      {userData && (
        <div>
          <h2>提交的数据:</h2>
          <p>姓名: {userData.name}</p>
          <p>邮箱: {userData.email}</p>
        </div>
      )}
    </div>
  );
}`
    },
    event: {
      title: "事件处理示例",
      description: "子组件可以通过事件处理函数向父组件传递事件相关的数据。",
      content: `// 子组件：按钮组
function ButtonGroup({ onAction }: { onAction: (action: string, data?: any) => void }) {
  return (
    <div className="button-group">
      <button onClick={() => onAction("save")}>
        保存
      </button>
      <button onClick={() => onAction("delete")}>
        删除
      </button>
      <button onClick={() => onAction("edit", { timestamp: Date.now() })}>
        编辑 (带时间戳)
      </button>
    </div>
  );
}

// 父组件
function DocumentEditor() {
  const handleAction = (action: string, data?: any) => {
    switch (action) {
      case "save":
        console.log("保存文档");
        break;
      case "delete":
        console.log("删除文档");
        break;
      case "edit":
        console.log("编辑文档", data);
        break;
      default:
        console.log("未知操作");
    }
  };
  
  return (
    <div>
      <h1>文档编辑器</h1>
      <div className="editor-content">
        {/* 编辑器内容 */}
      </div>
      <ButtonGroup onAction={handleAction} />
    </div>
  );
}`
    },
    imperative: {
      title: "使用 useImperativeHandle 暴露方法",
      description: "在某些情况下，你可能需要让父组件直接调用子组件的方法。React 提供了 useImperativeHandle 钩子来实现这一点。",
      content: `import { useRef, useImperativeHandle, forwardRef } from 'react';

// 定义子组件可以暴露给父组件的方法
interface ChildMethods {
  focus: () => void;
  reset: () => void;
}

// 子组件
const ChildInput = forwardRef<ChildMethods, {}>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 使用 useImperativeHandle 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    // 聚焦输入框
    focus: () => {
      inputRef.current?.focus();
    },
    // 重置输入框
    reset: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }));
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="请输入..." />
    </div>
  );
});

// 父组件
function ParentForm() {
  // 创建对子组件的引用
  const childRef = useRef<ChildMethods>(null);
  
  const handleFocusClick = () => {
    // 调用子组件的方法
    childRef.current?.focus();
  };
  
  const handleResetClick = () => {
    // 调用子组件的方法
    childRef.current?.reset();
  };
  
  return (
    <div>
      <h1>表单控制</h1>
      <ChildInput ref={childRef} />
      <div>
        <button onClick={handleFocusClick}>聚焦输入框</button>
        <button onClick={handleResetClick}>重置输入框</button>
      </div>
    </div>
  );
}`
    }
  }), [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">子组件向父组件传值</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{cardContent.callback.title}</CardTitle>
            <CardDescription>{cardContent.callback.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              父组件可以将函数作为 props 传递给子组件，子组件可以调用这些函数并传入数据，从而实现子到父的通信。
            </p>
            <CodeBlock language="tsx">{cardContent.callback.content}</CodeBlock>
            <Suspense fallback={<div>加载中...</div>}>
              <ParentComponent />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{cardContent.form.title}</CardTitle>
            <CardDescription>{cardContent.form.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{cardContent.form.content}</CodeBlock>
            <Suspense fallback={<div>加载中...</div>}>
              <UserRegistration />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{cardContent.event.title}</CardTitle>
            <CardDescription>{cardContent.event.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{cardContent.event.content}</CodeBlock>
            <Suspense fallback={<div>加载中...</div>}>
              <DocumentEditor />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{cardContent.imperative.title}</CardTitle>
            <CardDescription>{cardContent.imperative.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              注意：这种方法打破了 React 的单向数据流，应该谨慎使用。大多数情况下，通过 props
              和回调函数通信是更好的选择。
            </p>
            <CodeBlock language="tsx">{cardContent.imperative.content}</CodeBlock>
            <Suspense fallback={<div>加载中...</div>}>
              <ParentForm />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>子组件向父组件传值的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                使用描述性的回调函数名称，如 <code>onSubmit</code>、<code>onChange</code> 或 <code>onSelect</code>
              </li>
              <li>保持回调函数的参数简单明确，传递必要的数据</li>
              <li>使用 TypeScript 定义回调函数的类型，提高代码的可读性和类型安全性</li>
              <li>避免在子组件中直接修改父组件的状态，始终通过回调函数通知父组件进行更改</li>
              <li>对于复杂的状态管理，考虑使用 Context API 或状态管理库（如 Redux）</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
