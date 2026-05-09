import { create } from "zustand";

// Import utils
import * as BrowserStorage from "@/shared/utils/browser_storage";

// Import types
import type { TUserState, TUserStateSetters } from "./type";

const USER_STORAGE_KEY = "user";

function getInitialState(): TUserState {
  return {
    isAuthenticated: false,
    data: BrowserStorage.getItem(USER_STORAGE_KEY) || undefined,
  };
}

export const useUserState = create<TUserState>(() => getInitialState());

export const userStateSetters: TUserStateSetters = {
  setIsAuthenticated(status) {
    useUserState.setState((state) => {
      state.isAuthenticated = status;

      return { ...state };
    });
  },

  setUser(user) {
    useUserState.setState((state) => {
      state.data = user;

      BrowserStorage.setItem(USER_STORAGE_KEY, user);

      return { ...state };
    });
  },

  clearUser() {
    useUserState.setState((state) => {
      state.data = undefined;

      return { ...state };
    });
  },

  reset() {
    useUserState.setState(() => {
      return getInitialState();
    });
  },
};
