import { SiteAdapter } from './types';

/**
 * Gemini网站适配器
 */
export default class GeminiAdapter implements SiteAdapter {
    /**
     * 判断当前页面是否匹配该适配器
     */
    isMatch(): boolean {
        return window.location.host.includes('gemini.google.com');
    }

    /**
     * 获取对话容器元素
     */
    getConversationContainer(): HTMLElement | null {
        const chatContainerSelector = 'div.conversation-container';
        return document.querySelector<HTMLElement>(chatContainerSelector);
    }

    /**
     * 获取问题元素列表
     */
    getQuestionElements(): HTMLElement[] {
        const userQuerySelector = 'user-query';
        const userQueryEls = Array.from(
            document.querySelectorAll<HTMLElement>(userQuerySelector)
        );
        return userQueryEls;
    }

    /**
     * 获取当前活跃问题的索引
     */
    getCurrentQuestionIndex(elements: HTMLElement[]): number {
        const topThreshold = 75; // Gemini的顶部阈值
        // 找到第一个在视图中的问题
        const index = elements.findIndex(
            (el) => el.getBoundingClientRect().top >= topThreshold
        );

        if (index > -1) {
            return index === 0 ? 0 : index - 1;
        } else if (elements.length > 0) {
            // 如果没有找到，但有问题，则将最后一个问题设置为活动问题
            return elements.length - 1;
        }
        return -1;
    }

    /**
     * 获取需要观察DOM变化的节点和配置
     */
    getMutationObserverTargets(): {
        targetNode: Node;
        config: MutationObserverInit;
    }[] {
        const chatContainer = this.getConversationContainer();
        if (!chatContainer) return [];

        return [{
            targetNode: chatContainer,
            config: { childList: true, subtree: true }
        }];
    }

    /**
     * 从问题元素中提取文本
     */
    getQuestionText(element: HTMLElement): string {
        const textEl = element.querySelector('.query-text-line');
        const text = textEl?.textContent || '';
        return text.length > 30 ? text.substring(0, 30) + '...' : text;
    }

    /**
     * 判断页面是否已加载完成
     */
    isPageReady(): boolean {
        return !!this.getConversationContainer() && this.getQuestionElements().length > 0;
    }

    /**
     * 获取网站标识符
     */
    getSiteId(): string {
        return 'gemini';
    }
}