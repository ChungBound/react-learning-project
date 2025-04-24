"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus } from "lucide-react"
import CodeBlock from "@/components/code-block"

// 定义待办事项类型
interface Todo {
  id: number
  text: string
  completed: boolean
}

// 待办事项应用组件
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "学习 React 基础", completed: true },
    { id: 2, text: "学习 React Hooks", completed: false },
    { id: 3, text: "构建一个待办事项应用", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  // 添加新待办事项
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  // 切换待办事项完成状态
  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // 删除待办事项
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  // 计算完成和未完成的待办事项数量
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>待办事项列表</CardTitle>
        <CardDescription>管理你的日常任务</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="添加新待办..."
              className="flex-1"
            />
            <Button onClick={addTodo}>
              <Plus className="h-4 w-4 mr-1" />
              添加
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {remainingCount} 项待办, {completedCount} 项已完成
          </div>

          {todos.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">暂无待办事项</p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center gap-2 p-2 border rounded-md">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {todo.text}
                  </label>
                  <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function TodoAppPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">待办事项应用</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>项目概述</CardTitle>
            <CardDescription>一个简单的待办事项应用，展示 React 的基本概念。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">这个待办事项应用展示了 React 的多个核心概念，包括：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>使用 useState 管理组件状态</li>
              <li>条件渲染和列表渲染</li>
              <li>事件处理</li>
              <li>组件组合</li>
            </ul>
            <p>通过这个应用，你可以添加、删除和标记完成待办事项，体验 React 的声明式编程模型。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现代码</CardTitle>
            <CardDescription>待办事项应用的完整实现代码。</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`import { useState } from "react";

// 定义待办事项类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "学习 React 基础", completed: true },
    { id: 2, text: "学习 React Hooks", completed: false },
    { id: 3, text: "构建一个待办事项应用", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // 添加新待办事项
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  // 切换待办事项完成状态
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 删除待办事项
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 处理按键事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // 计算完成和未完成的待办事项数量
  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">待办事项列表</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="添加新待办..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button 
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          添加
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        {remainingCount} 项待办, {completedCount} 项已完成
      </div>

      {todos.length === 0 ? (
        <p className="text-center py-4 text-gray-500">暂无待办事项</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 p-2 border rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                id={\`todo-\${todo.id}\`}
              />
              <label
                htmlFor={\`todo-\${todo.id}\`}
                className={\`flex-1 \${todo.completed ? "line-through text-gray-500" : ""}\`}
              >
                {todo.text}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实时演示</CardTitle>
            <CardDescription>体验待办事项应用的功能。</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoApp />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>核心概念解析</CardTitle>
            <CardDescription>这个应用中使用的 React 核心概念。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">状态管理</h3>
                <p>
                  使用 <code>useState</code>{" "}
                  钩子管理待办事项列表和新待办事项的输入值。当用户添加、删除或标记完成待办事项时，我们通过更新状态来反映这些变化。
                </p>
                <CodeBlock language="tsx" className="mt-2">{`const [todos, setTodos] = useState<Todo[]>([...]);
const [newTodo, setNewTodo] = useState("");`}</CodeBlock>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">列表渲染</h3>
                <p>
                  使用 <code>map</code> 方法将待办事项数组转换为 JSX 元素列表。每个待办事项都有一个唯一的{" "}
                  <code>key</code> 属性，帮助 React 高效地更新 DOM。
                </p>
                <CodeBlock language="tsx" className="mt-2">{`{todos.map((todo) => (
  <li key={todo.id}>
    {/* 待办事项内容 */}
  </li>
))}`}</CodeBlock>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">条件渲染</h3>
                <p>
                  使用条件渲染显示不同的内容，例如当没有待办事项时显示一条消息，或者根据待办事项的完成状态应用不同的样式。
                </p>
                <CodeBlock language="tsx" className="mt-2">{`{todos.length === 0 ? (
  <p>暂无待办事项</p>
) : (
  <ul>{/* 待办事项列表 */}</ul>
)}`}</CodeBlock>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">事件处理</h3>
                <p>处理用户交互，如点击按钮添加或删除待办事项，或按下 Enter 键添加新待办事项。</p>
                <CodeBlock language="tsx" className="mt-2">{`<button onClick={addTodo}>添加</button>
<input onKeyDown={handleKeyDown} />`}</CodeBlock>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">派生状态</h3>
                <p>计算派生状态，如完成和未完成的待办事项数量，而不是将这些值存储在状态中。</p>
                <CodeBlock
                  language="tsx"
                  className="mt-2"
                >{`const completedCount = todos.filter((todo) => todo.completed).length;
const remainingCount = todos.length - completedCount;`}</CodeBlock>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>扩展思路</CardTitle>
            <CardDescription>如何扩展这个待办事项应用。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">这个基础的待办事项应用可以通过以下方式扩展：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>添加本地存储，使待办事项在页面刷新后仍然保留</li>
              <li>添加编辑待办事项的功能</li>
              <li>添加分类或标签功能，对待办事项进行分组</li>
              <li>添加拖放功能，重新排序待办事项</li>
              <li>添加截止日期和提醒功能</li>
              <li>添加搜索和筛选功能</li>
              <li>使用 Context API 或 Redux 进行更复杂的状态管理</li>
              <li>添加动画效果，提升用户体验</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
