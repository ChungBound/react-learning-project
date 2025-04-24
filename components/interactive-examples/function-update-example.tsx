"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FunctionUpdateExample() {
  const [count, setCount] = useState(0)

  // 问题示例：直接使用状态
  const incrementThreeTimesWrong = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    // 结果只会 +1，而不是 +3
  }

  // 正确示例：使用函数式更新
  const incrementThreeTimesRight = () => {
    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1)
    // 结果会 +3
  }

  // 重置计数
  const resetCount = () => {
    setCount(0)
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">函数式更新示例</h3>
        <p className="text-2xl font-bold mb-4">当前计数: {count}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <Button variant="outline" onClick={incrementThreeTimesWrong}>
            错误方式 (+1)
          </Button>
          <Button variant="default" onClick={incrementThreeTimesRight}>
            正确方式 (+3)
          </Button>
          <Button variant="secondary" onClick={resetCount}>
            重置
          </Button>
        </div>
      </div>
    </Card>
  )
}
