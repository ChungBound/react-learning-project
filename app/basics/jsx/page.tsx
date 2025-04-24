"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/code-block";
import ExpressionExample from "./components/ExpressionExample";
import EventHandlingExample from "./components/EventHandlingExample";
import FormHandlingExample from "./components/FormHandlingExample";
import ListRenderingExample from "./components/ListRenderingExample";
import ConditionalExamples from "./components/ConditionalExamples";

export default function JsxPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">JSX 语法</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 JSX?</CardTitle>
            <CardDescription>
              JSX 是 JavaScript 的语法扩展，它允许你在 JavaScript 文件中编写类似
              HTML 的代码。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              JSX 是 React 的核心部分，它让你可以在 JavaScript 中编写 HTML
              结构，同时保持 JavaScript 的全部功能。 JSX 最终会被编译成普通的
              JavaScript 函数调用。
            </p>

            <Tabs defaultValue="jsx">
              <TabsList className="mb-4">
                <TabsTrigger value="jsx">JSX 语法</TabsTrigger>
                <TabsTrigger value="js">编译后的 JavaScript</TabsTrigger>
              </TabsList>
              <TabsContent value="jsx">
                <CodeBlock language="tsx">{`// JSX 语法
function Welcome() {
  return <h1>你好，React!</h1>;
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="js">
                <CodeBlock language="js">{`// 编译后的 JavaScript
function Welcome() {
  return React.createElement("h1", null, "你好，React!");
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 中的表达式</CardTitle>
            <CardDescription>
              在 JSX 中，你可以使用花括号 {"{}"} 嵌入任何 JavaScript 表达式。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <ExpressionExample />
            </div>
            <CodeBlock language="tsx">{`function Greeting() {
  const name = "小明";
  const age = 25;
  
  return (
    <div>
      <h1>你好，{name}!</h1>
      <p>你今年 {age} 岁了。</p>
      <p>明年你将会 {age + 1} 岁。</p>
      <p>{name.toUpperCase()} 是你的名字。</p>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 中的条件渲染</CardTitle>
            <CardDescription>
              你可以在 JSX 中使用条件表达式来有条件地渲染内容。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <ConditionalExamples />
              {/* <ConditionalRenderingExample /> */}
            </div>
            <Tabs defaultValue="ternary">
              <TabsList className="mb-4">
                <TabsTrigger value="ternary">三元运算符</TabsTrigger>
                <TabsTrigger value="logical">逻辑与运算符</TabsTrigger>
                <TabsTrigger value="ifelse">if-else 语句</TabsTrigger>
                <TabsTrigger value="login">登录状态</TabsTrigger>
                <TabsTrigger value="visibility">显示/隐藏</TabsTrigger>
                <TabsTrigger value="role">用户角色</TabsTrigger>
                <TabsTrigger value="loading">数据加载</TabsTrigger>
              </TabsList>
              <TabsContent value="ternary">
                <CodeBlock language="tsx">{`function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <h1>主题切换器</h1>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
      </button>
      <p>
        当前主题: {isDarkMode ? '深色模式' : '浅色模式'}
      </p>
    </div>
  );
}

function UserStatus() {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState('刚刚');

  return (
    <div>
      <h1>用户状态</h1>
      <div className="status-indicator">
        <span className={isOnline ? 'online' : 'offline'}>
          {isOnline ? '在线' : '离线'}
        </span>
        {!isOnline && <span className="last-seen">最后在线: {lastSeen}</span>}
      </div>
      <button onClick={() => setIsOnline(!isOnline)}>
        {isOnline ? '设为离线' : '设为在线'}
      </button>
    </div>
  );
}

function PriceDisplay() {
  const [price, setPrice] = useState(100);
  const [isDiscounted, setIsDiscounted] = useState(false);

  const finalPrice = isDiscounted ? price * 0.8 : price;

  return (
    <div>
      <h1>价格显示</h1>
      <div className="price">
        原价: {price}元
        {isDiscounted && <span className="discount">(8折优惠)</span>}
      </div>
      <div className="final-price">
        最终价格: {finalPrice}元
      </div>
      <button onClick={() => setIsDiscounted(!isDiscounted)}>
        {isDiscounted ? '取消优惠' : '应用优惠'}
      </button>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="logical">
                <CodeBlock language="tsx">{`function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: '新消息', read: false },
    { id: 2, message: '系统通知', read: true },
    { id: 3, message: '更新提醒', read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <h1>通知中心</h1>
      {unreadCount > 0 && (
        <div className="unread-badge">
          你有 {unreadCount} 条未读通知
        </div>
      )}
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
            {notification.message}
            {!notification.read && <span className="new-badge">新</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureFlags() {
  const [features, setFeatures] = useState({
    darkMode: true,
    notifications: false,
    analytics: true
  });

  return (
    <div>
      <h1>功能开关</h1>
      <div className="features">
        {features.darkMode && <div className="feature">深色模式已启用</div>}
        {features.notifications && <div className="feature">通知功能已启用</div>}
        {features.analytics && <div className="feature">数据分析已启用</div>}
      </div>
      <div className="controls">
        <button onClick={() => setFeatures(prev => ({ ...prev, darkMode: !prev.darkMode }))}>
          切换深色模式
        </button>
        <button onClick={() => setFeatures(prev => ({ ...prev, notifications: !prev.notifications }))}>
          切换通知
        </button>
        <button onClick={() => setFeatures(prev => ({ ...prev, analytics: !prev.analytics }))}>
          切换数据分析
        </button>
      </div>
    </div>
  );
}

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    // 模拟搜索
    const mockResults = ['结果1', '结果2', '结果3'];
    setResults(term ? mockResults : []);
  };

  return (
    <div>
      <h1>搜索</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="输入搜索内容..."
      />
      {searchTerm && results.length === 0 && (
        <div className="no-results">没有找到相关结果</div>
      )}
      {results.length > 0 && (
        <ul className="results">
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="ifelse">
                <CodeBlock language="tsx">{`function WeatherDisplay() {
  const [temperature, setTemperature] = useState(25);
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');

  let weatherMessage;
  let weatherIcon;
  let weatherClass;

  if (temperature > 30) {
    weatherMessage = '天气很热!';
    weatherIcon = '☀️';
    weatherClass = 'hot';
  } else if (temperature > 20) {
    weatherMessage = '天气适宜。';
    weatherIcon = '⛅';
    weatherClass = 'mild';
  } else {
    weatherMessage = '天气有点冷。';
    weatherIcon = '❄️';
    weatherClass = 'cold';
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
        <button onClick={() => setTemperature(prev => prev + 5)}>增加温度</button>
        <button onClick={() => setTemperature(prev => prev - 5)}>降低温度</button>
      </div>
    </div>
  );
}

function UserProfile() {
  const [user, setUser] = useState<{
    name: string;
    age: number;
    role: 'admin' | 'user' | 'guest';
  } | null>(null);

  let profileContent;

  if (!user) {
    profileContent = (
      <div className="guest">
        <h2>访客</h2>
        <p>请登录查看完整信息</p>
        <button onClick={() => setUser({ name: '张三', age: 25, role: 'user' })}>
          模拟登录
        </button>
      </div>
    );
  } else if (user.role === 'admin') {
    profileContent = (
      <div className="admin">
        <h2>管理员面板</h2>
        <p>欢迎, {user.name}!</p>
        <div className="admin-features">
          <button>管理用户</button>
          <button>系统设置</button>
          <button>查看日志</button>
        </div>
      </div>
    );
  } else {
    profileContent = (
      <div className="user">
        <h2>用户信息</h2>
        <p>姓名: {user.name}</p>
        <p>年龄: {user.age}</p>
        <div className="user-features">
          <button>编辑资料</button>
          <button>修改密码</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>用户资料</h1>
      {profileContent}
      {user && (
        <button onClick={() => setUser(null)}>退出登录</button>
      )}
    </div>
  );
}

function LoadingState() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<any>(null);

  let content;

  if (status === 'loading') {
    content = (
      <div className="loading">
        <div className="spinner"></div>
        <p>加载中...</p>
      </div>
    );
  } else if (status === 'error') {
    content = (
      <div className="error">
        <p>加载失败</p>
        <button onClick={() => setStatus('loading')}>重试</button>
      </div>
    );
  } else {
    content = (
      <div className="success">
        <h2>数据加载成功</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={() => setStatus('loading')}>重新加载</button>
      </div>
    );
  }

  return (
    <div>
      <h1>加载状态示例</h1>
      {content}
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="login">
                <CodeBlock language="tsx">{`function UserProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: '张三', email: 'zhangsan@example.com' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>欢迎回来, {user?.name}!</h1>
          <p>邮箱: {user?.email}</p>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      ) : (
        <div>
          <h1>请登录</h1>
          <button onClick={handleLogin}>登录</button>
        </div>
      )}
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="visibility">
                <CodeBlock language="tsx">{`function ToggleContent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '隐藏内容' : '显示内容'}
      </button>
      {isVisible && (
        <div className="content">
          <h2>这是隐藏的内容</h2>
          <p>点击按钮可以显示或隐藏这段内容。</p>
        </div>
      )}
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="role">
                <CodeBlock language="tsx">{`function AdminPanel() {
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>('guest');

  return (
    <div>
      <div className="role-selector">
        <button onClick={() => setUserRole('admin')}>管理员</button>
        <button onClick={() => setUserRole('user')}>普通用户</button>
        <button onClick={() => setUserRole('guest')}>访客</button>
      </div>

      <div className="content">
        <h1>控制面板</h1>
        
        {/* 所有用户可见 */}
        <div className="public-content">
          <h2>公共内容</h2>
          <p>所有用户都可以看到这个内容。</p>
        </div>

        {/* 仅管理员可见 */}
        {userRole === 'admin' && (
          <div className="admin-content">
            <h2>管理员内容</h2>
            <p>只有管理员可以看到这个内容。</p>
            <button>删除用户</button>
            <button>修改权限</button>
          </div>
        )}

        {/* 管理员和普通用户可见 */}
        {(userRole === 'admin' || userRole === 'user') && (
          <div className="user-content">
            <h2>用户内容</h2>
            <p>管理员和普通用户可以看到这个内容。</p>
            <button>编辑个人资料</button>
          </div>
        )}
      </div>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="loading">
                <CodeBlock language="tsx">{`function DataLoader() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 2000));
        setData([{ id: 1, name: '项目1' }, { id: 2, name: '项目2' }]);
        setError(null);
      } catch (err) {
        setError('加载数据时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1>数据列表</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 中的事件处理</CardTitle>
            <CardDescription>
              在 JSX 中，你可以使用事件处理函数来响应用户的交互。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <EventHandlingExample />
            </div>
            <Tabs defaultValue="click">
              <TabsList className="mb-4">
                <TabsTrigger value="click">点击事件</TabsTrigger>
                <TabsTrigger value="input">输入事件</TabsTrigger>
                <TabsTrigger value="form">表单事件</TabsTrigger>
              </TabsList>
              <TabsContent value="click">
                <CodeBlock language="tsx">{`function ClickExample() {
  const handleClick = () => {
    alert('按钮被点击了!');
  };

  return (
    <button onClick={handleClick}>
      点击我
    </button>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="input">
                <CodeBlock language="tsx">{`function InputExample() {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={value} 
        onChange={handleChange} 
        placeholder="输入一些文字..."
      />
      <p>你输入了: {value}</p>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="form">
                <CodeBlock language="tsx">{`function FormExample() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('表单已提交!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="输入一些文字..." />
      <button type="submit">提交</button>
    </form>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 中的表单处理</CardTitle>
            <CardDescription>
              在 JSX 中，你可以使用受控组件来处理表单输入。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <FormHandlingExample />
            </div>
            <Tabs defaultValue="controlled">
              <TabsList className="mb-4">
                <TabsTrigger value="controlled">受控组件</TabsTrigger>
                <TabsTrigger value="uncontrolled">非受控组件</TabsTrigger>
                <TabsTrigger value="validation">表单验证</TabsTrigger>
              </TabsList>
              <TabsContent value="controlled">
                <CodeBlock language="tsx">{`function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="姓名"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="邮箱"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="留言"
      />
    </form>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="uncontrolled">
                <CodeBlock language="tsx">{`function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    console.log(Object.fromEntries(formData));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="name" placeholder="姓名" />
      <input name="email" placeholder="邮箱" />
      <textarea name="message" placeholder="留言" />
      <button type="submit">提交</button>
    </form>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="validation">
                <CodeBlock language="tsx">{`function FormWithValidation() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = '邮箱不能为空';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }
    
    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // 提交表单
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="邮箱"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="密码"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">提交</button>
    </form>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 中的列表渲染</CardTitle>
            <CardDescription>
              使用 map() 方法在 JSX 中渲染列表。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <ListRenderingExample />
            </div>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">基本列表</TabsTrigger>
                <TabsTrigger value="filter">列表过滤</TabsTrigger>
                <TabsTrigger value="sort">列表排序</TabsTrigger>
                <TabsTrigger value="complex">复杂列表</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <CodeBlock language="tsx">{`function FruitList() {
  const fruits = ['苹果', '香蕉', '橙子', '葡萄'];
  
  return (
    <div>
      <h1>水果列表</h1>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="filter">
                <CodeBlock language="tsx">{`function FilteredList() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [filter, setFilter] = useState<'even' | 'odd'>('even');
  
  const filteredNumbers = numbers.filter(num => 
    filter === 'even' ? num % 2 === 0 : num % 2 !== 0
  );
  
  return (
    <div>
      <div>
        <button onClick={() => setFilter('even')}>显示偶数</button>
        <button onClick={() => setFilter('odd')}>显示奇数</button>
      </div>
      <ul>
        {filteredNumbers.map(num => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="sort">
                <CodeBlock language="tsx">{`function SortedList() {
  const fruits = ['苹果', '香蕉', '橙子', '葡萄'];
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const sortedFruits = [...fruits].sort((a, b) => 
    sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  );
  
  return (
    <div>
      <div>
        <button onClick={() => setSortOrder('asc')}>升序</button>
        <button onClick={() => setSortOrder('desc')}>降序</button>
      </div>
      <ul>
        {sortedFruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="complex">
                <CodeBlock language="tsx">{`function ComplexList() {
  const [items, setItems] = useState([
    { id: 1, name: '项目1', completed: false },
    { id: 2, name: '项目2', completed: true },
    { id: 3, name: '项目3', completed: false }
  ]);
  
  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };
  
  return (
    <div>
      <h1>待办事项列表</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
            />
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
            <p className="mt-4 text-muted-foreground">
              注意：在渲染列表时，每个列表项都需要一个唯一的 "key"
              属性，这有助于 React 识别哪些项发生了变化。
              在实际应用中，最好使用唯一的 ID 而不是索引作为 key。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 中的属性</CardTitle>
            <CardDescription>
              JSX 中的属性使用驼峰命名法，而不是 HTML 中的命名约定。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`function Profile() {
  return (
    <div>
      {/* HTML 类名使用 className 而不是 class */}
      <h1 className="title">个人资料</h1>
      
      {/* 内联样式使用对象而不是字符串 */}
      <p style={{ color: 'blue', fontSize: '16px' }}>
        这是一个蓝色的段落。
      </p>
      
      {/* HTML for 属性变成 htmlFor */}
      <label htmlFor="name">姓名:</label>
      <input id="name" type="text" />
      
      {/* 事件处理器使用驼峰命名法 */}
      <button onClick={() => alert('按钮被点击了!')}>
        点击我
      </button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 中的注释</CardTitle>
            <CardDescription>在 JSX 中添加注释的方法。</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="tsx">{`function Component() {
  return (
    <div>
      {/* 这是一个 JSX 注释 */}
      <h1>标题</h1>
      
      {/* 
        多行
        JSX 注释
      */}
      <p>段落</p>
      
      <div>
        文本
        {/* 行内注释 */}
        更多文本
      </div>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX 片段</CardTitle>
            <CardDescription>
              使用 React Fragment 避免添加额外的 DOM 节点。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="long">
              <TabsList className="mb-4">
                <TabsTrigger value="long">完整语法</TabsTrigger>
                <TabsTrigger value="short">简写语法</TabsTrigger>
              </TabsList>
              <TabsContent value="long">
                <CodeBlock language="tsx">{`import React from 'react';

function ListItems() {
  return (
    <React.Fragment>
      <li>项目 1</li>
      <li>项目 2</li>
      <li>项目 3</li>
    </React.Fragment>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="short">
                <CodeBlock language="tsx">{`function ListItems() {
  return (
    <>
      <li>项目 1</li>
      <li>项目 2</li>
      <li>项目 3</li>
    </>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
            <p className="mt-4 text-muted-foreground">
              Fragment 允许你将多个元素组合在一起，而不需要添加额外的 DOM 节点。
              这在创建表格行、列表项或需要特定父子关系的元素时特别有用。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
