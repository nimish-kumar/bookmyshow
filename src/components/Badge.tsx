import { tw } from "@lib";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IBadgeProps {
  badgeText: string;
  onPress?: () => void;
}
export const Badge = ({ badgeText, onPress }: IBadgeProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tw`mt-4 mr-2 rounded-3xl border mb-4 items-center min-w-15 h-8 justify-center`}
      >
        <Text style={tw`text-sm text-pink`}>{badgeText}</Text>
      </View>
    </TouchableOpacity>
  );
};
