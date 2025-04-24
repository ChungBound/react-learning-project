"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function ArrayStateExample() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "学习 React", completed: false },
    { id: 2, text: "完成项目", completed: false },
  ])

  const [newTodo, setNewTodo] = useState("")

  // 添加新待办事项
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      }
      setTodos([...todos, newTodoItem])
      setNewTodo("")
    }
  }

  // 切换待办事项的完成状态
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

  return (
    <Card className="p-4 border-dashed">
      <div>
        <h3 className="text-lg font-medium mb-4">数组状态示例 - 待办事项</h3>

        <div className="flex gap-2 mb-4">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="添加新待办..."
          />
          <Button onClick={addTodo}>添加</Button>
        </div>

        {todos.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">暂无待办事项</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
                <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} id={`todo-${todo.id}`} />
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
    </Card>
  )
}
