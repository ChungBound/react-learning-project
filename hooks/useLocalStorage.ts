"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 从localStorage获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      // 尝试解析 JSON，如果失败则返回原始值
      try {
        return JSON.parse(item);
      } catch {
        return item as T;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 返回一个包装过的useState的setter函数，它同时会保存到localStorage
  const setValue = (value: T) => {
    try {
      // 允许值是一个函数，这样我们就有了和useState一样的API
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // 根据值的类型决定是否使用 JSON.stringify
      const valueToStoreInLocalStorage = typeof valueToStore === 'string' 
        ? valueToStore 
        : JSON.stringify(valueToStore);
      window.localStorage.setItem(key, valueToStoreInLocalStorage);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
} 