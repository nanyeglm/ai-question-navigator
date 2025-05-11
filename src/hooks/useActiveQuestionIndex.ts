import { useEffect, useState, useCallback } from 'react';
import { queryChatContainer } from '../helpers';
import { useEventListener } from './common/useEventListener';
import { useMountedCallbackValue } from './common/useMountedCallbackValue';
import { isSharePage, scrollMarginTop } from '../helpers/sharePage';
import { useQuestionEls } from './useQuestionEls';
import adapterManager from '../adapters';

const topThreshold = isSharePage ? scrollMarginTop : 0;

export function useActiveQuestionIndex() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { questionEls } = useQuestionEls();

  // 获取滚动容器，优先使用适配器
  const scrollContainer = useMountedCallbackValue(() => {
    const adapter = adapterManager.getCurrentAdapter();
    if (adapter) {
      return adapter.getConversationContainer()?.parentElement || null;
    }
    return queryChatContainer()?.parentElement;
  });

  const findActiveIndex = useCallback(() => {
    const adapter = adapterManager.getCurrentAdapter();

    if (adapter) {
      // 使用适配器确定当前活跃问题
      const index = adapter.getCurrentQuestionIndex(questionEls);
      if (index > -1) {
        setActiveIndex(index);
      }
    } else {
      // 使用默认方法
      const index = questionEls.findIndex((el) => el.getBoundingClientRect().top >= topThreshold);
      if (index > -1) {
        setActiveIndex(index);
      }
    }
  }, [questionEls]);

  useEventListener(scrollContainer, 'scroll', findActiveIndex);

  useEffect(() => {
    findActiveIndex();
  }, [findActiveIndex]);

  return activeIndex;
}
