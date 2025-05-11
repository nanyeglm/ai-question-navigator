import { SiteAdapter } from './types';
import { queryChatContainer, queryQuestionEls, className2Selector } from '../helpers';

/**
 * ChatGPT网站适配器
 * 适配 https://chatgpt.com/
 */
export default class ChatGPTAdapter implements SiteAdapter {
    /**
     * 判断当前页面是否为ChatGPT网站
     */
    isMatch(): boolean {
        return window.location.hostname === 'chatgpt.com';
    }

    /**
     * 获取对话区域的DOM容器元素
     */
    getConversationContainer(): HTMLElement | null {
        return queryChatContainer();
    }

    /**
     * 获取问题元素列表
     */
    getQuestionElements(): HTMLElement[] {
        return queryQuestionEls();
    }

    /**
     * 获取当前活跃问题的索引
     */
    getCurrentQuestionIndex(elements: HTMLElement[]): number {
        // 使用位置确定当前活跃问题
        const index = elements.findIndex((el) => el.getBoundingClientRect().top >= 0);
        return index > -1 ? index : 0;
    }

    /**
     * 获取需要观察DOM变化的节点和配置
     */
    getMutationObserverTargets(): { targetNode: Node; config: MutationObserverInit }[] {
        const chatContainer = this.getConversationContainer();

        if (!chatContainer) {
            return [];
        }

        return [
            {
                targetNode: chatContainer,
                config: {
                    childList: true,
                },
            },
        ];
    }

    /**
     * 从问题元素中提取文本
     */
    getQuestionText(element: HTMLElement): string {
        const authorElement = element.querySelector<HTMLDivElement>('[data-message-author-role]');
        return authorElement?.innerText || '';
    }

    /**
     * 判断页面是否已加载完成
     */
    isPageReady(): boolean {
        const container = this.getConversationContainer();
        return !!container && this.getQuestionElements().length > 0;
    }

    /**
     * 获取网站标识符
     */
    getSiteId(): string {
        return 'chatgpt';
    }
} 