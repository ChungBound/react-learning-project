"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 示例组件：温度转换
function TemperatureCalculatorExample() {
  const [temperature, setTemperature] = useState("")
  const [scale, setScale] = useState("c") // 'c' for Celsius, 'f' for Fahrenheit

  const handleCelsiusChange = (value: string) => {
    setTemperature(value)
    setScale("c")
  }

  const handleFahrenheitChange = (value: string) => {
    setTemperature(value)
    setScale("f")
  }

  const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature
  const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature

  return (
    <Card className="p-4 border-dashed">
      <div>
        <h3 className="text-lg font-medium mb-4">温度转换器示例</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">摄氏度 (°C):</label>
            <Input value={celsius} onChange={(e) => handleCelsiusChange(e.target.value)} placeholder="输入温度" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">华氏度 (°F):</label>
            <Input value={fahrenheit} onChange={(e) => handleFahrenheitChange(e.target.value)} placeholder="输入温度" />
          </div>
          {Number.parseFloat(temperature) >= 100 && (
            <div className="p-2 bg-red-50 text-red-700 rounded-md">水会沸腾。</div>
          )}
        </div>
      </div>
    </Card>
  )
}

// 辅助函数
function toCelsius(fahrenheit: string): number {
  return ((Number.parseFloat(fahrenheit) - 32) * 5) / 9
}

function toFahrenheit(celsius: string): number {
  return (Number.parseFloat(celsius) * 9) / 5 + 32
}

function tryConvert(temperature: string, convert: (temp: string) => number): string {
  const input = Number.parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ""
  }
  const output = convert(temperature)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

// 示例组件：共享状态
function SharedStateExample() {
  const [count, setCount] = useState(0)

  return (
    <Card className="p-4 border-dashed">
      <div>
        <h3 className="text-lg font-medium mb-4">共享状态示例</h3>
        <div className="flex flex-col gap-4">
          <ChildA count={count} setCount={setCount} />
          <ChildB count={count} setCount={setCount} />
        </div>
      </div>
    </Card>
  )
}

function ChildA({ count, setCount }: { count: number; setCount: (count: number) => void }) {
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">子组件 A</h4>
      <p>计数: {count}</p>
      <Button onClick={() => setCount(count + 1)} className="mt-2">
        从组件 A 增加
      </Button>
    </div>
  )
}

function ChildB({ count, setCount }: { count: number; setCount: (count: number) => void }) {
  return (
    <div className="p-4 border rounded-md">
      <h4 className="font-medium mb-2">子组件 B</h4>
      <p>计数: {count}</p>
      <Button onClick={() => setCount(count + 1)} className="mt-2">
        从组件 B 增加
      </Button>
    </div>
  )
}

export default function LiftingStatePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">状态提升</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是状态提升？</CardTitle>
            <CardDescription>状态提升是一种在 React 中共享状态的模式。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              状态提升是指将组件的状态移动到它们最近的共同父组件中，使多个子组件可以共享和修改同一个状态。这是 React
              中实现组件间通信的基本方式之一。
            </p>
            <p className="mb-4">
              当多个组件需要反映相同的变化数据时，建议将共享状态提升到它们最近的共同父组件中。这样，父组件可以通过 props
              将状态传递给子组件，并提供修改状态的回调函数。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>为什么需要状态提升？</CardTitle>
            <CardDescription>了解状态提升的必要性。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">状态提升在以下情况下特别有用：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>多个组件需要共享和修改相同的状态</li>
              <li>子组件之间需要相互通信</li>
              <li>需要保持组件之间的状态同步</li>
            </ul>
            <p className="mb-4">
              通过状态提升，我们可以保持单一数据源的原则，避免状态不同步的问题，并使组件之间的数据流更加清晰可预测。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>状态提升的基本步骤</CardTitle>
            <CardDescription>如何实现状态提升。</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>找到需要共享状态的组件的最近共同父组件</li>
              <li>在父组件中使用 useState 创建共享状态</li>
              <li>通过 props 将状态传递给子组件</li>
              <li>创建修改状态的函数，并通过 props 传递给子组件</li>
              <li>在子组件中使用这些 props 和函数</li>
            </ol>
            <CodeBlock language="tsx">{`import { useState } from 'react';

// 父组件
function Parent() {
  // 步骤 2: 在父组件中创建共享状态
  const [count, setCount] = useState(0);
  
  // 步骤 4: 创建修改状态的函数
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <h1>父组件</h1>
      <p>计数: {count}</p>
      
      {/* 步骤 3 & 5: 通过 props 传递状态和函数给子组件 */}
      <ChildA count={count} onIncrement={handleIncrement} />
      <ChildB count={count} onIncrement={handleIncrement} />
    </div>
  );
}

// 子组件 A
function ChildA({ count, onIncrement }) {
  return (
    <div>
      <h2>子组件 A</h2>
      <p>计数: {count}</p>
      <button onClick={onIncrement}>从组件 A 增加</button>
    </div>
  );
}

// 子组件 B
function ChildB({ count, onIncrement }) {
  return (
    <div>
      <h2>子组件 B</h2>
      <p>计数: {count}</p>
      <button onClick={onIncrement}>从组件 B 增加</button>
    </div>
  );
}`}</CodeBlock>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
              <SharedStateExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实际示例：温度转换器</CardTitle>
            <CardDescription>一个使用状态提升的实际例子。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              下面是一个温度转换器的例子，它允许用户在摄氏度和华氏度之间转换。两个输入框需要保持同步，这是通过状态提升实现的。
            </p>
            <CodeBlock language="tsx">{`import { useState } from 'react';

// 温度输入组件
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const handleChange = (e) => {
    onTemperatureChange(e.target.value);
  };
  
  return (
    <div>
      <label>
        温度 ({scale === 'c' ? '摄氏度' : '华氏度'}):
        <input
          value={temperature}
          onChange={handleChange}
          placeholder="输入温度"
        />
      </label>
    </div>
  );
}

// 温度计算器组件
function TemperatureCalculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c'); // 'c' for Celsius, 'f' for Fahrenheit
  
  const handleCelsiusChange = (value) => {
    setTemperature(value);
    setScale('c');
  };
  
  const handleFahrenheitChange = (value) => {
    setTemperature(value);
    setScale('f');
  };
  
  // 计算温度值
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
  
  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      {parseFloat(temperature) >= 100 && (
        <p>水会沸腾。</p>
      )}
    </div>
  );
}

// 辅助函数
function toCelsius(fahrenheit) {
  return ((parseFloat(fahrenheit) - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (parseFloat(celsius) * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(temperature);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}`}</CodeBlock>

            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">实时示例：</h4>
              <TemperatureCalculatorExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>状态提升的优缺点</CardTitle>
            <CardDescription>了解状态提升的优势和局限性。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">优点</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>保持单一数据源，避免状态不同步</li>
                  <li>使组件之间的数据流更加清晰可预测</li>
                  <li>简化组件间通信</li>
                  <li>便于调试和追踪状态变化</li>
                  <li>不需要额外的库或工具</li>
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">缺点</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>可能导致 props 层层传递（props drilling）</li>
                  <li>随着应用规模增长，状态管理变得复杂</li>
                  <li>父组件可能变得臃肿</li>
                  <li>对于深层嵌套的组件结构效率较低</li>
                  <li>可能需要重构组件层次结构</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              对于简单到中等复杂度的应用，状态提升是一种有效的状态共享方式。对于更复杂的应用，可能需要考虑使用 Context
              API 或状态管理库（如 Redux、Zustand 等）。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>状态提升与其他状态管理方式的比较</CardTitle>
            <CardDescription>了解何时使用状态提升，何时使用其他方式。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">方式</th>
                    <th className="border p-2 text-left">适用场景</th>
                    <th className="border p-2 text-left">优点</th>
                    <th className="border p-2 text-left">缺点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">状态提升</td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>简单组件间通信</li>
                        <li>相邻组件共享状态</li>
                        <li>组件层次结构简单</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>简单直接</li>
                        <li>不需要额外库</li>
                        <li>数据流清晰</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>props drilling</li>
                        <li>不适合复杂应用</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Context API</td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>跨多层级组件共享状态</li>
                        <li>中等复杂度应用</li>
                        <li>主题、用户信息等全局状态</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>避免 props drilling</li>
                        <li>内置于 React</li>
                        <li>适中的复杂度</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>可能导致不必要的重渲染</li>
                        <li>不适合频繁更新的状态</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      状态管理库
                      <br />
                      (Redux, Zustand等)
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>大型复杂应用</li>
                        <li>复杂的状态逻辑</li>
                        <li>需要中间件（如异步操作）</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>集中式状态管理</li>
                        <li>强大的开发工具</li>
                        <li>可预测性和可测试性</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>学习曲线陡峭</li>
                        <li>样板代码较多</li>
                        <li>小应用可能过度设计</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              选择合适的状态管理方式应该基于应用的复杂度、团队的熟悉程度以及具体的需求。对于简单的应用，状态提升通常是最佳选择；对于中等复杂度的应用，Context
              API 可能更合适；对于大型复杂应用，专门的状态管理库可能是必要的。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>使用状态提升的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>保持状态尽可能低</strong>
                ：只有在确实需要共享状态时才进行状态提升，否则应该将状态保持在使用它的组件内部。
              </li>
              <li>
                <strong>避免过度提升</strong>：不要将所有状态都提升到顶层组件，这会使顶层组件变得臃肿且难以维护。
              </li>
              <li>
                <strong>使用函数式更新</strong>：当新状态依赖于旧状态时，使用函数式更新（如{" "}
                <code>setCount(prevCount =&gt; prevCount + 1)</code>）。
              </li>
              <li>
                <strong>合理拆分组件</strong>：将大型组件拆分为更小的组件，使状态提升更加精确和有效。
              </li>
              <li>
                <strong>使用 TypeScript</strong>：为 props 定义明确的类型，提高代码的可读性和类型安全性。
              </li>
              <li>
                <strong>考虑使用 Context</strong>：当状态需要在多个层级的组件间共享时，考虑使用 Context API
                代替深层次的状态提升。
              </li>
              <li>
                <strong>使用自定义钩子</strong>：将复杂的状态逻辑封装在自定义钩子中，使组件代码更加简洁。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 使用自定义钩子封装共享状态逻辑
import { useState } from 'react';

// 自定义钩子
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// 父组件
function Parent() {
  // 使用自定义钩子
  const { count, increment, decrement, reset } = useCounter();
  
  return (
    <div>
      <h1>父组件</h1>
      <p>计数: {count}</p>
      <button onClick={reset}>重置</button>
      
      <ChildA onIncrement={increment} />
      <ChildB onDecrement={decrement} />
    </div>
  );
}

// 子组件 A
function ChildA({ onIncrement }) {
  return (
    <div>
      <h2>子组件 A</h2>
      <button onClick={onIncrement}>增加</button>
    </div>
  );
}

// 子组件 B
function ChildB({ onDecrement }) {
  return (
    <div>
      <h2>子组件 B</h2>
      <button onClick={onDecrement}>减少</button>
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
