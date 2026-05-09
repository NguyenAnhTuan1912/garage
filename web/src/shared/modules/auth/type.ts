import type { TUser } from "../user/type";

export type TSignInReqPayload = {
  username: string;
  password: string;
};

export type TSignInResPayload = {
  accessToken: string;
  user: TUser;
};