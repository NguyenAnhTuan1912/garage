import { create } from "zustand";

// Import types
import type { TUserState, TUserStateSetters } from "./type";

function getInitialState(): TUserState {
  return {
    isAuthenticated: false,
    data: undefined,
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
