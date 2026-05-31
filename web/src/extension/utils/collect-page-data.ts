// Import types
import type { TBrowserContextMenuMessage } from "../types/browser";

/**
 * Collect standard page information.
 * @param info 
 * @param tab 
 * @returns 
 */
export function collectPageData(
  action: string,
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab | undefined
) {
  // Cấu trúc một Data Payload hoàn chỉnh để collect
  const collectedData: TBrowserContextMenuMessage = {
    action: action,
    payload: {
      itemId: info.menuItemId,
      text: info.selectionText || "",
      sourceUrl: info.pageUrl || "",
      pageTitle: tab?.title || "",
      timestamp: new Date().toISOString(),
      targetUrl: info.linkUrl || info.srcUrl || "",
    },
  };

  return collectedData;
}
