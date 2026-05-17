import { useEffect } from "react";
import { create } from "zustand";
import browser from "webextension-polyfill";

// Import modules
import { useTestConnectionWithApiKeyMutation } from "@/shared/modules/auth/query";

export type TApiKeyState = {
  apiKey: string | undefined;
  isValid: boolean;
};

export type TApiKeyStateActions = {
  setApiKey(apiKey: string): void;
  setIsValid(status: boolean): void;
};

const useApiKeyState = create<TApiKeyState & TApiKeyStateActions>((set) => {
  return {
    apiKey: undefined,
    isValid: false,
    setApiKey(apiKey) {
      set((state) => ({ ...state, apiKey }));
    },
    setIsValid(status) {
      set((state) => ({ ...state, isValid: status }));
    },
  };
});

export function useApiKey() {
  const { apiKey, isValid, setApiKey, setIsValid } = useApiKeyState();

  const { mutateAsync: testConnectionWithApiKey } =
    useTestConnectionWithApiKeyMutation();

  const clearApiKey = function () {
    setApiKey("");
    setIsValid(false);
    browser.storage.local.remove("api-key");
  };

  useEffect(() => {
    const set = async function () {
      browser.storage.local.set({
        "api-key": apiKey,
      });
    };

    if(apiKey) set();
  }, [apiKey]);

  useEffect(() => {
    const init = async function () {
      const apiKeyItem = await browser.storage.local.get("api-key");
      const apiKey = apiKeyItem["api-key"] as string;
      setApiKey(apiKey);
      setIsValid(true);

      try {
        await testConnectionWithApiKey();
      } catch (error) {
        setIsValid(false);
      }
    };

    init();
  }, []);

  return {
    apiKey,
    isValid,
    setApiKey,
    clearApiKey,
  };
}
