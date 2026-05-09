import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

// Import components
import EmptyUnderDevelopment from "@/shared/components/empty-under-development";

export function App() {
  const [currentUrl, setCurrentUrl] = useState<string>("");

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

  const handleSave = async () => {
    const mockData = {
      url: currentUrl,
      scrapedAt: new Date().toISOString(),
      source: "Garage Tools Extension",
    };
    await browser.storage.local.set({ vehicleData: mockData });
    console.log("Data saved to local storage!");
  };

  return (
    <EmptyUnderDevelopment />
  );
}

export default App;
