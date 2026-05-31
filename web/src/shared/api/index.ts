// Import types
import type { AxiosRequestConfig } from "axios";

import { API } from "./api";

const isExtension = import.meta.env.VITE_IS_EXTENSION === "true";

const config: AxiosRequestConfig = {
  baseURL: isExtension ? import.meta.env.VITE_MAINSERVER_BASEURL : "",
};

if (isExtension) {
  config.withCredentials = false;
}

const api = new API(config);

if (isExtension) {
  api.hook("request", async (req) => {
    const browser = (await import("webextension-polyfill")).default;
    const apiKeyItem = await browser.storage.local.get("api-key");
    const apiKey = apiKeyItem["api-key"] as string;
    
    req.headers.set("X-API-KEY", apiKey);
    return req;
  });
}

export { API, api };
