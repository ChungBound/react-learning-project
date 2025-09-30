"use client"

import { memo } from "react"

const ExpressionExample = memo(() => {
  const name = "小明"
  const age = 25

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">表达式示例</h2>
      <div className="space-y-2">
        <h1 className="text-lg">你好，{name}!</h1>
        <p>你今年 {age} 岁了。</p>
        <p>明年你将会 {age + 1} 岁。</p>
        <p>{name.toUpperCase()} 是你的名字。</p>
      </div>
    </div>
  )
})

ExpressionExample.displayName = "ExpressionExample"

export default ExpressionExample 