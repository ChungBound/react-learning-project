"use client"

import { memo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ButtonGroup = memo(({ onAction }: { onAction: (action: string, data?: any) => void }) => {
  return (
    <div className="space-x-2">
      <button
        onClick={() => onAction("save")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        保存
      </button>
      <button
        onClick={() => onAction("delete")}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        删除
      </button>
      <button
        onClick={() => onAction("edit", { timestamp: Date.now() })}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
      >
        编辑 (带时间戳)
      </button>
    </div>
  )
})

ButtonGroup.displayName = "ButtonGroup"

const DocumentEditor = memo(() => {
  const [lastAction, setLastAction] = useState<string>("")
  const [lastData, setLastData] = useState<any>(null)

  const handleAction = (action: string, data?: any) => {
    setLastAction(action)
    setLastData(data)
    switch (action) {
      case "save":
        console.log("保存文档")
        break
      case "delete":
        console.log("删除文档")
        break
      case "edit":
        console.log("编辑文档", data)
        break
      default:
        console.log("未知操作")
    }
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">文档编辑器</h2>
      <div className="editor-content mb-4 p-4 bg-white rounded">
        <p>文档内容区域</p>
      </div>
      <ButtonGroup onAction={handleAction} />
      {lastAction && (
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p>最后执行的操作: {lastAction}</p>
          {lastData && <p>操作数据: {JSON.stringify(lastData)}</p>}
        </div>
      )}
    </div>
  )
})

DocumentEditor.displayName = "DocumentEditor"

export default DocumentEditor 