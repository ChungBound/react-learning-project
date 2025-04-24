"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CounterExample() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">计数器示例</h3>
        <p className="text-2xl font-bold mb-4">当前计数: {count}</p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={decrement}>
            减少
          </Button>
          <Button variant="outline" onClick={reset}>
            重置
          </Button>
          <Button variant="outline" onClick={increment}>
            增加
          </Button>
        </div>
      </div>
    </Card>
  )
}
