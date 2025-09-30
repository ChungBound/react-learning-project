"use client"

import { memo, useState, FormEvent } from "react"

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

const FormHandlingExample = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.username.trim()) {
      newErrors.username = "用户名不能为空"
    } else if (formData.username.length < 3) {
      newErrors.username = "用户名至少需要3个字符"
    }

    if (!formData.email.trim()) {
      newErrors.email = "邮箱不能为空"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }

    if (!formData.password) {
      newErrors.password = "密码不能为空"
    } else if (formData.password.length < 6) {
      newErrors.password = "密码至少需要6个字符"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = true
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
      // 这里通常会发送数据到服务器
      console.log("表单数据:", formData)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          注册成功！
        </h2>
        <p className="text-green-600">
          感谢您的注册，我们已经收到您的信息。
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">表单处理示例</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 用户名 */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            用户名
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        {/* 邮箱 */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            邮箱
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* 密码 */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            密码
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* 确认密码 */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            确认密码
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            } focus:outline-none focus:ring-2`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* 同意条款 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="agreeToTerms"
            className="ml-2 block text-sm text-gray-700"
          >
            我同意服务条款和隐私政策
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-600">
            请同意服务条款和隐私政策
          </p>
        )}

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          注册
        </button>
      </form>
    </div>
  )
})

FormHandlingExample.displayName = "FormHandlingExample"

export default FormHandlingExample 