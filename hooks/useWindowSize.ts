import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
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
  }, []); // 空依赖数组意味着这个effect只会在组件挂载和卸载时运行

  return windowSize;
} 