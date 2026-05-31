import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import browser from "webextension-polyfill";

// Import consts
import { ACTIONS, COLLECT_SITE_MENU_ITEM_ID } from "@/extension/const";
import { ExtensionRouteConfigs } from "@/shared/config/routes";

// Import state
import { workbenchStateActions } from "@/extension/state/workbench";

// Import routes
import ExtensionRoutes from "./routes";

// Import types
import type { TBrowserContextMenuMessage } from "@/extension/types/browser";
import type { TCreateCollectionItem } from "@/shared/modules/collection/type";

export function App() {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getActiveTab = async () => {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs[0]?.url) {
        setCurrentUrl(tabs[0].url);
      }
    };
    getActiveTab();
  }, []);

  useEffect(() => {
    const handleMessage = (message: TBrowserContextMenuMessage) => {
      const { action, payload } = message;

      if (action === ACTIONS.COLLECT) {
        if (payload.itemId === COLLECT_SITE_MENU_ITEM_ID) {
          const data: TCreateCollectionItem = {
            content: payload.sourceUrl,
            type: "LINK",
            collectionId: "",
            description: payload.text,
          };

          workbenchStateActions.setCurrnetSectionName("site-collector");
          workbenchStateActions.setSectionDefaultFormData(data);
          navigate(ExtensionRouteConfigs.WorkBench.Path);
        }
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return function () {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const handleSave = async () => {
    const mockData = {
      url: currentUrl,
      scrapedAt: new Date().toISOString(),
      source: "Garage Tools Extension",
    };
    await browser.storage.local.set({ vehicleData: mockData });
    console.log("Data saved to local storage!");
  };

  return <ExtensionRoutes />;
}

export default App;
