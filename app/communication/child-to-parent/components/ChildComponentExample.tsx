"use client"

import { memo, useState } from "react"

interface ChildComponentExampleProps {
  onMessageSend: (message: string) => void
}

const ChildComponent = memo(({ onMessageSend }: ChildComponentExampleProps) => {
  const handleClick = () => {
    onMessageSend("来自子组件的消息")
  }

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">子组件</h2>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        发送消息到父组件
      </button>
    </div>
  )
})

ChildComponent.displayName = "ChildComponent"

const ParentComponent = memo(() => {
  const [message, setMessage] = useState<string>("")

  const handleMessageFromChild = (message: string) => {
    setMessage(message)
    console.log("收到子组件消息:", message)
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">父组件</h2>
      <ChildComponent onMessageSend={handleMessageFromChild} />
      {message && (
        <div className="mt-4 p-2 bg-white rounded">
          <p>收到的消息: {message}</p>
        </div>
      )}
    </div>
  )
})

ParentComponent.displayName = "ParentComponent"

export default ParentComponent 