"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ObjectStateExample() {
  const [user, setUser] = useState({
    name: "张三",
    email: "zhangsan@example.com",
    preferences: {
      theme: "light",
      notifications: true,
    },
  })

  // 正确方式：创建新对象
  const updateTheme = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        theme: user.preferences.theme === "light" ? "dark" : "light",
      },
    })
  }

  const toggleNotifications = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications,
      },
    })
  }

  return (
    <Card className="p-4 border-dashed">
      <div>
        <h3 className="text-lg font-medium mb-4">对象状态示例</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium">用户信息:</p>
            <p>姓名: {user.name}</p>
            <p>邮箱: {user.email}</p>
          </div>

          <div>
            <p className="font-medium">偏好设置:</p>
            <p>主题: {user.preferences.theme === "light" ? "亮色" : "暗色"}</p>
            <p>通知: {user.preferences.notifications ? "开启" : "关闭"}</p>
          </div>

          <div className="flex flex-col gap-4">
            <Button onClick={updateTheme}>切换到{user.preferences.theme === "light" ? "暗色" : "亮色"}主题</Button>

            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={user.preferences.notifications}
                onCheckedChange={toggleNotifications}
              />
              <Label htmlFor="notifications">通知</Label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
