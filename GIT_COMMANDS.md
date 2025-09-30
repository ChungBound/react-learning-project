# Git 提交命令 / Git Commit Commands

## 📝 提交步骤

### 方案 1: 简洁提交（推荐快速提交）

```bash
# 添加所有更改
git add .

# 使用简洁的 commit message
git commit -m "feat: implement complete i18n support with Chinese and English

- Add next-intl for internationalization
- Restructure app with [locale] dynamic routes  
- Create language switcher component
- Translate navigation, homepage, and core components
- Add comprehensive documentation (11 files)
- Support seamless language switching
- Fix Next.js 15 async params compatibility"
```

### 方案 2: 详细提交（推荐 PR）

```bash
# 添加所有更改
git add .

# 使用详细的 commit message（从 COMMIT_MESSAGE.md 复制）
git commit -F COMMIT_MESSAGE.md
```

### 方案 3: 分步提交（推荐大型项目）

```bash
# 1. 添加核心功能文件
git add i18n/ messages/ middleware.ts
git add app/layout.tsx app/page.tsx app/[locale]/
git add components/locale-switcher.tsx
git add next.config.mjs package.json pnpm-lock.yaml
git commit -m "feat: add i18n infrastructure with next-intl

- Configure next-intl with middleware
- Create locale routing structure  
- Add translation files (zh/en)
- Implement language switcher"

# 2. 添加组件更新
git add components/sidebar.tsx components/ui/mobile-menu.tsx
git commit -m "feat: internationalize core components

- Update sidebar navigation with translations
- Update mobile menu for i18n support"

# 3. 添加文档
git add README.md README.en.md CONTRIBUTING.md LICENSE
git add DOCUMENTATION_INDEX.md I18N_GUIDE.md HOW_TO_I18N_PAGES.md
git add I18N_STATUS.md INTERNATIONALIZATION_SUMMARY.md TECHNICAL_DOCUMENTATION.md
git commit -m "docs: add comprehensive i18n documentation

- Create bilingual README
- Add contributing guide
- Add technical documentation (1357 lines)
- Add i18n guides and status tracking"

# 4. 添加工具
git add scripts/
git commit -m "chore: add development tools for i18n

- Add script to find Chinese text
- Add helper utilities"
```

---

## 🚀 推送到远程仓库

```bash
# 推送到 main 分支
git push origin main

# 或者推送到新分支（推荐）
git checkout -b feat/i18n-support
git push origin feat/i18n-support
```

---

## 🔍 提交前检查

```bash
# 查看状态
git status

# 查看将要提交的更改
git diff --staged

# 查看文件列表
git diff --staged --name-only

# 检查提交信息
git log --oneline -1
```

---

## 📊 提交统计

### 文件变更统计

```bash
# 查看统计
git diff --stat

# 预期输出类似：
# 新增文件: ~30 个
# 修改文件: ~10 个  
# 删除文件: ~45 个（移动到 [locale]）
# 代码行数: +3000, -500
```

### 本次提交包含：

**新增文件（~30个）:**
- ✅ 11 个文档文件
- ✅ 2 个国际化配置文件
- ✅ 2 个翻译文件
- ✅ 1 个中间件文件
- ✅ 1 个语言切换组件
- ✅ 1 个脚本文件
- ✅ 所有 [locale] 下的路由文件

**修改文件（~10个）:**
- ✅ app/layout.tsx
- ✅ app/page.tsx
- ✅ components/sidebar.tsx
- ✅ components/ui/mobile-menu.tsx
- ✅ next.config.mjs
- ✅ package.json
- ✅ pnpm-lock.yaml

**移动文件（~45个）:**
- ✅ 所有原 app/ 下的路由移到 app/[locale]/

---

## ✅ 提交检查清单

完成以下检查后再提交：

- [ ] 代码无错误（`pnpm build` 成功）
- [ ] ESLint 通过（`pnpm lint`）
- [ ] TypeScript 无错误（`pnpm type-check`）
- [ ] 功能测试通过
  - [ ] 中英文切换正常
  - [ ] 导航正常
  - [ ] 页面渲染正常
  - [ ] 移动端正常
  - [ ] 深色模式正常
- [ ] 文档完整
  - [ ] README 完整
  - [ ] 技术文档完整
  - [ ] 示例代码正确
- [ ] Git 操作
  - [ ] .gitignore 配置正确
  - [ ] 敏感信息已删除
  - [ ] 临时文件已清理

---

## 🎯 推荐流程

### 单次提交（简单快速）

```bash
# 1. 检查状态
git status

# 2. 添加所有文件
git add .

# 3. 提交（使用简洁版本）
git commit -m "feat: implement complete i18n support

- Add next-intl for internationalization
- Restructure app with [locale] dynamic routes
- Create language switcher component  
- Translate core components
- Add comprehensive documentation
- Support Chinese/English switching"

# 4. 推送
git push origin main
```

### 功能分支（推荐）

```bash
# 1. 创建功能分支
git checkout -b feat/i18n-complete-support

# 2. 添加文件
git add .

# 3. 提交
git commit -m "feat: implement complete i18n support

- Add next-intl for internationalization
- Restructure app with [locale] dynamic routes
- Create language switcher component
- Translate navigation, homepage, and core components
- Add comprehensive documentation (11 files)
- Support seamless language switching
- Fix Next.js 15 async params compatibility

BREAKING CHANGE: Routes now require locale prefix for non-default language
/about -> /about (Chinese) or /en/about (English)"

# 4. 推送到远程
git push origin feat/i18n-complete-support

# 5. 在 GitHub 上创建 Pull Request
```

---

## 📋 Commit Message 模板

### 标题格式
```
<type>(<scope>): <subject>
```

### 本次提交示例

**类型 (type):**
- feat (新功能)

**范围 (scope):**
- i18n, docs, core

**主题 (subject):**
- implement complete i18n support

**完整示例:**
```
feat(i18n): implement complete internationalization support

- Add next-intl v4.3.9 for i18n
- Restructure app with [locale] dynamic routes
- Create bilingual translation files (zh/en)
- Implement language switcher component
- Internationalize core components (sidebar, navigation)
- Add comprehensive documentation (11 files)
- Support seamless Chinese/English switching
- Fix Next.js 15 async params compatibility

Files changed:
- New: 30+ files (docs, i18n config, translations, components)
- Modified: 10 files (layouts, configs, existing components)  
- Moved: 45 routes to [locale] directory

Documentation:
- README.md/en - Project overview (bilingual)
- TECHNICAL_DOCUMENTATION.md - 1357 lines technical details
- Contributing guide, i18n guides, status tracking

Breaking Changes: None
Migration: No action required for new installations
```

---

## 🔧 如果提交出错

### 撤销最后一次提交（保留更改）
```bash
git reset --soft HEAD~1
```

### 修改最后一次提交
```bash
git commit --amend
```

### 修改提交信息
```bash
git commit --amend -m "new commit message"
```

---

## 📚 参考资源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Commit Best Practices](https://github.com/trein/dev-best-practices/wiki/Git-Commit-Best-Practices)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)

---

## 💡 提示

1. **提交前务必测试**: `pnpm build && pnpm lint`
2. **使用功能分支**: 避免直接提交到 main
3. **写清楚的消息**: 让其他人理解你的更改
4. **小步提交**: 功能完整但不要太大
5. **遵循规范**: 使用 Conventional Commits

---

**准备好了吗？** 

选择一个方案，复制命令，开始提交吧！🚀
