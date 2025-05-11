import { SiteAdapter } from './types';

/**
 * Grok网站适配器
 * 适配 https://grok.com/
 */
export default class GrokAdapter implements SiteAdapter {
    /**
     * 判断当前页面是否为Grok网站
     */
    isMatch(): boolean {
        return window.location.hostname === 'grok.com';
    }

    /**
     * 获取对话区域的DOM容器元素
     */
    getConversationContainer(): HTMLElement | null {
        // Grok的主要聊天容器
        return document.querySelector('.w-full.h-full.overflow-y-auto.overflow-x-hidden.scrollbar-gutter-stable.flex.flex-col.items-center');
    }

    /**
     * 获取问题元素列表
     */
    getQuestionElements(): HTMLElement[] {
        // 获取所有消息气泡，然后过滤只保留用户问题
        const elements = Array.from(
            document.querySelectorAll('.message-bubble.rounded-3xl')
        ).filter(el => {
            // 用户问题通常具有特定的背景色类
            return el.classList.contains('bg-surface-l2');
        }) as HTMLElement[];

        return elements;
    }

    /**
     * 获取当前活跃问题的索引
     */
    getCurrentQuestionIndex(elements: HTMLElement[]): number {
        // 找到第一个在视口中的问题元素
        const index = elements.findIndex((el) => {
            const rect = el.getBoundingClientRect();
            // 在视口的顶部附近
            return rect.top >= 0 && rect.top <= 100;
        });

        return index > -1 ? index : 0;
    }

    /**
     * 获取需要观察DOM变化的节点和配置
     */
    getMutationObserverTargets(): { targetNode: Node; config: MutationObserverInit }[] {
        const conversationContainer = this.getConversationContainer();

        if (!conversationContainer) {
            return [];
        }

        return [
            {
                targetNode: conversationContainer,
                config: {
                    childList: true,
                    subtree: true,
                },
            },
        ];
    }

    /**
     * 从问题元素中提取文本
     */
    getQuestionText(element: HTMLElement): string {
        // 提取问题文本，通常是元素的文本内容
        return element.textContent?.trim() || '';
    }

    /**
     * 判断页面是否已加载完成
     */
    isPageReady(): boolean {
        // 检查是否存在聊天容器和至少一个问题元素
        return !!this.getConversationContainer() && this.getQuestionElements().length > 0;
    }

    /**
     * 获取网站标识符
     */
    getSiteId(): string {
        return 'grok';
    }
}