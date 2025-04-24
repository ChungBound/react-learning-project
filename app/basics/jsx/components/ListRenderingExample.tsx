"use client"

import { memo, useState } from "react"

const ListRenderingExample = memo(() => {
  const [items, setItems] = useState([
    { id: 1, name: "苹果", price: 5.99 },
    { id: 2, name: "香蕉", price: 3.99 },
    { id: 3, name: "橙子", price: 4.99 },
  ])

  const [newItem, setNewItem] = useState({ name: "", price: "" })
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price" | null>(null)

  // 添加新项目
  const addItem = () => {
    if (newItem.name && newItem.price) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem.name,
          price: parseFloat(newItem.price),
        },
      ])
      setNewItem({ name: "", price: "" })
    }
  }

  // 删除项目
  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  // 更新项目
  const updateItem = (id: number, field: "name" | "price", value: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "price" ? parseFloat(value) : value,
            }
          : item
      )
    )
  }

  // 过滤和排序后的项目列表
  const filteredAndSortedItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      return a.price - b.price
    })

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">列表渲染示例</h2>

      <div className="space-y-6">
        {/* 添加新项目 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">添加新项目</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
              placeholder="商品名称"
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              placeholder="价格"
              className="w-32 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addItem}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              添加
            </button>
          </div>
        </div>

        {/* 过滤和排序控制 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">过滤和排序</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="搜索商品..."
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sortBy || ""}
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "price" | null)
              }
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">不排序</option>
              <option value="name">按名称排序</option>
              <option value="price">按价格排序</option>
            </select>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">商品列表</h3>
          <div className="space-y-4">
            {filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(item.id, "name", e.target.value)
                    }
                    className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-32 mx-4">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(item.id, "price", e.target.value)
                    }
                    className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

ListRenderingExample.displayName = "ListRenderingExample"

export default ListRenderingExample 