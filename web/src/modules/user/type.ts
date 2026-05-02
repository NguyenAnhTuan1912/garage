export type TUser = {
  id: number;
  role: string;
  fullName: string;
  displayName: string;
  photo: string;
};

export type TUserUpdate = Partial<Omit<TUser, "id" | "role">>;

export type TUserState = {
  isAuthenticated: boolean;
  data: TUser | undefined;
};

export type TUserStateSetters = {
  setIsAuthenticated(status: boolean): void;
  setUser(user: TUser | undefined): void;
  clearUser(): void;
  reset(): void;
};
