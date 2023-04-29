import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPayload, IUserDetails } from "@types";
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

export const setUserDetails = async (name: string | null, email: string) => {
  await AsyncStorage.multiSet([
    ["user_email", email],
    ["user_name", name ?? ""],
  ]);
};

export const getUserDetails = async (): Promise<IUserDetails> => {
  const values = await AsyncStorage.multiGet(["user_email", "user_name"]);
  return {
    userEmail: values[0][1],
    userName: values[1][1],
  };
};

export const removeSecureStoreKeys = async () => {
  const deleteAt = SecureStore.deleteItemAsync("accessToken");
  const deleteRt = SecureStore.deleteItemAsync("refreshToken");
  const deleteRte = SecureStore.deleteItemAsync("refreshExpiresIn");
  return Promise.all([deleteAt, deleteRt, deleteRte])
    .then(() => true)
    .catch(() => false);
};

export const emptyAsyncStorage = async () => {
  await AsyncStorage.clear();
};
