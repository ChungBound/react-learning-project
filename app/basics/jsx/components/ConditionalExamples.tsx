import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ThemeSwitcher from "./ThemeSwitcher";
import UserStatus from "./UserStatus";
import PriceDisplay from "./PriceDisplay";
import ConditionalRenderingExample from "./ConditionalRenderingExample";

function ConditionalExamples() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>三元运算符</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>主题切换器</CardTitle>
              <CardDescription>切换深色和浅色模式。</CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSwitcher />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>用户状态</CardTitle>
              <CardDescription>显示用户在线状态。</CardDescription>
            </CardHeader>
            <CardContent>
              <UserStatus />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>价格显示</CardTitle>
              <CardDescription>显示原价和折扣价。</CardDescription>
            </CardHeader>
            <CardContent>
              <PriceDisplay />
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>逻辑与运算符</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationCenter />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>if-else 语句</CardTitle>
        </CardHeader>
        <CardContent>
          <WeatherDisplay />
        </CardContent>
      </Card>
      <ConditionalRenderingExample />
      {/* <Card>
        <CardHeader>
          <CardTitle>其他条件渲染示例</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionalRenderingExample />
        </CardContent>
      </Card> */}
    </div>
  );
}

function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "新消息", read: false },
    { id: 2, message: "系统通知", read: true },
    { id: 3, message: "更新提醒", read: false },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <h1>通知中心</h1>
      {unreadCount > 0 && (
        <div className="unread-badge">你有 {unreadCount} 条未读通知</div>
      )}
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={notification.read ? "read" : "unread"}
          >
            {notification.message}
            {!notification.read && <span className="new-badge">新</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WeatherDisplay() {
  const [temperature, setTemperature] = useState(25);

  let weatherMessage;
  let weatherIcon;
  let weatherClass;

  if (temperature > 30) {
    weatherMessage = "天气很热!";
    weatherIcon = "☀️";
    weatherClass = "hot";
  } else if (temperature > 20) {
    weatherMessage = "天气适宜。";
    weatherIcon = "⛅";
    weatherClass = "mild";
  } else {
    weatherMessage = "天气有点冷。";
    weatherIcon = "❄️";
    weatherClass = "cold";
  }

  return (
    <div className={weatherClass}>
      <h1>天气信息</h1>
      <div className="weather-display">
        <span className="icon">{weatherIcon}</span>
        <span className="temperature">{temperature}°C</span>
        <p className="message">{weatherMessage}</p>
      </div>
      <div className="controls">
        <button onClick={() => setTemperature((prev) => prev + 5)}>
          增加温度
        </button>
        <button onClick={() => setTemperature((prev) => prev - 5)}>
          降低温度
        </button>
      </div>
    </div>
  );
}

export default ConditionalExamples;
