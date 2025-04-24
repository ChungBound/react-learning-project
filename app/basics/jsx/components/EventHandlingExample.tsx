"use client"

import { memo, useState } from "react"

const EventHandlingExample = memo(() => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  // 点击事件处理
  const handleClick = () => {
    setCount((prev) => prev + 1)
  }

  // 输入事件处理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  // 鼠标移动事件处理
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  // 鼠标悬停事件处理
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // 文件选择事件处理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // 表单提交事件处理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("表单数据:", formData)
    alert("表单已提交!")
  }

  // 表单输入变化处理
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">事件处理示例</h2>

      <div className="space-y-6">
        {/* 点击事件示例 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">点击事件</h3>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            点击我 ({count})
          </button>
        </div>

        {/* 输入事件示例 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">输入事件</h3>
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="输入一些文字..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-gray-600">输入的内容: {text}</p>
        </div>

        {/* 鼠标事件示例 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">鼠标事件</h3>
          <div
            className="h-40 bg-gray-100 rounded flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p className="text-gray-600">
              {isHovered
                ? `鼠标位置: X=${position.x}, Y=${position.y}`
                : "将鼠标移入此区域"}
            </p>
          </div>
        </div>

        {/* 文件上传示例 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">文件上传</h3>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="mt-2 text-gray-600">
              已选择文件: {selectedFile.name}
            </p>
          )}
        </div>

        {/* 表单提交示例 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">表单提交</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                密码
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              提交
            </button>
          </form>
        </div>
      </div>
    </div>
  )
})

EventHandlingExample.displayName = "EventHandlingExample"

export default EventHandlingExample 