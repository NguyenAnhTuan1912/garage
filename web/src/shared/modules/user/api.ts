import { API } from "@/shared/api";

// Import types
import type { TUser, TUserUpdate } from "./type";

const api = new API({
  baseURL: import.meta.env.VITE_MAINSERVER_BASEURL,
});

/**
 * Get personal user information.
 * @returns
 */
export async function me() {
  const path = "/api/users/me";
  return api.get<TUser>(path, { withCredentials: true });
}

/**
 * Update user profile.
 * @param params 
 * @returns 
 */
export async function updateProfile(params: TUserUpdate) {
  const path = "/api/users/me";
  return api.put(path, params, { withCredentials: true });
}
