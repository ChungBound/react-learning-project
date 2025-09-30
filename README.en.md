# React Learning Guide 🚀

English | [简体中文](./README.md)

<div align="center">

A comprehensive React learning platform from basics to advanced, helping you master React development systematically.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

[Live Demo](#) | [Quick Start](#-quick-start) | [Documentation](#-documentation)

</div>

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Learning Path](#-learning-path)
- [Internationalization](#-internationalization)
- [Development Guide](#-development-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

- **📚 Systematic Learning Path** - From React basics to advanced patterns, step by step
- **💻 Interactive Examples** - Each concept comes with interactive code examples
- **📱 Responsive Design** - Perfect support for desktop and mobile devices
- **🌓 Dark Mode** - Built-in light and dark theme switching
- **🌍 i18n Support** - Complete Chinese and English language switching
- **⚡ Performance Optimized** - Based on Next.js 15 best practices

### 📝 Learning Content

#### React Basics
- JSX Syntax and Expressions
- Creating and Using Components
- Props Data Passing

#### State Management
- useState Hook
- useReducer Hook
- Lifting State Up

#### Component Communication
- Parent to Child (Props)
- Child to Parent (Callbacks)
- Sibling Communication
- Cross-level (Context)

#### Lifecycle & Side Effects
- useEffect Basics
- Dependency Array
- Cleanup Effects

#### Advanced Hooks
- useMemo
- useCallback
- useRef
- Custom Hooks

#### Advanced Patterns
- Higher-Order Components (HOC)
- Render Props
- Compound Components
- Context + useReducer

#### Performance Optimization
- React.memo
- List Optimization
- Lazy Loading

#### Practical Examples
- Todo Application
- Data Fetching & Display
- Form Handling
- Notes Application

---

## 🛠 Tech Stack

### Core Framework
- **[Next.js 15.2.4](https://nextjs.org/)** - React Full-stack Framework
- **[React 19](https://react.dev/)** - UI Library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type Safety

### UI Components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS Framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled Component Library
- **[Lucide React](https://lucide.dev/)** - Icon Library

### Feature Libraries
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization Solution
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme Switching
- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Code Highlighting

### Development Tools
- **[pnpm](https://pnpm.io/)** - Package Manager
- **ESLint** - Code Linting
- **Prettier** - Code Formatting

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-learning.git

# Navigate to project directory
cd react-learning

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Open in browser
# http://localhost:3000
```

### Build

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

### Other Commands

```bash
# Linting
pnpm lint

# Type checking
pnpm type-check
```

---

## 📁 Project Structure

```
react-learning/
├── app/                          # Next.js App Router
│   ├── [locale]/                # i18n Routes
│   │   ├── layout.tsx           # Locale Layout
│   │   ├── page.tsx             # Home Page
│   │   ├── basics/              # React Basics
│   │   ├── state/               # State Management
│   │   ├── communication/       # Component Communication
│   │   ├── effects/             # Side Effects
│   │   ├── hooks/               # Advanced Hooks
│   │   ├── advanced/            # Advanced Patterns
│   │   ├── performance/         # Performance
│   │   └── examples/            # Practical Examples
│   ├── api/                     # API Routes
│   ├── layout.tsx               # Root Layout
│   └── globals.css              # Global Styles
├── components/                   # React Components
│   ├── ui/                      # UI Components
│   ├── interactive-examples/    # Interactive Examples
│   ├── code-block.tsx           # Code Block Component
│   ├── sidebar.tsx              # Sidebar
│   ├── locale-switcher.tsx      # Language Switcher
│   └── theme-toggle.tsx         # Theme Toggle
├── hooks/                       # Custom Hooks
├── i18n/                        # i18n Configuration
│   ├── config.ts                # Language Config
│   └── request.ts               # Request Config
├── lib/                         # Utilities
├── messages/                    # Translation Files
│   ├── zh.json                  # Chinese
│   └── en.json                  # English
├── public/                      # Static Assets
├── scripts/                     # Scripts
├── middleware.ts                # Next.js Middleware
├── next.config.mjs              # Next.js Config
├── tailwind.config.ts           # Tailwind Config
├── tsconfig.json                # TypeScript Config
└── package.json                 # Project Config
```

---

## 🎓 Learning Path

### Beginner Path

1. **React Basics** (1-2 weeks)
   - JSX Syntax
   - Component Basics
   - Props

2. **State Management** (1 week)
   - useState Hook
   - Lifting State Up

3. **Side Effects** (1 week)
   - useEffect Basics
   - Dependency Array

### Intermediate Path

4. **Component Communication** (1-2 weeks)
   - Parent-Child Communication
   - Context API

5. **Advanced Hooks** (1-2 weeks)
   - useMemo
   - useCallback
   - useRef
   - Custom Hooks

6. **Performance Optimization** (1 week)
   - React.memo
   - List Optimization
   - Lazy Loading

### Advanced Path

7. **Advanced Patterns** (2-3 weeks)
   - Higher-Order Components
   - Render Props
   - Compound Components
   - useReducer

8. **Practical Projects** (2-4 weeks)
   - Todo Application
   - Data Fetching
   - Form Handling
   - Full Application

---

## 🌍 Internationalization

This project fully supports Chinese and English switching.

### Switch Language

Click the globe icon 🌐 in the top right corner and select your preferred language:
- 🇨🇳 中文
- 🇬🇧 English

### URL Structure

- **Chinese (Default)**: `https://example.com/basics/jsx`
- **English**: `https://example.com/en/basics/jsx`

### Technical Implementation

Built with [next-intl](https://next-intl-docs.vercel.app/):
- Full server and client support
- Automatic routing
- Type-safe translations
- SEO friendly

Detailed documentation:
- [i18n Guide](./I18N_GUIDE.md)
- [Technical Documentation](./TECHNICAL_DOCUMENTATION.md)

---

## 💻 Development Guide

### Adding New Pages

1. Create new route under `app/[locale]/`
2. Add translations in `messages/zh.json` and `messages/en.json`
3. Use `useTranslations` in component

Example:

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
// messages/en.json
{
  "pages": {
    "newPage": {
      "title": "New Page",
      "description": "This is a new page description"
    }
  }
}
```

### Adding Interactive Examples

1. Create component in `components/interactive-examples/`
2. Implement interactive logic
3. Import in corresponding learning page

### Code Standards

- Use TypeScript
- Follow ESLint rules
- Format with Prettier
- Code comments in English

### Commit Convention

```bash
# Feature
git commit -m "feat: add new feature"

# Bug fix
git commit -m "fix: fix bug"

# Documentation
git commit -m "docs: update documentation"

# Style
git commit -m "style: format code"

# Refactor
git commit -m "refactor: refactor code"

# Test
git commit -m "test: add tests"

# Build
git commit -m "build: update dependencies"
```

---

## 🤝 Contributing

Contributions are welcome! Please see [Contributing Guide](./CONTRIBUTING.md).

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contributors

Thanks to all contributors!

<a href="https://github.com/yourusername/react-learning/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/react-learning" />
</a>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 📞 Contact

- **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/react-learning/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/react-learning/discussions)
- **Email**: your.email@example.com

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - Thanks to the React team
- [Next.js](https://nextjs.org/) - Thanks to the Vercel team
- [Radix UI](https://www.radix-ui.com/) - Excellent component library
- [Tailwind CSS](https://tailwindcss.com/) - Powerful CSS framework

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/react-learning&type=Date)](https://star-history.com/#yourusername/react-learning&Date)

---

<div align="center">

**[⬆ Back to Top](#react-learning-guide-)**

Made with ❤️ | © 2025 React Learning

[Website](https://example.com) · [Documentation](./docs) · [GitHub](https://github.com/yourusername/react-learning)

</div>
