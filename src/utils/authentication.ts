import { IPayload } from "@types";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

export const isPastOrEqual = (exp: number) => dayjs(exp * 1000) <= dayjs();
export const hasTokenExpired = (token: string) => {
  const decodedJwt = jwtDecode<IPayload>(token);
  const expTime = decodedJwt.exp;

  if (expTime === undefined)
    throw new Error("Expiry time not available on the token");
  return isPastOrEqual(expTime);
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
export const getRefreshExpiryTime = async () => {
  const result = await SecureStore.getItemAsync("refreshExpiresIn");
  if (result) return parseInt(result, 10);
  return null;
};
export const setRefreshExpiryTime = async (expTimestamp: number) => {
  await SecureStore.setItemAsync("refreshExpiresIn", `${expTimestamp}`);
};
