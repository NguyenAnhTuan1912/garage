import { API } from "./api";

const api = new API({
  baseURL: import.meta.env.VITE_MAINSERVER_BASEURL,
});

export { API, api };