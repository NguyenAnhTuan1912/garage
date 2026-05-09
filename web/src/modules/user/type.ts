export enum EUserRole {
  USER,
  ADMIN
};

export type TUser = {
  id: string;
  role: EUserRole;
  email: string;
  username: string;
  displayName?: string;
  fullName: string;
  photo?: string;
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
