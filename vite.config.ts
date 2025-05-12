import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
    }),
    react(),
    monkey({
      entry: 'src/load.ts',
      userscript: {
        name: {
          '': 'AI Question Navigation sidebar',
          'zh-CN': 'AI 问题导航侧边栏',
        },
        description: {
          '': 'It provides a convenient question sidebar directory for AI chat websites like ChatGPT and Grok. It automatically collects the questions asked by users on the current session page and displays them on the sidebar, enabling quick navigation to the location of historical questions.',
          'zh-CN':
            '为ChatGPT和Grok等AI聊天网站提供了一个便捷的问题侧边栏目录。它能够自动搜集当前会话页面的用户提的问题，并展示在侧边栏上，提供快速导航到历史问题的位置的能力。',
        },
        namespace: 'npm/ai-question-navigator',
        match: [
          'https://chatgpt.com/**',
          'https://grok.com/**',
          'https://gemini.google.com/**',
        ],
        author: 'okokdi',
        supportURL: 'https://github.com/nanyeglm/ai-question-navigator',
        license: 'MIT',
      },
    }),
  ],
});
