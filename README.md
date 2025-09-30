# React 学习导航 🚀

[English](./README.en.md) | 简体中文

<div align="center">

一个全面的 React 学习资源平台，从基础到高级，帮助你系统掌握 React 开发。

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

[在线演示](#) | [快速开始](#快速开始) | [文档](#文档)

</div>

---

## 📖 目录

- [特性](#-特性)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [学习路径](#-学习路径)
- [国际化](#-国际化)
- [开发指南](#-开发指南)
- [贡献](#-贡献)
- [许可证](#-许可证)

---

## ✨ 特性

### 🎯 核心功能

- **📚 系统化学习路径** - 从 React 基础到高级模式，循序渐进
- **💻 交互式示例** - 每个概念都配有可交互的代码示例
- **📱 响应式设计** - 完美支持桌面和移动设备
- **🌓 深色模式** - 内置明暗主题切换
- **🌍 国际化支持** - 完整的中英文切换功能
- **⚡ 性能优化** - 基于 Next.js 15 的最佳实践

### 📝 学习内容

#### React 基础
- JSX 语法与表达式
- 组件的创建与使用
- Props 属性传递

#### 状态管理
- useState Hook
- useReducer Hook
- 状态提升

#### 组件通信
- 父传子 (Props)
- 子传父 (回调函数)
- 兄弟组件通信
- 跨层级通信 (Context)

#### 生命周期与副作用
- useEffect 基础
- 依赖数组
- 清理副作用

#### Hooks 进阶
- useMemo
- useCallback
- useRef
- 自定义 Hooks

#### 高级模式
- 高阶组件 (HOC)
- Render Props
- 组合组件
- Context + useReducer

#### 性能优化
- React.memo
- 列表优化
- 懒加载

#### 实战案例
- 待办事项应用
- 数据获取与展示
- 表单处理
- 笔记应用

---

## 🛠 技术栈

### 核心框架
- **[Next.js 15.2.4](https://nextjs.org/)** - React 全栈框架
- **[React 19](https://react.dev/)** - UI 库
- **[TypeScript 5](https://www.typescriptlang.org/)** - 类型安全

### UI 组件
- **[Tailwind CSS](https://tailwindcss.com/)** - 原子化 CSS 框架
- **[Radix UI](https://www.radix-ui.com/)** - 无样式组件库
- **[Lucide React](https://lucide.dev/)** - 图标库

### 功能库
- **[next-intl](https://next-intl-docs.vercel.app/)** - 国际化解决方案
- **[next-themes](https://github.com/pacocoursey/next-themes)** - 主题切换
- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - 代码高亮

### 开发工具
- **[pnpm](https://pnpm.io/)** - 包管理器
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

---

## 🚀 快速开始

### 前置要求

- Node.js 18.x 或更高版本
- pnpm 8.x 或更高版本（推荐）

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/react-learning.git

# 进入项目目录
cd react-learning

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm dev

# 在浏览器中打开
# http://localhost:3000
```

### 构建

```bash
# 生产环境构建
pnpm build

# 启动生产服务器
pnpm start
```

### 其他命令

```bash
# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

---

## 📁 项目结构

```
react-learning/
├── app/                          # Next.js App Router
│   ├── [locale]/                # 国际化路由
│   │   ├── layout.tsx           # 语言布局
│   │   ├── page.tsx             # 首页
│   │   ├── basics/              # 基础知识
│   │   ├── state/               # 状态管理
│   │   ├── communication/       # 组件通信
│   │   ├── effects/             # 副作用
│   │   ├── hooks/               # Hooks 进阶
│   │   ├── advanced/            # 高级模式
│   │   ├── performance/         # 性能优化
│   │   └── examples/            # 实战案例
│   ├── api/                     # API 路由
│   ├── layout.tsx               # 根布局
│   └── globals.css              # 全局样式
├── components/                   # React 组件
│   ├── ui/                      # UI 组件库
│   ├── interactive-examples/    # 交互式示例
│   ├── code-block.tsx           # 代码块组件
│   ├── sidebar.tsx              # 侧边栏
│   ├── locale-switcher.tsx      # 语言切换器
│   └── theme-toggle.tsx         # 主题切换器
├── hooks/                       # 自定义 Hooks
├── i18n/                        # 国际化配置
│   ├── config.ts                # 语言配置
│   └── request.ts               # 请求配置
├── lib/                         # 工具库
├── messages/                    # 翻译文件
│   ├── zh.json                  # 中文翻译
│   └── en.json                  # 英文翻译
├── public/                      # 静态资源
├── scripts/                     # 脚本工具
├── middleware.ts                # Next.js 中间件
├── next.config.mjs              # Next.js 配置
├── tailwind.config.ts           # Tailwind 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目配置
```

---

## 🎓 学习路径

### 初学者路径

1. **React 基础**（1-2 周）
   - JSX 语法
   - 组件基础
   - Props 属性

2. **状态管理**（1 周）
   - useState Hook
   - 状态提升

3. **副作用**（1 周）
   - useEffect 基础
   - 依赖数组

### 进阶路径

4. **组件通信**（1-2 周）
   - 父子组件通信
   - Context API

5. **Hooks 进阶**（1-2 周）
   - useMemo
   - useCallback
   - useRef
   - 自定义 Hooks

6. **性能优化**（1 周）
   - React.memo
   - 列表优化
   - 懒加载

### 高级路径

7. **高级模式**（2-3 周）
   - 高阶组件
   - Render Props
   - 组合组件
   - useReducer

8. **实战项目**（2-4 周）
   - 待办事项应用
   - 数据获取
   - 表单处理
   - 完整应用

---

## 🌍 国际化

本项目完整支持中英文切换。

### 切换语言

点击页面右上角的地球图标 🌐，选择你喜欢的语言：
- 🇨🇳 中文
- 🇬🇧 English

### URL 结构

- **中文（默认）**: `https://example.com/basics/jsx`
- **英文**: `https://example.com/en/basics/jsx`

### 技术实现

基于 [next-intl](https://next-intl-docs.vercel.app/) 实现：
- 服务端和客户端完整支持
- 自动路由处理
- 类型安全的翻译
- SEO 友好

详细文档：
- [国际化指南](./I18N_GUIDE.md)
- [技术文档](./TECHNICAL_DOCUMENTATION.md)

---

## 💻 开发指南

### 添加新页面

1. 在 `app/[locale]/` 下创建新路由
2. 在 `messages/zh.json` 和 `messages/en.json` 添加翻译
3. 在组件中使用 `useTranslations`

示例：

```tsx
// app/[locale]/new-page/page.tsx
"use client";

import { useTranslations } from "next-intl";

export default function NewPage() {
  const t = useTranslations("pages.newPage");
  
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

```json
// messages/zh.json
{
  "pages": {
    "newPage": {
      "title": "新页面",
      "description": "这是新页面的描述"
    }
  }
}
```

### 添加交互示例

1. 在 `components/interactive-examples/` 创建组件
2. 实现交互逻辑
3. 在对应的学习页面中引入

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化
- 代码注释使用英文

### 提交规范

```bash
# 功能
git commit -m "feat: add new feature"

# 修复
git commit -m "fix: fix bug"

# 文档
git commit -m "docs: update documentation"

# 样式
git commit -m "style: format code"

# 重构
git commit -m "refactor: refactor code"

# 测试
git commit -m "test: add tests"

# 构建
git commit -m "build: update dependencies"
```

---

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](./CONTRIBUTING.md)。

### 如何贡献

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 贡献者

感谢所有贡献者！

<a href="https://github.com/yourusername/react-learning/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/react-learning" />
</a>

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](./LICENSE) 文件。

---

## 📞 联系方式

- **问题反馈**: [GitHub Issues](https://github.com/yourusername/react-learning/issues)
- **功能建议**: [GitHub Discussions](https://github.com/yourusername/react-learning/discussions)
- **邮箱**: your.email@example.com

---

## 🙏 致谢

- [React](https://react.dev/) - 感谢 React 团队
- [Next.js](https://nextjs.org/) - 感谢 Vercel 团队
- [Radix UI](https://www.radix-ui.com/) - 优秀的组件库
- [Tailwind CSS](https://tailwindcss.com/) - 强大的 CSS 框架

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/react-learning&type=Date)](https://star-history.com/#yourusername/react-learning&Date)

---

<div align="center">

**[⬆ 回到顶部](#react-学习导航-)**

用 ❤️ 制作 | © 2025 React Learning

[网站](https://example.com) · [文档](./docs) · [GitHub](https://github.com/yourusername/react-learning)

</div>
