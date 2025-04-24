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
import { createContext, useContext, useState, ReactNode } from "react";

// 示例：简单的选项卡组件
const TabContext = createContext<
  | {
      activeTab: string;
      setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

function TabContainer({
  children,
  defaultTab,
}: {
  children: ReactNode;
  defaultTab: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="border rounded-md overflow-hidden">{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="flex border-b bg-muted">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("Tab must be used within a TabContainer");
  }
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      className={`px-4 py-2 ${
        isActive ? "bg-background font-medium" : "hover:bg-background/50"
      }`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("TabPanel must be used within a TabContainer");
  }
  const { activeTab } = context;

  if (activeTab !== id) return null;

  return <div>{children}</div>;
}

// 组合使用
function CompoundComponentExample() {
  return (
    <TabContainer defaultTab="tab1">
      <TabList>
        <Tab id="tab1">选项卡 1</Tab>
        <Tab id="tab2">选项卡 2</Tab>
        <Tab id="tab3">选项卡 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="tab1">
          <p>这是选项卡 1 的内容</p>
        </TabPanel>
        <TabPanel id="tab2">
          <p>这是选项卡 2 的内容</p>
        </TabPanel>
        <TabPanel id="tab3">
          <p>这是选项卡 3 的内容</p>
        </TabPanel>
      </TabPanels>
    </TabContainer>
  );
}

export default function CompoundComponentsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">组合组件</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>什么是组合组件？</CardTitle>
            <CardDescription>
              组合组件是一种设计模式，用于创建具有共享状态的组件集合。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              组合组件（Compound Components）是一种 React
              设计模式，它允许创建由多个组件组成的
              API，这些组件一起工作并共享状态，但每个组件都有自己的职责。这种模式提供了更具声明性和灵活性的
              API，使组件的使用更加直观。
            </p>
            <p className="mb-4">
              组合组件通常由一个父组件和多个子组件组成，父组件负责管理状态并通过
              Context 或 props 将状态传递给子组件。子组件则负责渲染 UI
              的特定部分。
            </p>
            <CodeBlock language="tsx">{`// 组合组件的基本结构
<Menu>
  <Menu.Button>点击我</Menu.Button>
  <Menu.List>
    <Menu.Item>选项 1</Menu.Item>
    <Menu.Item>选项 2</Menu.Item>
  </Menu.List>
</Menu>`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>组合组件的工作原理</CardTitle>
            <CardDescription>
              了解组合组件如何共享状态和协同工作。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              组合组件的核心是状态共享和组件组合。通常有两种实现方式：
            </p>
            <ol className="list-decimal list-inside space-y-1 mb-4">
              <li>使用 React Context 在组件之间共享状态</li>
              <li>使用 React.Children.map 克隆子组件并注入 props</li>
            </ol>
            <Tabs defaultValue="context">
              <TabsList className="mb-4">
                <TabsTrigger value="context">使用 Context</TabsTrigger>
                <TabsTrigger value="children">使用 Children API</TabsTrigger>
              </TabsList>
              <TabsContent value="context">
                <CodeBlock language="tsx">{`// 使用 Context 实现组合组件
import { createContext, useContext, useState } from 'react';

// 创建 Context
const ToggleContext = createContext();

// 父组件
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  
  const toggle = () => setOn(!on);
  
  // 提供 Context 值
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// 子组件
Toggle.Button = function ToggleButton() {
  const { on, toggle } = useContext(ToggleContext);
  
  return (
    <button onClick={toggle}>
      {on ? '关闭' : '打开'}
    </button>
  );
};

Toggle.Display = function ToggleDisplay() {
  const { on } = useContext(ToggleContext);
  
  return on ? <div>已打开</div> : <div>已关闭</div>;
};

// 使用组合组件
function App() {
  return (
    <Toggle>
      <Toggle.Button />
      <Toggle.Display />
    </Toggle>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="children">
                <CodeBlock language="tsx">{`// 使用 Children API 实现组合组件
import { Children, cloneElement, useState } from 'react';

// 父组件
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  
  const toggle = () => setOn(!on);
  
  // 克隆子组件并注入 props
  return Children.map(children, child => {
    return cloneElement(child, { on, toggle });
  });
}

// 子组件
Toggle.Button = function ToggleButton({ on, toggle }) {
  return (
    <button onClick={toggle}>
      {on ? '关闭' : '打开'}
    </button>
  );
};

Toggle.Display = function ToggleDisplay({ on }) {
  return on ? <div>已打开</div> : <div>已关闭</div>;
};

// 使用组合组件
function App() {
  return (
    <Toggle>
      <Toggle.Button />
      <Toggle.Display />
    </Toggle>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
            <p className="mt-4">
              使用 Context
              的方法更加灵活，因为它不要求子组件是直接子元素，而使用 Children
              API 的方法更加直接，但限制了组件的嵌套结构。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>组合组件的优势</CardTitle>
            <CardDescription>了解组合组件相比其他模式的优势。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>声明式 API</strong>：组合组件提供了更加声明式的
                API，使组件的使用更加直观和易于理解。
              </li>
              <li>
                <strong>灵活的组合</strong>
                ：用户可以自由组合子组件，根据需要选择包含哪些部分，以及如何排列它们。
              </li>
              <li>
                <strong>封装复杂性</strong>
                ：组合组件可以封装复杂的状态管理和交互逻辑，同时提供简单的 API。
              </li>
              <li>
                <strong>关注点分离</strong>
                ：每个子组件只关注自己的职责，使代码更加模块化和可维护。
              </li>
              <li>
                <strong>更好的重用性</strong>
                ：组合组件可以在不同的上下文中重用，因为它们的结构是灵活的。
              </li>
            </ul>
            <p className="mt-4">
              相比于传统的 props 传递或高阶组件，组合组件提供了更加灵活和直观的
              API，特别适合构建复杂的 UI 组件，如表单、菜单、选项卡等。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>实现一个选项卡组件</CardTitle>
            <CardDescription>
              使用组合组件模式实现一个选项卡组件。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              下面是一个使用组合组件模式实现的选项卡组件示例：
            </p>
            <CodeBlock language="tsx">{`import { createContext, useContext, useState } from 'react';

// 创建 Context
const TabContext = createContext<{ activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);

// 父组件
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

// 选项卡列表
Tabs.List = function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
};

// 选项卡按钮
Tabs.Tab = function Tab({ children, id }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isActive = activeTab === id;
  
  return (
    <button
      className={\`tab \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

// 选项卡面板容器
Tabs.Panels = function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
};

// 选项卡面板
Tabs.Panel = function TabPanel({ children, id }) {
  const { activeTab } = useContext(TabContext);
  
  if (activeTab !== id) return null;
  
  return <div className="tab-panel">{children}</div>;
};

// 使用组合组件
function App() {
  return (
    <Tabs defaultTab="tab1">
      <Tabs.List>
        <Tabs.Tab id="tab1">选项卡 1</Tabs.Tab>
        <Tabs.Tab id="tab2">选项卡 2</Tabs.Tab>
        <Tabs.Tab id="tab3">选项卡 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel id="tab1">
          <p>这是选项卡 1 的内容</p>
        </Tabs.Panel>
        <Tabs.Panel id="tab2">
          <p>这是选项卡 2 的内容</p>
        </Tabs.Panel>
        <Tabs.Panel id="tab3">
          <p>这是选项卡 3 的内容</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}`}</CodeBlock>
            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                实时示例：
              </h4>
              <CompoundComponentExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>组合组件的最佳实践</CardTitle>
            <CardDescription>使用组合组件时的一些最佳实践。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>使用 Context 共享状态</strong>：对于复杂的组件，使用
                Context 是共享状态的最佳方式，因为它不限制组件的嵌套结构。
              </li>
              <li>
                <strong>提供合理的默认值</strong>：为 Context
                提供合理的默认值，这样即使在没有 Provider
                的情况下，组件也能正常工作。
              </li>
              <li>
                <strong>使用静态属性</strong>
                ：将子组件作为父组件的静态属性，这样可以提供更好的开发体验和代码组织。
              </li>
              <li>
                <strong>提供类型定义</strong>：使用 TypeScript
                为组件提供类型定义，这样可以提供更好的类型检查和代码补全。
              </li>
              <li>
                <strong>考虑可访问性</strong>
                ：确保组件符合可访问性标准，如正确的 ARIA 属性、键盘导航等。
              </li>
              <li>
                <strong>提供文档和示例</strong>
                ：为组件提供清晰的文档和示例，说明如何使用组件以及各个子组件的作用。
              </li>
            </ul>
            <CodeBlock
              language="tsx"
              className="mt-4"
            >{`// 使用 TypeScript 的组合组件示例
import { createContext, useContext, useState, ReactNode } from 'react';

// 定义 Context 类型
interface TabContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

// 创建 Context 并提供默认值
const TabContext = createContext<TabContextType>({
  activeTab: '',
  setActiveTab: () => {}
});

// 定义组件 Props 类型
interface TabsProps {
  children: ReactNode;
  defaultTab: string;
}

interface TabProps {
  children: ReactNode;
  id: string;
}

// 父组件
function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

// 子组件
Tabs.List = function TabList({ children }: { children: ReactNode }) {
  return <div className="tab-list">{children}</div>;
};

Tabs.Tab = function Tab({ children, id }: TabProps) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isActive = activeTab === id;
  
  return (
    <button
      className={\`tab \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveTab(id)}
      aria-selected={isActive}
      role="tab"
      id={\`tab-\${id}\`}
      aria-controls={\`panel-\${id}\`}
    >
      {children}
    </button>
  );
};

Tabs.Panels = function TabPanels({ children }: { children: ReactNode }) {
  return <div className="tab-panels">{children}</div>;
};

Tabs.Panel = function TabPanel({ children, id }: TabProps) {
  const { activeTab } = useContext(TabContext);
  const isActive = activeTab === id;
  
  return (
    <div
      className="tab-panel"
      role="tabpanel"
      id={\`panel-\${id}\`}
      aria-labelledby={\`tab-\${id}\`}
      hidden={!isActive}
    >
      {isActive && children}
    </div>
  );
};

// 导出组件
export { Tabs };`}</CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>组合组件 vs 其他模式</CardTitle>
            <CardDescription>比较组合组件与其他 React 模式。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              组合组件是 React
              中众多设计模式之一，下面比较它与其他常见模式的异同：
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">模式</th>
                    <th className="border p-2 text-left">优点</th>
                    <th className="border p-2 text-left">缺点</th>
                    <th className="border p-2 text-left">适用场景</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">组合组件</td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>声明式 API</li>
                        <li>灵活的组合</li>
                        <li>关注点分离</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>可能导致组件嵌套</li>
                        <li>需要额外的 Context 设置</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>复杂 UI 组件</li>
                        <li>需要灵活组合的组件</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">高阶组件</td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>代码复用</li>
                        <li>关注点分离</li>
                        <li>无需额外的 JSX</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>props 命名冲突</li>
                        <li>组件嵌套地狱</li>
                        <li>难以追踪 props 来源</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>横切关注点</li>
                        <li>条件渲染</li>
                        <li>props 操作</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Render Props</td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>灵活的渲染控制</li>
                        <li>明确的数据流</li>
                        <li>避免命名冲突</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>回调地狱</li>
                        <li>难以组合多个</li>
                        <li>性能问题</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>共享状态或行为</li>
                        <li>动态渲染</li>
                        <li>条件渲染</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Hooks</td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>简洁的代码</li>
                        <li>逻辑复用</li>
                        <li>避免嵌套地狱</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>必须遵循 Hook 规则</li>
                        <li>不适合复杂 UI 组合</li>
                        <li>学习曲线</li>
                      </ul>
                    </td>
                    <td className="border p-2">
                      <ul className="list-disc list-inside">
                        <li>状态逻辑复用</li>
                        <li>简单的状态管理</li>
                        <li>副作用处理</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              在实际开发中，这些模式可以结合使用，以发挥各自的优势。例如，可以使用
              Hooks 管理状态逻辑，同时使用组合组件创建灵活的 UI 组件。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
