"use client"

import { memo, useRef, useImperativeHandle, forwardRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChildMethods {
  focus: () => void
  reset: () => void
}

const ChildInput = forwardRef<ChildMethods, {}>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    reset: () => {
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }))

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="请输入..."
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
  )
})

ChildInput.displayName = "ChildInput"

const ParentForm = memo(() => {
  const childRef = useRef<ChildMethods>(null)
  const [lastAction, setLastAction] = useState<string>("")

  const handleFocusClick = () => {
    childRef.current?.focus()
    setLastAction("focus")
  }

  const handleResetClick = () => {
    childRef.current?.reset()
    setLastAction("reset")
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">表单控制</h2>
      <ChildInput ref={childRef} />
      <div className="mt-4 space-x-2">
        <button
          onClick={handleFocusClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          聚焦输入框
        </button>
        <button
          onClick={handleResetClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          重置输入框
        </button>
      </div>
      {lastAction && (
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p>最后执行的操作: {lastAction}</p>
        </div>
      )}
    </div>
  )
})

ParentForm.displayName = "ParentForm"

export default ParentForm 