"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ToggleExample() {
  const [isOn, setIsOn] = useState(false)

  const toggle = () => {
    setIsOn(!isOn)
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">开关示例</h3>
        <Button onClick={toggle} className="mb-2 w-24" variant={isOn ? "default" : "destructive"}>
          {isOn ? "开" : "关"}
        </Button>
        <p>当前状态: {isOn ? "开启" : "关闭"}</p>
      </div>
    </Card>
  )
}
