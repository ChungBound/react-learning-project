"use client"

import { createContext, useContext, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// 创建 Context
const ThemeContext = createContext<{
  theme: "light" | "dark"
  toggleTheme: () => void
}>({
  theme: "light",
  toggleTheme: () => {},
})

// 使用 Context 的组件
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Button
      onClick={toggleTheme}
      variant={theme === "light" ? "outline" : "default"}
      className={theme === "dark" ? "bg-slate-700" : ""}
    >
      切换到{theme === "light" ? "暗色" : "亮色"}主题
    </Button>
  )
}

function ThemedContent() {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`mt-4 p-4 rounded-md ${
        theme === "light" ? "bg-white text-slate-900 border border-slate-200" : "bg-slate-800 text-slate-100"
      }`}
    >
      <h3 className="text-lg font-medium mb-2">当前主题: {theme}</h3>
      <p>这是一些使用当前主题样式的内容。</p>
    </div>
  )
}

// 主组件
export function ContextExample() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Card className="p-4 border-dashed">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div>
          <h3 className="text-lg font-medium mb-4">Context 示例</h3>
          <ThemedButton />
          <ThemedContent />
        </div>
      </ThemeContext.Provider>
    </Card>
  )
}
