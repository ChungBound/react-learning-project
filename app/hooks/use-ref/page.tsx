"use client"

import { Card } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 示例组件：DOM 引用
function DomRefExample() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState("")

  const focusInput = () => {
    // 使用 ref 直接操作 DOM
    inputRef.current?.focus()
  }

  const getInputValue = () => {
    if (inputRef.current) {
      setMessage(`当前输入值: ${inputRef.current.value}`)
    }
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">DOM 引用示例</h3>

        <div className="flex gap-2">
          <Input ref={inputRef} placeholder="输入一些文本..." className="max-w-xs" />
          <Button onClick={focusInput}>聚焦</Button>
          <Button variant="outline" onClick={getInputValue}>
            获取值
          </Button>
        </div>

        {message && <p className="p-2 bg-muted rounded-md">{message}</p>}
      </div>
    </Card>
  )
}

// 示例组件：保存前一个值
function PreviousValueExample() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number>()

  // 在每次渲染后更新 ref
  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  const prevCount = prevCountRef.current

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">保存前一个值示例</h3>

        <div className="p-4 bg-muted rounded-md">
          <p>当前计数: {count}</p>
          <p>前一个计数: {prevCount !== undefined ? prevCount : "无"}</p>
        </div>

        <Button onClick={() => setCount(count + 1)}>增加计数</Button>
      </div>
    </Card>
  )
}

// 示例组件：计时器
function TimerExample() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      // 启动计时器
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    } else if (timerRef.current) {
      // 停止计时器
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">计时器示例</h3>
        <p className="text-2xl font-bold mb-4">{seconds} 秒</p>
        <div className="flex justify-center gap-2">
          <Button onClick={handleStartStop}>{isRunning ? "暂停" : "开始"}</Button>
          <Button variant="outline" onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default function UseRefPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-\
