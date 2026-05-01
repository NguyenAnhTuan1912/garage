export type TUser = {
  id: number;
  role: {
    id: number;
    value: string;
    name: string;
  };
  fullName: string;
  photo: string;
  username: string;
  birthDate?: string;
  gender?: string;
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
