"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TimerExample() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  // 格式化时间为 mm:ss
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">计时器示例</h3>
        <p className="text-2xl font-bold mb-4">{formatTime(seconds)}</p>
        <div className="flex justify-center gap-2">
          <Button variant={isRunning ? "destructive" : "default"} onClick={handleStartStop}>
            {isRunning ? "暂停" : "开始"}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>
    </Card>
  )
}
