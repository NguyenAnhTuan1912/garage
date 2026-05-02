import { API } from "@/api";

// Import types
import type { TSignInReqPayload, TSignInResPayload } from "./type";

const api = new API({
  baseURL: import.meta.env.VITE_MAINSERVER_BASEURL,
});

/**
 * Sign in user to system.
 * @param params
 * @returns
 */
export async function signIn(params: TSignInReqPayload) {
  const path = "/api/auth/login";
  return api.post<TSignInResPayload>(path, {
    username: params.username,
    password: params.password,
  });
}

/**
 * Refresh access token.
 * @returns
 */
export async function refreshTokens() {
  const path = "/api/auth/access-token/new";
  return api.post(path, null, { withCredentials: true });
}
