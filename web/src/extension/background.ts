// Import consts
import { ROOT_MENU_ITEM_ID, COLLECT_SITE_MENU_ITEM_ID, ACTIONS } from "./const";

// Import helpers / utils
import { collectPageData } from "./utils/collect-page-data";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: ROOT_MENU_ITEM_ID,
    title: "Garage Tools",
    contexts: ["selection", "page"],
  });

  chrome.contextMenus.create({
    id: COLLECT_SITE_MENU_ITEM_ID,
    parentId: ROOT_MENU_ITEM_ID,
    title: "Collect this site",
    contexts: ["selection", "page"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  let data: any = null;

  switch (info.menuItemId) {
    case COLLECT_SITE_MENU_ITEM_ID:
      data = collectPageData(ACTIONS.COLLECT, info, tab);
      break;

    default:
      break;
  }

  if (tab?.id) {
    chrome.sidePanel.open({ tabId: tab.id })
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage(data);
        }, 100);
      })
      .catch((error) => console.error("Lỗi khi mở Side Panel:", error));
  };
});
