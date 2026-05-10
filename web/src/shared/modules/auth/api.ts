import { api } from "@/shared/api";

// Import types
import type {
  TSignInReqPayload,
  TSignInResPayload,
  TRefreshTokensPayload,
  TApiKey,
} from "./type";

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
  return api.post<TRefreshTokensPayload>(path, null, { withCredentials: true });
}

/**
 * List api keys of users.
 * @returns
 */
export async function listApiKeys() {
  const path = "/api/auth/api-keys";
  return api.get<TApiKey[]>(path, { withCredentials: true });
}

/**
 * Create api key.
 * @returns 
 */
export async function createApiKey() {
  const path = "/api/auth/api-keys";
  return api.post<TApiKey>(path, { withCredentials: true });
}

/**
 * Update api key.
 * @param param0 
 * @returns 
 */
export async function updateApiKey({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const path = `/api/auth/api-keys/${id}`;
  return api.patch<TApiKey>(path, { isActive }, { withCredentials: true });
}

/**
 * Delete api key.
 * @param id 
 * @returns 
 */
export async function deleteApiKey(id: string) {
  const path = `/api/auth/api-keys/${id}`;
  return api.delete<TApiKey>(path, { withCredentials: true });
}

/**
 * Test connection to server with api key.
 * @returns 
 */
export async function testConnectionWithApiKey() {
  const path = "/api/auth/api-keys/connection";
  return api.post<{ data: boolean }>(path, null, { withCredentials: true });
}
