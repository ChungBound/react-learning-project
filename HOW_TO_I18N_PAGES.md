# 如何国际化页面指南 / How to Internationalize Pages

## 概述

本指南说明如何将现有的中文页面转换为支持中英文切换的国际化页面。

## 基本步骤

### 步骤 1: 在翻译文件中添加翻译键

在 `messages/zh.json` 和 `messages/en.json` 中添加对应的翻译。

**示例结构：**

```json
{
  "pages": {
    "yourPage": {
      "title": "页面标题",
      "section1": {
        "title": "第一部分标题",
        "description": "第一部分描述",
        "content": "第一部分内容"
      }
    }
  }
}
```

### 步骤 2: 更新页面组件

#### 2.1 导入 useTranslations

```tsx
"use client";

import { useTranslations } from "next-intl";
```

#### 2.2 在组件中使用翻译

```tsx
export default function YourPage() {
  const t = useTranslations("pages.yourPage");
  
  return (
    <div>
      <h1>{t("title")}</h1>
      {/* 其他内容 */}
    </div>
  );
}
```

### 步骤 3: 处理代码示例

**重要原则：代码注释统一使用英文（业界标准）**

#### 之前（中文注释）：

```tsx
<CodeBlock language="tsx">{`import { useState } from 'react';

function Counter() {
  // 声明一个名为 "count" 的状态变量，初始值为 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}`}</CodeBlock>
```

#### 之后（英文注释）：

```tsx
<CodeBlock language="tsx">{`import { useState } from 'react';

function Counter() {
  // Declare a state variable called "count" with initial value of 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}</CodeBlock>
```

**注意：** 代码示例中的文本也应该使用英文，使代码更加通用和专业。

## 完整示例

### 原始中文页面

```tsx
"use client";

export default function ExamplePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">示例页面</h1>

      <Card>
        <CardHeader>
          <CardTitle>这是一个示例</CardTitle>
          <CardDescription>这是描述文本</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            这是一些内容文本。
          </p>
          <CodeBlock language="tsx">{`// 示例代码
function Example() {
  const [count, setCount] = useState(0);
  return <div>计数: {count}</div>;
}`}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 国际化后的页面

#### 1. 添加翻译（messages/zh.json）

```json
{
  "pages": {
    "example": {
      "title": "示例页面",
      "section1": {
        "title": "这是一个示例",
        "description": "这是描述文本",
        "content": "这是一些内容文本。"
      }
    }
  }
}
```

#### 2. 添加翻译（messages/en.json）

```json
{
  "pages": {
    "example": {
      "title": "Example Page",
      "section1": {
        "title": "This is an Example",
        "description": "This is description text",
        "content": "This is some content text."
      }
    }
  }
}
```

#### 3. 更新页面组件

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CodeBlock from "@/components/code-block";

export default function ExamplePage() {
  const t = useTranslations("pages.example");

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("section1.title")}</CardTitle>
          <CardDescription>{t("section1.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {t("section1.content")}
          </p>
          {/* Code comments in English */}
          <CodeBlock language="tsx">{`// Example code
function Example() {
  const [count, setCount] = useState(0);
  return <div>Count: {count}</div>;
}`}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 常见模式

### 1. 标题和描述

```tsx
const t = useTranslations("pages.yourPage");

<CardTitle>{t("section.title")}</CardTitle>
<CardDescription>{t("section.description")}</CardDescription>
```

### 2. 段落文本

```tsx
<p className="mb-4">{t("section.paragraph")}</p>
```

### 3. 列表项

```tsx
<ul>
  <li>{t("list.item1")}</li>
  <li>{t("list.item2")}</li>
  <li>{t("list.item3")}</li>
</ul>
```

### 4. 按钮文本

```tsx
<Button>{t("buttons.submit")}</Button>
```

### 5. Tabs 标签

```tsx
<TabsList>
  <TabsTrigger value="tab1">{t("tabs.tab1")}</TabsTrigger>
  <TabsTrigger value="tab2">{t("tabs.tab2")}</TabsTrigger>
</TabsList>
```

## 翻译文件组织建议

### 按页面组织

```json
{
  "pages": {
    "useState": { /* useState 页面的所有翻译 */ },
    "useEffect": { /* useEffect 页面的所有翻译 */ },
    "useMemo": { /* useMemo 页面的所有翻译 */ }
  }
}
```

### 按功能组织

```json
{
  "pages": {
    "useState": {
      "title": "useState Hook",
      "whatIs": {
        "title": "What is useState?",
        "description": "...",
        "content": "..."
      },
      "syntax": {
        "title": "Basic Syntax",
        "description": "...",
        "content": "..."
      },
      "examples": {
        "title": "Examples",
        "counter": "Counter",
        "form": "Form",
        "toggle": "Toggle"
      }
    }
  }
}
```

## 代码注释转换指南

### 常见中文注释 → 英文注释

| 中文 | 英文 |
|------|------|
| 声明一个状态变量 | Declare a state variable |
| 初始值为 | Initial value is |
| 更新状态 | Update state |
| 处理点击事件 | Handle click event |
| 获取数据 | Fetch data |
| 渲染组件 | Render component |
| 这是一个示例 | This is an example |
| 基本用法 | Basic usage |
| 高级用法 | Advanced usage |
| 注意 | Note |
| 警告 | Warning |
| 提示 | Tip |

## 批量处理技巧

### 1. 使用查找和替换

在 VS Code 中：
1. 打开查找和替换（Cmd/Ctrl + H）
2. 启用正则表达式
3. 批量替换常见模式

### 2. 创建翻译片段

使用 VS Code snippets 快速插入常用翻译模式：

```json
{
  "Translation Import": {
    "prefix": "trans-import",
    "body": [
      "import { useTranslations } from \"next-intl\";",
      "",
      "const t = useTranslations(\"pages.$1\");"
    ]
  }
}
```

## 待国际化页面清单

- [ ] /basics/jsx
- [ ] /basics/components
- [ ] /basics/props
- [ ] /state/useState ✓ (已有部分翻译)
- [ ] /state/useReducer
- [ ] /state/lifting-state
- [ ] /communication/parent-to-child
- [ ] /communication/child-to-parent
- [ ] /communication/sibling
- [ ] /communication/context
- [ ] /effects/use-effect-basics
- [ ] /effects/dependency-array
- [ ] /effects/cleanup
- [ ] /hooks/useMemo ✓ (已有部分翻译)
- [ ] /hooks/useCallback
- [ ] /hooks/useRef
- [ ] /hooks/custom-hooks
- [ ] /advanced/hoc
- [ ] /advanced/render-props
- [ ] /advanced/compound-components
- [ ] /advanced/context-reducer
- [ ] /performance/memo
- [ ] /performance/list-optimization
- [ ] /performance/lazy-loading
- [ ] /examples/todo-app
- [ ] /examples/data-fetching
- [ ] /examples/forms
- [ ] /examples/notes

## 注意事项

1. **保持一致性**：使用相同的术语翻译相同的概念
2. **简洁明了**：翻译应该简洁、准确
3. **上下文**：确保翻译在上下文中有意义
4. **测试**：在两种语言下都测试页面
5. **代码示例**：统一使用英文注释和示例文本

## 需要帮助？

如果在国际化过程中遇到问题：
1. 参考已完成的页面（HomePage、Sidebar）
2. 查看 `messages/zh.json` 和 `messages/en.json` 的结构
3. 参考 next-intl 文档：https://next-intl-docs.vercel.app/
