import { api } from "@/shared/api";

// Import types
import type { TUser, TUserUpdate } from "./type";

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
