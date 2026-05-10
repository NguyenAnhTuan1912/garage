import type { TUser } from "../user/type";

export type TSignInReqPayload = {
  username: string;
  password: string;
};

export type TSignInResPayload = {
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type TRefreshTokensPayload = TSignInResPayload;

export type TApiKey = {
  id: string;
  value?: string;
  isActive: boolean;
  expireAt: string;
  createdAt: string;
  updatedAt: string;
};