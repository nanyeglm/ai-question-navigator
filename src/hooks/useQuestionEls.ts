import { useMemo, useState, useEffect } from 'react';
import { useMutationObserver } from './common/useMuationObserver';
import { queryChatContainer, queryQuestionEls } from '../helpers';
import { useMountedCallbackValue } from './common/useMountedCallbackValue';
import adapterManager from '../adapters';

export function useQuestionEls() {
  const [questionEls, setQuestionEls] = useState<HTMLElement[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);

  // 定期检查适配器和问题元素
  useEffect(() => {
    const updateQuestions = () => {
      const adapter = adapterManager.getCurrentAdapter();

      if (adapter && adapter.isPageReady()) {
        // 使用适配器获取问题元素
        const elements = adapter.getQuestionElements();
        setQuestionEls(elements);

        // 使用适配器提取问题文本
        setQuestions(elements.map(el => adapter.getQuestionText(el)));
      } else {
        // 使用默认方法作为后备
        const elements = queryQuestionEls();
        setQuestionEls(elements);

        // 使用默认方法提取问题文本
        setQuestions(
          elements
            .map((q) => q.querySelector<HTMLDivElement>('[data-message-author-role]')?.innerText)
            .filter((s): s is string => !!s)
        );
      }
    };

    // 初始化
    updateQuestions();

    // 设置定期检查
    const interval = setInterval(updateQuestions, 1000);
    return () => clearInterval(interval);
  }, []);

  // 观察DOM变化
  useEffect(() => {
    const adapter = adapterManager.getCurrentAdapter();

    if (adapter) {
      // 使用适配器的MutationObserver配置
      const targets = adapter.getMutationObserverTargets();

      const observers = targets.map(({ targetNode, config }) => {
        const observer = new MutationObserver(() => {
          if (adapter.isPageReady()) {
            const elements = adapter.getQuestionElements();
            setQuestionEls(elements);
            setQuestions(elements.map(el => adapter.getQuestionText(el)));
          }
        });

        observer.observe(targetNode, config);
        return observer;
      });

      return () => {
        observers.forEach(obs => obs.disconnect());
      };
    } else {
      // 使用默认的MutationObserver
      const chatContainer = queryChatContainer();

      if (chatContainer) {
        const observer = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
              const elements = queryQuestionEls();
              setQuestionEls(elements);
              setQuestions(
                elements
                  .map((q) => q.querySelector<HTMLDivElement>('[data-message-author-role]')?.innerText)
                  .filter((s): s is string => !!s)
              );
            }
          }
        });

        observer.observe(chatContainer, { childList: true });
        return () => observer.disconnect();
      }
    }
  }, []);

  return { questionEls, questions };
}
