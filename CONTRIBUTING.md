# 贡献指南 / Contributing Guide

[English](#english) | [简体中文](#简体中文)

---

## 简体中文

感谢你考虑为 React 学习导航项目做出贡献！

### 🎯 贡献方式

你可以通过以下方式为项目做出贡献：

1. **报告 Bug** - 发现问题请提交 Issue
2. **功能建议** - 有好的想法请在 Discussions 讨论
3. **代码贡献** - 提交 Pull Request
4. **文档改进** - 帮助改进文档
5. **翻译** - 帮助完成页面的国际化翻译

### 📝 提交 Issue

在提交 Issue 前，请：

1. 搜索现有的 Issue，避免重复
2. 使用清晰的标题描述问题
3. 提供详细的复现步骤
4. 包含截图或错误信息
5. 说明你的环境（浏览器、Node 版本等）

**Bug 报告模板**：

```markdown
**问题描述**
简要描述遇到的问题

**复现步骤**
1. 进入 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

**期望行为**
描述你期望看到的行为

**截图**
如果适用，添加截图

**环境**
- 操作系统：[如 macOS, Windows]
- 浏览器：[如 Chrome, Safari]
- Node 版本：[如 18.17.0]
```

### 🔧 开发流程

#### 1. Fork 和 Clone

```bash
# Fork 项目到你的 GitHub 账号
# 然后 clone 你的 fork

git clone https://github.com/你的用户名/react-learning.git
cd react-learning
```

#### 2. 安装依赖

```bash
pnpm install
```

#### 3. 创建分支

```bash
# 从 main 分支创建新分支
git checkout -b feature/你的功能名称

# 或者修复 bug
git checkout -b fix/bug描述
```

#### 4. 开发

```bash
# 启动开发服务器
pnpm dev

# 在 http://localhost:3000 查看更改
```

#### 5. 提交更改

```bash
# 添加更改
git add .

# 提交（遵循提交规范）
git commit -m "feat: 添加新功能"

# 推送到你的 fork
git push origin feature/你的功能名称
```

#### 6. 创建 Pull Request

1. 进入你的 fork 页面
2. 点击 "New Pull Request"
3. 选择你的分支
4. 填写 PR 描述
5. 提交 PR

### 📏 代码规范

#### TypeScript

- 使用 TypeScript 编写所有代码
- 提供适当的类型注解
- 避免使用 `any` 类型

```typescript
// ✅ 好的
interface UserProps {
  name: string;
  age: number;
}

// ❌ 避免
const user: any = { name: "John" };
```

#### 组件

- 使用函数组件
- 使用 TypeScript 定义 Props 类型
- 使用有意义的组件名

```tsx
// ✅ 好的
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

#### 样式

- 优先使用 Tailwind CSS 类
- 保持一致的样式规范
- 使用 UI 组件库中的组件

#### 国际化

- 所有用户可见的文本必须支持国际化
- 在 `messages/zh.json` 和 `messages/en.json` 添加翻译
- 使用 `useTranslations` Hook

```tsx
// ✅ 好的
const t = useTranslations("pages.example");
<h1>{t("title")}</h1>

// ❌ 避免
<h1>固定的中文文本</h1>
```

#### 代码注释

- 代码注释统一使用英文
- 提供清晰的注释说明复杂逻辑
- 保持注释简洁明了

```typescript
// ✅ Good: Clear English comment
// Calculate the total price including tax
const total = price * (1 + taxRate);

// ❌ Avoid: Chinese comment
// 计算包含税费的总价
const total = price * (1 + taxRate);
```

### 🎨 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响代码运行）
- `refactor:` 重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

**示例**：

```bash
feat: add dark mode toggle
fix: resolve navigation issue on mobile
docs: update README with installation steps
style: format code with prettier
refactor: simplify state management logic
perf: optimize image loading
test: add unit tests for Button component
chore: update dependencies
```

### 🧪 测试

在提交 PR 前，请确保：

- [ ] 代码通过 ESLint 检查（`pnpm lint`）
- [ ] TypeScript 无错误（`pnpm type-check`）
- [ ] 在浏览器中测试功能正常
- [ ] 测试响应式布局
- [ ] 测试深色模式
- [ ] 测试中英文切换

### 📖 文档贡献

文档同样重要！你可以：

- 改进现有文档的清晰度
- 修复文档中的错误
- 添加更多示例
- 翻译文档

文档文件：
- `README.md` / `README.en.md` - 项目主文档
- `I18N_GUIDE.md` - 国际化指南
- `HOW_TO_I18N_PAGES.md` - 页面国际化教程
- `TECHNICAL_DOCUMENTATION.md` - 技术文档

### 🌍 翻译贡献

帮助完成页面的中英文翻译：

1. 查看 [I18N_STATUS.md](./I18N_STATUS.md) 了解进度
2. 选择一个未完成的页面
3. 参考 [HOW_TO_I18N_PAGES.md](./HOW_TO_I18N_PAGES.md) 教程
4. 提交 PR

### ❓ 问题和帮助

- 使用 [GitHub Issues](https://github.com/yourusername/react-learning/issues) 报告 bug
- 使用 [GitHub Discussions](https://github.com/yourusername/react-learning/discussions) 讨论想法
- 查看现有的 Issue 和 PR 避免重复

### 📜 行为准则

请遵守我们的[行为准则](./CODE_OF_CONDUCT.md)：

- 尊重所有贡献者
- 使用友善和包容的语言
- 接受建设性批评
- 关注对社区最有利的事情

---

## English

Thank you for considering contributing to the React Learning Guide project!

### 🎯 Ways to Contribute

You can contribute to the project in the following ways:

1. **Report Bugs** - Submit an Issue if you find a problem
2. **Feature Requests** - Share your ideas in Discussions
3. **Code Contributions** - Submit Pull Requests
4. **Documentation** - Help improve documentation
5. **Translation** - Help complete page internationalization

### 📝 Submitting Issues

Before submitting an Issue, please:

1. Search existing Issues to avoid duplicates
2. Use a clear title to describe the problem
3. Provide detailed reproduction steps
4. Include screenshots or error messages
5. Specify your environment (browser, Node version, etc.)

**Bug Report Template**:

```markdown
**Description**
Brief description of the issue

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
Describe what you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome, Safari]
- Node Version: [e.g., 18.17.0]
```

### 🔧 Development Workflow

#### 1. Fork and Clone

```bash
# Fork the project to your GitHub account
# Then clone your fork

git clone https://github.com/your-username/react-learning.git
cd react-learning
```

#### 2. Install Dependencies

```bash
pnpm install
```

#### 3. Create Branch

```bash
# Create new branch from main
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

#### 4. Develop

```bash
# Start development server
pnpm dev

# View changes at http://localhost:3000
```

#### 5. Commit Changes

```bash
# Add changes
git add .

# Commit (follow commit convention)
git commit -m "feat: add new feature"

# Push to your fork
git push origin feature/your-feature-name
```

#### 6. Create Pull Request

1. Go to your fork's page
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR description
5. Submit PR

### 📏 Code Standards

#### TypeScript

- Write all code in TypeScript
- Provide appropriate type annotations
- Avoid using `any` type

```typescript
// ✅ Good
interface UserProps {
  name: string;
  age: number;
}

// ❌ Avoid
const user: any = { name: "John" };
```

#### Components

- Use function components
- Define Props types with TypeScript
- Use meaningful component names

```tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

#### Styling

- Prefer Tailwind CSS classes
- Maintain consistent styling
- Use components from the UI library

#### Internationalization

- All user-visible text must support i18n
- Add translations in `messages/zh.json` and `messages/en.json`
- Use `useTranslations` Hook

```tsx
// ✅ Good
const t = useTranslations("pages.example");
<h1>{t("title")}</h1>

// ❌ Avoid
<h1>Hardcoded English text</h1>
```

#### Code Comments

- Use English for all code comments
- Provide clear comments for complex logic
- Keep comments concise

```typescript
// ✅ Good: Clear English comment
// Calculate the total price including tax
const total = price * (1 + taxRate);

// ❌ Avoid: Chinese comment
// 计算包含税费的总价
const total = price * (1 + taxRate);
```

### 🎨 Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation update
- `style:` Code formatting (no logic change)
- `refactor:` Refactoring
- `perf:` Performance improvement
- `test:` Testing
- `chore:` Build process or auxiliary tool changes

**Examples**:

```bash
feat: add dark mode toggle
fix: resolve navigation issue on mobile
docs: update README with installation steps
style: format code with prettier
refactor: simplify state management logic
perf: optimize image loading
test: add unit tests for Button component
chore: update dependencies
```

### 🧪 Testing

Before submitting a PR, ensure:

- [ ] Code passes ESLint (`pnpm lint`)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] Features work correctly in browser
- [ ] Test responsive layout
- [ ] Test dark mode
- [ ] Test language switching

### 📖 Documentation Contributions

Documentation is important too! You can:

- Improve clarity of existing docs
- Fix errors in documentation
- Add more examples
- Translate documentation

Documentation files:
- `README.md` / `README.en.md` - Main documentation
- `I18N_GUIDE.md` - i18n Guide
- `HOW_TO_I18N_PAGES.md` - Page i18n Tutorial
- `TECHNICAL_DOCUMENTATION.md` - Technical Documentation

### 🌍 Translation Contributions

Help complete Chinese-English translations:

1. Check [I18N_STATUS.md](./I18N_STATUS.md) for progress
2. Choose an incomplete page
3. Follow [HOW_TO_I18N_PAGES.md](./HOW_TO_I18N_PAGES.md) tutorial
4. Submit PR

### ❓ Questions and Help

- Use [GitHub Issues](https://github.com/yourusername/react-learning/issues) to report bugs
- Use [GitHub Discussions](https://github.com/yourusername/react-learning/discussions) to discuss ideas
- Check existing Issues and PRs to avoid duplicates

### 📜 Code of Conduct

Please follow our [Code of Conduct](./CODE_OF_CONDUCT.md):

- Respect all contributors
- Use welcoming and inclusive language
- Accept constructive criticism
- Focus on what's best for the community

---

<div align="center">

**感谢你的贡献！ / Thank you for your contribution!**

</div>
