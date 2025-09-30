# 国际化指南 / i18n Guide

## 功能特性

本项目已集成 `next-intl` 实现全局中英文切换功能。

### 已实现的功能

1. ✅ 支持中文（zh）和英文（en）两种语言
2. ✅ 全局语言切换组件（右上角地球图标）
3. ✅ 自动路由处理（例如：`/` 和 `/en/`）
4. ✅ 主页面和导航栏已完全翻译
5. ✅ 响应式设计，支持移动端

## 使用方法

### 1. 语言切换

点击页面右上角的地球图标（🌐），从下拉菜单中选择语言：
- 中文
- English

### 2. 文件结构

```
├── messages/           # 语言包文件夹
│   ├── zh.json        # 中文翻译
│   └── en.json        # 英文翻译
├── i18n/              # 国际化配置
│   ├── config.ts      # 语言配置
│   └── request.ts     # 请求配置
├── middleware.ts      # Next.js 中间件（处理路由）
└── components/
    └── locale-switcher.tsx  # 语言切换组件
```

### 3. 如何添加新的翻译

#### 步骤 1: 在语言包中添加翻译键

编辑 `messages/zh.json`:
```json
{
  "yourSection": {
    "title": "你的标题",
    "description": "你的描述"
  }
}
```

编辑 `messages/en.json`:
```json
{
  "yourSection": {
    "title": "Your Title",
    "description": "Your Description"
  }
}
```

#### 步骤 2: 在组件中使用翻译

```tsx
"use client";

import { useTranslations } from 'next-intl';

export default function YourComponent() {
  const t = useTranslations('yourSection');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 4. 如何添加新的语言

#### 步骤 1: 更新配置文件

编辑 `i18n/config.ts`:
```ts
export const locales = ['zh', 'en', 'ja'] as const; // 添加新语言代码
// ...
export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語', // 添加新语言名称
};
```

#### 步骤 2: 创建新的语言包

创建 `messages/ja.json` 并添加所有翻译。

#### 步骤 3: 更新中间件

`middleware.ts` 会自动识别新添加的语言。

## 技术细节

### 使用的库

- **next-intl**: v4.3.9 - Next.js 国际化解决方案
- **Next.js**: v15.2.4 - React 框架

### 路由策略

- 默认语言（中文）: `/` 或 `/zh/`
- 英文: `/en/`
- 其他页面: `/[locale]/path/to/page`

例如：
- 中文首页: `/` 或 `/zh/`
- 英文首页: `/en/`
- 中文基础教程: `/basics/jsx` 或 `/zh/basics/jsx`
- 英文基础教程: `/en/basics/jsx`

### 中间件配置

`middleware.ts` 配置了路由匹配规则：
```ts
matcher: ['/', '/(zh|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
```

这确保：
- 静态资源不受影响
- Next.js 内部路由不受影响
- 所有页面路由都会经过国际化处理

## 常见问题

### Q: 切换语言后页面没有刷新？
A: 组件应该使用 `"use client"` 指令，并通过 `useTranslations` hook 获取翻译。

### Q: 如何在服务端组件中使用翻译？
A: 使用 `getTranslations` 函数：
```tsx
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('yourSection');
  return <h1>{t('title')}</h1>;
}
```

### Q: 新添加的页面没有翻译怎么办？
A: 确保该页面位于 `app/[locale]/` 目录下，并且使用了翻译 hooks。

## 贡献指南

如果你想贡献翻译或改进国际化功能：

1. Fork 项目
2. 创建新分支
3. 添加翻译或改进
4. 提交 Pull Request

确保：
- 所有语言包保持相同的键结构
- 翻译准确且符合上下文
- 测试所有语言版本

## 参考资源

- [next-intl 官方文档](https://next-intl-docs.vercel.app/)
- [Next.js 国际化指南](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
