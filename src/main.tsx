import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import baseStyle from './styles/base.css?inline';
import chatgptStyle from './styles/chatgpt.css?inline';
import chatgptSidebarEnhancedStyle from './styles/chatgpt-sidebar-enhanced.css?inline';
import grokStyle from './styles/grok.css?inline';
import grokSidebarEnhancedStyle from './styles/grok-sidebar-enhanced.css?inline';
import geminiStyle from './styles/gemini.css?inline';
import geminiSidebarEnhancedStyle from './styles/gemini-sidebar-enhanced.css?inline';
import adapterManager from './adapters';

const DOM_MARK = 'data-chatgpt-question-directory';

function mount(el: Element, siteId: string | null) {
  el.attachShadow({ mode: 'open' });
  const shadowRoot = el.shadowRoot!;

  // 创建CSS样式表并应用基础样式
  const baseSheet = new CSSStyleSheet();
  baseSheet.replaceSync(baseStyle);

  // 根据站点ID选择对应的样式
  let siteStyleSheet: CSSStyleSheet | null = null;
  let enhancedStyleSheet: CSSStyleSheet | null = null;

  if (siteId === 'gemini') {
    siteStyleSheet = new CSSStyleSheet();
    siteStyleSheet.replaceSync(geminiStyle);

    // 为Gemini添加增强样式表
    enhancedStyleSheet = new CSSStyleSheet();
    enhancedStyleSheet.replaceSync(geminiSidebarEnhancedStyle);
  } else if (siteId === 'grok') {
    siteStyleSheet = new CSSStyleSheet();
    siteStyleSheet.replaceSync(grokStyle);

    // 为Grok添加增强样式表
    enhancedStyleSheet = new CSSStyleSheet();
    enhancedStyleSheet.replaceSync(grokSidebarEnhancedStyle);
  } else {
    // 默认使用ChatGPT样式
    siteStyleSheet = new CSSStyleSheet();
    siteStyleSheet.replaceSync(chatgptStyle);

    // 为ChatGPT添加增强样式表
    enhancedStyleSheet = new CSSStyleSheet();
    enhancedStyleSheet.replaceSync(chatgptSidebarEnhancedStyle);
  }

  // 应用样式表
  const styleSheets = [baseSheet, siteStyleSheet];
  if (enhancedStyleSheet) {
    styleSheets.push(enhancedStyleSheet);
  }

  shadowRoot.adoptedStyleSheets = styleSheets;

  ReactDOM.createRoot(shadowRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export function load() {
  if (document.querySelector(`[${DOM_MARK}]`)) {
    return;
  }
  const dom = document.createElement('div');
  dom.setAttribute(DOM_MARK, '');

  // 获取当前适配器
  const adapter = adapterManager.getCurrentAdapter();
  const siteId = adapter?.getSiteId() || null;

  // 使用mount函数应用样式，而不是使用内联样式
  mount(dom, siteId);
  document.body.append(dom);
}

export function remove() {
  const target = document.querySelector(`[${DOM_MARK}]`);
  if (!target) {
    return;
  }
  target.remove();
}
