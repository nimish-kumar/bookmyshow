import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
interface ILoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  style?: StyleProp<ViewStyle>;
}
export const Loader = ({ size = "md", style }: ILoaderProps) => {
  if (size === "sm")
    return <ActivityIndicator size={25} color="red" style={style} />;

  if (size === "lg")
    return <ActivityIndicator size={75} color="red" style={style} />;

  if (size === "xl")
    return <ActivityIndicator size={100} color="red" style={style} />;

  return <ActivityIndicator size={50} color="red" />;
};
