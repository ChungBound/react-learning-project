"use client"

import { memo, useState } from "react"

interface FormData {
  name: string
  email: string
}

const InputForm = memo(({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          姓名:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          邮箱:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        提交
      </button>
    </form>
  )
})

InputForm.displayName = "InputForm"

const UserRegistration = memo(() => {
  const [userData, setUserData] = useState<FormData | null>(null)

  const handleFormSubmit = (data: FormData) => {
    setUserData(data)
    console.log("表单提交数据:", data)
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">用户注册</h2>
      <InputForm onSubmit={handleFormSubmit} />

      {userData && (
        <div className="mt-4 p-4 bg-white rounded-lg">
          <h3 className="text-lg font-medium mb-2">提交的数据:</h3>
          <p>姓名: {userData.name}</p>
          <p>邮箱: {userData.email}</p>
        </div>
      )}
    </div>
  )
})

UserRegistration.displayName = "UserRegistration"

export default UserRegistration 