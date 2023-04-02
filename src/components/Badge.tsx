import { tw } from "@lib";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type BadgeModeType = "default" | "selected";

interface IBadgeProps {
  badgeText: string;
  onPress?: () => void;
  mode?: BadgeModeType;
}
export const Badge = ({
  badgeText,
  onPress,
  mode = "default",
}: IBadgeProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tw`px-4 rounded-3xl border items-center min-w-12 h-8 justify-center ${
          mode === "selected" ? "bg-pink border-white" : "bg-white"
        }`}
      >
        <Text
          style={tw`text-sm ${
            mode === "selected" ? "text-white" : "text-pink"
          }`}
        >
          {badgeText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
