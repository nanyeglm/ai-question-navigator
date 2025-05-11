/**
 * 网站适配器接口
 * 用于适配不同网站的DOM结构和交互方式
 */
export interface SiteAdapter {
    /**
     * 判断当前页面是否匹配该适配器
     */
    isMatch(): boolean;

    /**
     * 获取对话容器元素
     */
    getConversationContainer(): HTMLElement | null;

    /**
     * 获取问题元素列表
     */
    getQuestionElements(): HTMLElement[];

    /**
     * 获取当前活跃问题的索引
     */
    getCurrentQuestionIndex(elements: HTMLElement[]): number;

    /**
     * 获取需要观察DOM变化的节点和配置
     */
    getMutationObserverTargets(): {
        targetNode: Node;
        config: MutationObserverInit;
    }[];

    /**
     * 从问题元素中提取文本
     */
    getQuestionText(element: HTMLElement): string;

    /**
     * 判断页面是否已加载完成
     */
    isPageReady(): boolean;

    /**
     * 获取网站标识符
     */
    getSiteId(): string;
} 