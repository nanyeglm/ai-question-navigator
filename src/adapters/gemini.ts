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
        if (elements.length === 0) return -1;

        // 设置视口区域的中点作为参考
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        // 计算每个元素与视口中心的距离
        const distances = elements.map(el => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            // 返回元素中心点到视口中心的距离
            return Math.abs(elementCenter - viewportCenter);
        });

        // 找到距离视口中心最近的元素
        let closestIndex = -1;
        let minDistance = Number.MAX_VALUE;

        distances.forEach((distance, index) => {
            // 元素完全不在视口中的情况
            const rect = elements[index]?.getBoundingClientRect();
            if (!rect || rect.bottom < 0 || rect.top > viewportHeight) {
                return;
            }

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        // 如果没有找到视野中的元素，寻找最接近顶部的元素
        if (closestIndex === -1) {
            // Gemini常有一个特定的顶部阈值
            const topThreshold = 75;
            const topIndex = elements.findIndex(el => {
                const rect = el.getBoundingClientRect();
                return rect.top >= topThreshold;
            });

            if (topIndex > -1) {
                return topIndex === 0 ? 0 : topIndex - 1;
            } else if (elements.length > 0) {
                // 如果所有元素都在视口上方，返回最后一个元素
                return elements.length - 1;
            }

            return 0;
        }

        return closestIndex;
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