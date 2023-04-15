import { ObtainJsonWebToken, Refresh } from "src/__generated__/graphql";

export interface IAccessTokenData {
  tokenAuth: ObtainJsonWebToken;
}
export interface IRefreshTokenData {
  refreshToken: Refresh;
}
export interface IPayload {
  email: string;
  exp: number;
  origIat: number;
}
