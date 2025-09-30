"use client";

import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import CodeBlock from "@/components/code-block";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formCode = `import { useForm } from "@/hooks/useForm";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function FormsExample() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { errors, validateField, handleSubmit } = useForm<FormData>({
    initialValues: formData,
    validationRules: {
      username: (value) => {
        if (!value) return "用户名不能为空";
        if (value.length < 3) return "用户名至少需要3个字符";
        return null;
      },
      email: (value) => {
        if (!value) return "邮箱不能为空";
        if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) 
          return "请输入有效的邮箱地址";
        return null;
      },
      password: (value) => {
        if (!value) return "密码不能为空";
        if (value.length < 6) return "密码至少需要6个字符";
        return null;
      },
      confirmPassword: (value) => {
        if (value !== formData.password) return "两次输入的密码不一致";
        return null;
      },
    },
  });
}`;

export default function FormsExample() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { errors, validateField, handleSubmit } = useForm<FormData>({
    initialValues: formData,
    validationRules: {
      username: (value) => {
        if (!value) return "用户名不能为空";
        if (value.length < 3) return "用户名至少需要3个字符";
        return null;
      },
      email: (value) => {
        if (!value) return "邮箱不能为空";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "请输入有效的邮箱地址";
        return null;
      },
      password: (value) => {
        if (!value) return "密码不能为空";
        if (value.length < 6) return "密码至少需要6个字符";
        return null;
      },
      confirmPassword: (value) => {
        if (value !== formData.password) return "两次输入的密码不一致";
        return null;
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const onSubmit = (data: FormData) => {
    console.log("表单提交:", data);
    alert("表单提交成功！");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">表单处理示例</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">代码实现</h2>
        <CodeBlock language="typescript" className="mb-4">
          {formCode}
        </CodeBlock>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">功能说明</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            使用自定义的 <code>useForm</code> hook 处理表单状态和验证
          </li>
          <li>实时字段验证，提供即时反馈</li>
          <li>支持自定义验证规则</li>
          <li>表单提交前的整体验证</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">实际示例</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">用户名</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">邮箱</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">确认密码</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            提交
          </button>
        </form>
      </div>
    </div>
  );
}
