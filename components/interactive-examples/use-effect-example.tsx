"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function UseEffectExample() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [width, setWidth] = useState(0)

  // 示例1: 每次渲染后执行
  useEffect(() => {
    console.log("组件渲染了")
    // 注意：这个效果在控制台可见，但在UI中不可见
  })

  // 示例2: 仅在count变化时执行
  useEffect(() => {
    document.title = `点击了 ${count} 次`
    console.log(`count更新为: ${count}`)
  }, [count])

  // 示例3: 监听窗口大小变化
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth)
    }

    // 初始化宽度
    updateWidth()

    // 添加事件监听器
    window.addEventListener("resize", updateWidth)

    // 清理函数
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">useEffect 示例</h3>

        <div className="space-y-2">
          <p>计数: {count}</p>
          <Button onClick={() => setCount(count + 1)}>增加计数</Button>
          <p className="text-sm text-muted-foreground">(查看浏览器标题变化和控制台日志)</p>
        </div>

        <div className="space-y-2">
          <p>名称: {name || "(空)"}</p>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="输入名称..." />
        </div>

        <div>
          <p>窗口宽度: {width}px</p>
          <p className="text-sm text-muted-foreground">(调整浏览器窗口大小查看变化)</p>
        </div>
      </div>
    </Card>
  )
}
