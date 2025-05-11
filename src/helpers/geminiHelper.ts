// 检测是否为Gemini页面
export const isGeminiPage = window.location.host.includes('gemini.google.com');

// 查询Gemini对话容器
export function queryChatContainer() {
    // Gemini对话容器选择器
    const chatContainerSelector = 'div.conversation-container';
    return document.querySelector<HTMLDivElement>(chatContainerSelector);
}

// 查询Gemini中的问题元素
export function queryQuestionEls() {
    // 获取用户问题元素
    const userQuerySelector = 'user-query';
    const userQueryEls = Array.from(
        document.querySelectorAll<HTMLElement>(userQuerySelector)
    );

    return userQueryEls;
}

// 从问题元素中提取文本
export function getQuestionText(questionEl: HTMLElement): string {
    // 获取Gemini中问题的文本内容
    const textEl = questionEl.querySelector('.query-text-line');

    // 限制问题长度，避免导航项过长
    const text = textEl?.textContent || '';
    return text.length > 30 ? text.substring(0, 30) + '...' : text;
}

// Gemini页面的滚动边距调整
export const scrollMarginTop = 75;

// Gemini颜色主题接口
export interface GeminiColors {
    primary: string;
    secondary: string;
    highlight: string;
    border: string;
    background: string;
    hoverBackground: string;
    darkMode?: GeminiColors;
}

// Gemini主题颜色设置
export const GEMINI_COLORS: GeminiColors = {
    primary: 'rgb(25, 25, 30)',
    secondary: 'rgb(90, 90, 100)',
    highlight: '#1f1f8e',  // Gemini蓝色系
    border: 'rgba(0, 0, 0, 0.08)',
    background: '#ffffff',
    hoverBackground: 'rgba(0, 0, 50, 0.08)',
    darkMode: {
        primary: 'rgb(230, 230, 240)',
        secondary: 'rgb(180, 180, 200)',
        highlight: '#8e8eff',  // 亮蓝色
        border: 'rgba(255, 255, 255, 0.08)',
        background: '#1f1f3d',
        hoverBackground: 'rgba(200, 200, 255, 0.15)'
    }
};