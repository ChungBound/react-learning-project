"use client";

import { useState, useEffect } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // 只在客户端执行
    if (typeof window === "undefined") return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 添加事件监听
    window.addEventListener("resize", handleResize);

    // 立即调用一次，获取初始值
    handleResize();

    // 清理函数
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
} 