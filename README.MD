# AI问题导航侧边栏

这个项目为ChatGPT、Grok和Gemini等AI聊天网站提供了一个便捷的问题侧边栏目录。它能够自动收集当前会话页面中用户提出的问题，并将它们显示在侧边栏上，使用户能够快速导航到历史问题的位置。

[![Greasy Fork](https://img.shields.io/greasyfork/v/467387)](https://greasyfork.org/scripts/467387-chatgpt-question-navigation-sidebar)
[![CI](https://github.com/JianJroh/chatgpt-question-navigator/actions/workflows/ci.yml/badge.svg)](https://github.com/JianJroh/chatgpt-question-navigator/actions/workflows/ci.yml)

## 使用方法

[通过Greasy Fork安装](https://greasyfork.org/zh-CN/scripts/467387-chatgpt-question-navigation-sidebar)

## 演示

> 👉 [在线ChatGPT分享页面演示](https://chat.openai.com/share/7653a873-494f-4d71-82a1-04dd6defcb0f)

![演示](https://raw.githubusercontent.com/JianJroh/chatgpt-question-navigator/main/assets/demo.gif)

## 项目文件结构解析

### 根目录文件

- **package.json**: 定义项目依赖、脚本和元数据。项目使用React构建，并通过vite-plugin-monkey打包为用户脚本。
- **vite.config.ts**: Vite构建配置文件，设置了插件(React、UnoCSS)和用户脚本的元数据，如名称、描述、匹配的网站等。
- **tsconfig.json**: TypeScript配置文件，定义编译选项和项目设置。
- **tsconfig.node.json**: 针对Node.js环境的TypeScript配置。
- **uno.config.ts**: UnoCSS（类似于Tailwind的原子化CSS框架）配置文件。
- **.eslintrc.json**: ESLint代码检查配置。
- **.prettierrc.json**: Prettier代码格式化配置。
- **.editorconfig**: 跨编辑器的代码风格配置。
- **.gitignore**: 指定Git应忽略的文件和目录。

### src目录 - 核心源代码

- **load.ts**: 项目的入口文件，负责初始化，检测页面变化并加载/卸载应用组件。
- **main.tsx**: 主要的渲染逻辑，创建和挂载React应用到页面。
- **App.tsx**: 主React组件，实现问题导航侧边栏的UI和交互逻辑。
- **shims.d.ts** 和 **vite-env.d.ts**: TypeScript类型声明文件。

### src/adapters - 适配不同AI平台

- **index.ts**: 适配器管理器，根据当前网站选择合适的适配器。
- **types.ts**: 定义适配器接口和类型。
- **chatgpt.ts**: ChatGPT网站的适配器实现。
- **grok.ts**: Grok AI网站的适配器实现。
- **gemini.ts**: Google Gemini AI的适配器实现。

### src/helpers - 辅助函数

- **index.ts**: 导出通用的辅助函数。
- **geminiHelper.ts**: 针对Gemini平台的特定辅助函数。
- **sharePage.ts**: 处理分享页面的特殊逻辑。

### src/hooks - React自定义钩子

- **useQuestionEls.ts**: 获取页面中的问题元素并提取文本。
- **useActiveQuestionIndex.ts**: 追踪当前激活（可见）的问题索引。

#### src/hooks/common - 通用React钩子

- **useEventListener.ts**: 简化事件监听的钩子。
- **useHovering.ts**: 检测元素悬停状态的钩子。
- **useMuationObserver.ts**: 监视DOM变化的钩子。
- **useMountedCallbackValue.ts**: 只在组件挂载后执行回调的钩子。

### src/styles - 样式文件

- **index.css**: 全局CSS样式。

### .github/workflows - CI/CD配置

包含GitHub Actions工作流配置，用于自动化测试和部署。

## 技术栈

- **React**: 用于构建用户界面
- **TypeScript**: 提供类型安全
- **Vite**: 现代前端构建工具
- **UnoCSS**: 原子化CSS框架
- **vite-plugin-monkey**: 将项目打包为用户脚本

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm check:type

# 代码检查
pnpm lint

# 发布新版本
pnpm release
```

## 许可证

MIT
