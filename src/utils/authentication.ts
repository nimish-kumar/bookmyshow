import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";
import jwtDecode, { JwtPayload } from "jwt-decode";

export const hasTokenExpired = (token: string) => {
  const expTime = jwtDecode<JwtPayload>(token).exp;
  if (expTime === undefined)
    throw new Error("Expiry time not available on the token");
  return dayjs(expTime) >= dayjs();
};
export const setAccessToken = async (token: string) => {
  await SecureStore.setItemAsync("accessToken", token);
};
export const getAccessToken = async () => {
  const result = await SecureStore.getItemAsync("accessToken");
  if (result) return result;
  return null;
};
export const setRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync("refreshToken", token);
};
export const getRefreshToken = async () => {
  const result = await SecureStore.getItemAsync("refreshToken");
  if (result) return result;
  return null;
};
