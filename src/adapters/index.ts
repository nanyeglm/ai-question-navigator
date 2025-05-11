import { SiteAdapter } from './types';
import GrokAdapter from './grok';
import ChatGPTAdapter from './chatgpt';
import GeminiAdapter from './gemini';

/**
 * 适配器管理器
 * 用于管理和选择适当的网站适配器
 */
class AdapterManager {
    private adapters: SiteAdapter[] = [];
    private currentAdapter: SiteAdapter | null = null;

    constructor() {
        // 注册默认适配器
        this.registerAdapter(new ChatGPTAdapter());
        this.registerAdapter(new GrokAdapter());
        this.registerAdapter(new GeminiAdapter());
    }

    /**
     * 注册一个网站适配器
     */
    registerAdapter(adapter: SiteAdapter): void {
        this.adapters.push(adapter);
    }

    /**
     * 根据当前页面选择适当的适配器
     */
    selectAdapter(): SiteAdapter | null {
        // 如果已有匹配的适配器，直接返回
        if (this.currentAdapter && this.currentAdapter.isMatch()) {
            return this.currentAdapter;
        }

        // 尝试匹配新的适配器
        for (const adapter of this.adapters) {
            if (adapter.isMatch()) {
                this.currentAdapter = adapter;
                console.log(`[AdapterManager] 已选择适配器: ${adapter.getSiteId()}`);
                return adapter;
            }
        }

        console.warn('[AdapterManager] 未找到匹配的适配器');
        return null;
    }

    /**
     * 获取当前使用的适配器
     */
    getCurrentAdapter(): SiteAdapter | null {
        return this.selectAdapter();
    }

    /**
     * 重置当前适配器
     */
    reset(): void {
        this.currentAdapter = null;
    }
}

// 创建单例实例
const adapterManager = new AdapterManager();

export default adapterManager;