import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import baseStyle from './styles/index.css?inline';
import adapterManager from './adapters';

const DOM_MARK = 'data-chatgpt-question-directory';

function mount(el: Element) {
  el.attachShadow({ mode: 'open' });
  const shadowRoot = el.shadowRoot!;

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(baseStyle);
  shadowRoot.adoptedStyleSheets = [sheet];

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

  // 根据适配器设置样式
  if (adapter) {
    const siteId = adapter.getSiteId();

    if (siteId === 'gemini') {
      dom.style.cssText = `
        --app-width: 150px;
        --app-max-list-height: 1300px;
        z-index: 2000;
        position: fixed;
        top: 80px;
        right: 20px;
      `;
    } else if (siteId === 'grok') {
      dom.style.cssText = `
        --app-width: 170px;
        --app-max-list-height: 500px;
        z-index: 2000;
        position: fixed;
        top: 80px;
        right: 20px;
        background: transparent;
      `;
    } else {
      // 原来的ChatGPT样式
      dom.style.cssText = `
        --app-width: 120px;
        --app-max-list-height: 300px;
        position: fixed;
        display: flex;
        justify-content: end;
        top: 66px;
        left: 16px;
        right: 16px;
        padding-right: 16px;
        z-index: 1;
      `;
    }
  } else {
    // 默认样式
    dom.style.cssText = `
      --app-width: 120px;
      --app-max-list-height: 300px;
      position: fixed;
      display: flex;
      justify-content: end;
      top: 66px;
      left: 16px;
      right: 16px;
      padding-right: 16px;
      z-index: 1;
    `;
  }

  mount(dom);
  document.body.append(dom);
}

export function remove() {
  const target = document.querySelector(`[${DOM_MARK}]`);
  if (!target) {
    return;
  }
  target.remove();
}
