import { load, remove } from './main.tsx';
import { queryChatContainer, queryQuestionEls } from './helpers';
import { isSharePage, scrollMarginTop } from './helpers/sharePage.ts';
import adapterManager from './adapters';

let loaded = false;
let conversationId: string | null = null;

setInterval(() => {
  const latestConversationId = getConversationIdByUrl();

  // 选择适当的适配器
  const adapter = adapterManager.selectAdapter();

  // 使用适配器获取问题元素，如果没有适配器则使用默认方法
  let questionEls: HTMLElement[] = [];

  if (adapter) {
    if (adapter.isPageReady()) {
      questionEls = adapter.getQuestionElements();
    }
  } else {
    // 使用原始的方法作为后备
    questionEls = (queryChatContainer() && queryQuestionEls()) ?? [];
  }

  const hasQuestion = questionEls.length > 0;

  if (conversationId !== latestConversationId || !hasQuestion) {
    conversationId = latestConversationId;
    remove();
    loaded = false;
  }

  if (!loaded && hasQuestion) {
    load();
    loaded = true;
    if (isSharePage) {
      questionEls.forEach((q) => {
        q.style.scrollMarginTop = scrollMarginTop + 'px';
      });
    }
  }
}, 600);

function getConversationIdByUrl() {
  const res = location.pathname.match(/\/c\/(.*)/);
  return res?.[1] ?? null;
}
