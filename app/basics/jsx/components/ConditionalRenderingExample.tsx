"use client";

import { memo, useState } from "react";

const ConditionalRenderingExample = memo(() => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"user" | "admin" | "guest">("guest");
  const [showContent, setShowContent] = useState(true);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 模拟加载数据
  const loadData = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setItems(["项目1", "项目2", "项目3"]);
        setLoading(false);
      } catch (err) {
        setError("加载数据时出错");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div>
      <div className="space-y-6">
        {/* 1. 使用 if 语句的条件渲染 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">登录状态</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {isLoggedIn ? "退出登录" : "登录"}
            </button>
            {isLoggedIn ? (
              <p className="text-green-600">已登录</p>
            ) : (
              <p className="text-red-600">未登录</p>
            )}
          </div>
        </div>

        {/* 2. 使用 && 运算符的条件渲染 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">显示/隐藏内容</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowContent(!showContent)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {showContent ? "隐藏内容" : "显示内容"}
            </button>
            {showContent && (
              <p className="text-gray-700">
                这段内容会根据按钮的点击状态显示或隐藏
              </p>
            )}
          </div>
        </div>

        {/* 3. 使用三元运算符的条件渲染 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">用户角色</h3>
          <div className="flex items-center gap-4">
            <select
              value={userRole}
              onChange={(e) =>
                setUserRole(e.target.value as "user" | "admin" | "guest")
              }
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="guest">访客</option>
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select>
            <p className="text-gray-700">
              {userRole === "guest"
                ? "您以访客身份访问"
                : userRole === "user"
                ? "欢迎回来，普通用户"
                : "欢迎回来，管理员"}
            </p>
          </div>
        </div>

        {/* 4. 处理加载状态和错误状态 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">数据加载示例</h3>
          <div className="space-y-4">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            >
              {loading ? "加载中..." : "加载数据"}
            </button>

            {loading && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
            )}

            {!loading && !error && items.length > 0 && (
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {!loading && !error && items.length === 0 && (
              <p className="text-gray-500 text-center">暂无数据</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ConditionalRenderingExample.displayName = "ConditionalRenderingExample";

export default ConditionalRenderingExample;
