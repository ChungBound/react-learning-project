"use client"

import { TabsContent } from "@/components/ui/tabs"

import { TabsTrigger } from "@/components/ui/tabs"

import { TabsList } from "@/components/ui/tabs"

import { Tabs } from "@/components/ui/tabs"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"
import { useState, memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 示例组件：基本 memo 示例
function MemoExample() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">React.memo 示例</h3>
        <p className="text-sm text-muted-foreground">查看控制台以了解组件重新渲染的情况</p>

        <div className="space-y-2">
          <p>计数: {count}</p>
          <Button onClick={() => setCount(count + 1)}>增加计数</Button>
        </div>

        <div className="space-y-2">
          <p>文本: {text || "(空)"}</p>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入文本..."
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <RegularChildComponent text={text} />
          <MemoizedChildComponent text={text} />
        </div>
      </div>
    </Card>
  )
}

// 普通子组件
function RegularChildComponent({ text }: { text: string }) {
  console.log("RegularChildComponent 渲染")
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">普通组件</h4>
      <p className="text-sm">文本: {text || "(空)"}</p>
      <p className="text-xs text-muted-foreground mt-2">每次父组件渲染时都会重新渲染</p>
    </div>
  )
}

// 使用 memo 包装的子组件
const MemoizedChildComponent = memo(function MemoizedChildComponent({ text }: { text: string }) {
  console.log("MemoizedChildComponent 渲染")
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">使用 memo 的组件</h4>
      <p className="text-sm">文本: {text || "(空)"}</p>
      <p className="text-xs text-muted-foreground mt-2">只有当 props 变化时才会重新渲染</p>
    </div>
  )
})

// 示例组件：带有回调函数的 memo 示例
function MemoWithCallbackExample() {
  const [count, setCount] = useState(0)

  // 不使用 useCallback - 每次渲染都会创建新函数
  const handleClickWithoutCallback = () => {
    console.log("handleClickWithoutCallback 被调用")
  }

  // 使用 useCallback - 函数引用保持稳定
  const handleClickWithCallback = useCallback(() => {
    console.log("handleClickWithCallback 被调用")
  }, [])

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">带回调函数的 memo 示例</h3>
        <p className="text-sm text-muted-foreground">查看控制台以了解组件重新渲染的情况</p>

        <div className="space-y-2">
          <p>计数: {count}</p>
          <Button onClick={() => setCount(count + 1)}>增加计数</Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <MemoizedButtonWithoutCallback onClick={handleClickWithoutCallback} />
          <MemoizedButtonWithCallback onClick={handleClickWithCallback} />
        </div>
      </div>
    </Card>
  )
}

// 使用 memo 包装的按钮组件
const MemoizedButtonWithoutCallback = memo(function MemoizedButtonWithoutCallback({
  onClick,
}: {
  onClick: () => void
}) {
  console.log("MemoizedButtonWithoutCallback 渲染")
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">无 useCallback</h4>
      <Button variant="outline" onClick={onClick}>
        点击我
      </Button>
      <p className="text-xs text-muted-foreground mt-2">每次父组件渲染时都会重新渲染</p>
    </div>
  )
})

const MemoizedButtonWithCallback = memo(function MemoizedButtonWithCallback({
  onClick,
}: {
  onClick: () => void
}) {
  console.log("MemoizedButtonWithCallback 渲染")
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">使用 useCallback</h4>
      <Button variant="outline" onClick={onClick}>
        点击我
      </Button>
      <p className="text-xs text-muted-foreground mt-2">只有当回调函数变化时才会重新渲染</p>
    </div>
  )
})

// 示例组件：带有自定义比较函数的 memo 示例
function MemoWithCustomCompareExample() {
  const [user, setUser] = useState({ id: 1, name: "张三", age: 25 })

  const updateName = () => {
    setUser({ ...user, name: user.name === "张三" ? "李四" : "张三" })
  }

  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 })
  }

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">自定义比较函数示例</h3>
        <p className="text-sm text-muted-foreground">查看控制台以了解组件重新渲染的情况</p>

        <div className="p-4 bg-muted rounded-md">
          <p>用户 ID: {user.id}</p>
          <p>用户名: {user.name}</p>
          <p>年龄: {user.age}</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={updateName}>更改名称</Button>
          <Button variant="outline" onClick={updateAge}>
            增加年龄
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <RegularMemoComponent user={user} />
          <CustomMemoComponent user={user} />
        </div>
      </div>
    </Card>
  )
}

// 使用普通 memo 的组件
const RegularMemoComponent = memo(function RegularMemoComponent({
  user,
}: { user: { id: number; name: string; age: number } }) {
  console.log("RegularMemoComponent 渲染")
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">普通 memo</h4>
      <p className="text-sm">
        用户: {user.name}, {user.age}岁
      </p>
      <p className="text-xs text-muted-foreground mt-2">当任何属性变化时都会重新渲染</p>
    </div>
  )
})

// 使用自定义比较函数的 memo 组件
const CustomMemoComponent = memo(
  function CustomMemoComponent({ user }: { user: { id: number; name: string; age: number } }) {
    console.log("CustomMemoComponent 渲染")
    return (
      <div className="p-4 border rounded-md">
        <h4 className="font-medium mb-2">自定义比较函数</h4>
        <p className="text-sm">
          用户: {user.name}, {user.age}岁
        </p>
        <p className="text-xs text-muted-foreground mt-2">只有当名称变化时才会重新渲染</p>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // 只有当名称变化时才重新渲染
    return prevProps.user.name === nextProps.user.name
  },
)

export default function MemoPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">React.memo</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是 React.memo？</CardTitle>
            <CardDescription>React.memo 是一个高阶组件，用于优化函数组件的性能。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>React.memo</code> 是一个高阶组件，它接收一个组件作为参数，并返回一个新的记忆化组件。当组件的 props
              没有变化时，这个记忆化组件会重用上一次渲染的结果，而不是重新渲染。
            </p>
            <CodeBlock language="tsx">{`import { memo } from 'react';

// 基本语法
const MemoizedComponent = memo(function MyComponent(props) {
  // 组件逻辑
  return <div>{props.value}</div>;
});

// 或者使用箭头函数
const MemoizedComponent = memo((props) => {
  // 组件逻辑
  return <div>{props.value}</div>;
});`}</CodeBlock>
            <p className="mt-4">
              <code>React.memo</code> 只检查 props 的变化。如果你的组件在相同 props 的情况下渲染不同的结果，或者依赖于
              context 或全局状态，那么 <code>React.memo</code> 可能不会带来性能提升。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>为什么使用 React.memo？</CardTitle>
            <CardDescription>了解 React.memo 的使用场景和好处。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              使用 <code>React.memo</code> 主要有以下原因：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>避免不必要的重新渲染，提高性能</li>
              <li>减少渲染时间，特别是对于复杂的组件</li>
              <li>减少 CPU 和内存使用</li>
              <li>提高用户体验，特别是在低性能设备上</li>
            </ul>
            <p className="mb-4">
              但请记住，<code>React.memo</code> 本身也有成本。对于简单的组件或很少重新渲染的组件，使用{" "}
              <code>React.memo</code> 可能不会带来明显的性能提升，甚至可能导致性能下降。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>React.memo 示例</CardTitle>
            <CardDescription>几个使用 React.memo 的实际例子。</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">基本用法</TabsTrigger>
                <TabsTrigger value="callback">回调函数</TabsTrigger>
                <TabsTrigger value="custom">自定义比较</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <CodeBlock language="tsx">{`import { useState, memo } from 'react';

// 普通子组件
function RegularComponent({ text }) {
  console.log('RegularComponent 渲染');
  return (
    <div>
      <h2>普通组件</h2>
      <p>{text}</p>
    </div>
  );
}

// 使用 memo 包装的子组件
const MemoizedComponent = memo(function MemoizedComponent({ text }) {
  console.log('MemoizedComponent 渲染');
  return (
    <div>
      <h2>使用 memo 的组件</h2>
      <p>{text}</p>
    </div>
  );
});

// 父组件
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        增加计数: {count}
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入文本..."
      />
      
      <RegularComponent text={text} />
      <MemoizedComponent text={text} />
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <MemoExample />
                </div>
              </TabsContent>
              <TabsContent value="callback">
                <CodeBlock language="tsx">{`import { useState, memo, useCallback } from 'react';

// 使用 memo 包装的按钮组件
const MemoizedButton = memo(function MemoizedButton({ onClick, label }) {
  console.log(\`\${label} 按钮渲染\`);
  
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
});

// 父组件
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // 不使用 useCallback - 每次渲染都会创建新函数
  const handleClickWithoutCallback = () => {
    console.log('点击处理函数（无 useCallback）被调用');
  };
  
  // 使用 useCallback - 函数引用保持稳定
  const handleClickWithCallback = useCallback(() => {
    console.log('点击处理函数（使用 useCallback）被调用');
  }, []);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      
      <MemoizedButton
        onClick={handleClickWithoutCallback}
        label="无 useCallback"
      />
      
      <MemoizedButton
        onClick={handleClickWithCallback}
        label="使用 useCallback"
      />
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <MemoWithCallbackExample />
                </div>
              </TabsContent>
              <TabsContent value="custom">
                <CodeBlock language="tsx">{`import { useState, memo } from 'react';

// 使用自定义比较函数的 memo 组件
const CustomMemoComponent = memo(
  function CustomMemoComponent({ user }) {
    console.log('CustomMemoComponent 渲染');
    
    return (
      <div>
        <h2>自定义比较函数</h2>
        <p>用户: {user.name}, {user.age}岁</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // 只有当名称变化时才重新渲染
    return prevProps.user.name === nextProps.user.name;
  }
);

// 父组件
function ParentComponent() {
  const [user, setUser] = useState({
    id: 1,
    name: '张三',
    age: 25
  });
  
  const updateName = () => {
    setUser({ ...user, name: user.name === '张三' ? '李四' : '张三' });
  };
  
  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };
  
  return (
    <div>
      <p>用户: {user.name}, {user.age}岁</p>
      <button onClick={updateName}>更改名称</button>
      <button onClick={updateAge}>增加年龄</button>
      
      <CustomMemoComponent user={user} />
    </div>
  );
}`}</CodeBlock>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
                  <MemoWithCustomCompareExample />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>React.memo vs React.PureComponent</CardTitle>
            <CardDescription>了解 React.memo 和 React.PureComponent 的区别。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>React.memo</code> 和 <code>React.PureComponent</code> 都是用于性能优化的 React
              特性，但它们有不同的用途：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">React.memo</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>用于函数组件</li>
                  <li>是一个高阶组件</li>
                  <li>默认浅比较 props</li>
                  <li>可以自定义比较函数</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`// React.memo 示例
const MemoizedComponent = memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});`}</CodeBlock>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">React.PureComponent</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>用于类组件</li>
                  <li>是一个基类</li>
                  <li>默认浅比较 props 和 state</li>
                  <li>不能自定义比较逻辑</li>
                </ul>
                <CodeBlock language="tsx" className="mt-2">{`// React.PureComponent 示例
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}`}</CodeBlock>
              </div>
            </div>
            <p className="mt-4">
              在现代 React 开发中，推荐使用函数组件和 <code>React.memo</code>，而不是类组件和{" "}
              <code>React.PureComponent</code>。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>React.memo 与 useCallback 和 useMemo</CardTitle>
            <CardDescription>如何结合使用 React.memo、useCallback 和 useMemo。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <code>React.memo</code>、<code>useCallback</code> 和 <code>useMemo</code>{" "}
              经常一起使用，以获得最佳的性能优化效果：
            </p>
            <CodeBlock language="tsx">{`import { useState, memo, useCallback, useMemo } from 'react';

// 使用 memo 包装的子组件
const MemoizedChild = memo(function MemoizedChild({
  name,
  age,
  onClick
}) {
  console.log('MemoizedChild 渲染');
  
  return (
    <div>
      <p>名称: {name}</p>
      <p>年龄: {age}</p>
      <button onClick={onClick}>点击我</button>
    </div>
  );
});

// 父组件
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('张三');
  const [age, setAge] = useState(25);
  
  // 使用 useCallback 记忆化回调函数
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
  }, []);
  
  // 使用 useMemo 记忆化对象
  const user = useMemo(() => {
    return { name, age };
  }, [name, age]);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入名称"
      />
      <button onClick={() => setAge(age + 1)}>增加年龄</button>
      
      {/* 
        使用 useMemo 创建的对象和 useCallback 创建的函数
        作为 props 传递给使用 memo 包装的组件
      */}
      <MemoizedChild
        name={user.name}
        age={user.age}
        onClick={handleClick}
      />
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">这三个 API 的组合使用：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <code>React.memo</code> 防止子组件在 props 没有变化时重新渲染
              </li>
              <li>
                <code>useCallback</code> 确保传递给子组件的函数引用保持稳定
              </li>
              <li>
                <code>useMemo</code> 确保传递给子组件的对象引用保持稳定
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>React.memo 的性能考虑</CardTitle>
            <CardDescription>何时使用 React.memo，何时不使用。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              虽然 <code>React.memo</code> 可以提高性能，但它并不是万能的。以下是一些使用 <code>React.memo</code>{" "}
              的注意事项：
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">何时使用 React.memo</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>组件经常重新渲染</li>
                  <li>组件渲染开销大</li>
                  <li>组件的 props 很少变化</li>
                  <li>组件接收的 props 是原始值或稳定的引用</li>
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">何时不使用 React.memo</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>组件很简单，渲染开销小</li>
                  <li>组件的 props 经常变化</li>
                  <li>组件依赖于 context 或全局状态</li>
                  <li>组件接收的 props 是不稳定的引用</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              记住，<code>React.memo</code> 本身也有成本。它需要进行 props
              比较，并存储上一次渲染的结果。在某些情况下，过度使用 <code>React.memo</code>{" "}
              可能会导致性能下降而不是提升。
            </p>
            <CodeBlock language="tsx" className="mt-4">{`// 不需要 React.memo 的例子
function SimpleComponent({ value }) {
  return <span>{value}</span>;
}

// 需要 React.memo 的例子
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // 假设这是一个复杂的组件，渲染开销大
  return (
    <div>
      {data.map(item => (
        <ComplexItem key={item.id} item={item} />
      ))}
    </div>
  );
});`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>使用 React.memo 的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>不要过早优化</strong>：只有在确实遇到性能问题时才使用 <code>React.memo</code>。
              </li>
              <li>
                <strong>使用 DevTools Profiler</strong>：使用 React DevTools Profiler 来确定哪些组件需要优化。
              </li>
              <li>
                <strong>结合 useCallback 和 useMemo</strong>：对于传递给记忆化组件的函数和对象，使用{" "}
                <code>useCallback</code> 和 <code>useMemo</code> 保持引用稳定。
              </li>
              <li>
                <strong>考虑使用自定义比较函数</strong>：对于复杂的 props，考虑使用自定义比较函数来优化比较逻辑。
              </li>
              <li>
                <strong>避免内联对象和函数</strong>：避免在渲染时创建新的对象和函数，这会导致记忆化失效。
              </li>
              <li>
                <strong>拆分组件</strong>：将大型组件拆分为更小的组件，并对频繁变化的部分和稳定的部分进行分离。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 不好的做法 - 内联对象和函数
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        增加计数: {count}
      </button>
      
      {/* 每次渲染都会创建新的对象和函数，导致 MemoizedChild 总是重新渲染 */}
      <MemoizedChild
        user={{ name: '张三', age: 25 }}
        onClick={() => console.log('按钮被点击')}
      />
    </div>
  );
}

// 好的做法 - 使用 useMemo 和 useCallback
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // 使用 useMemo 记忆化对象
  const user = useMemo(() => {
    return { name: '张三', age: 25 };
  }, []);
  
  // 使用 useCallback 记忆化函数
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        增加计数: {count}
      </button>
      
      {/* 使用记忆化的对象和函数，MemoizedChild 不会重新渲染 */}
      <MemoizedChild
        user={user}
        onClick={handleClick}
      />
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
