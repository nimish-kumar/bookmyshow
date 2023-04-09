import { Icon } from "@rneui/themed";
import { tw } from "@tailwind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const AppBar = ({
  title,
  subtitle,
  backButton,
  backFunction,
  extras,
}: IAppBarProps) => {
  return (
    <View
      style={tw`h-14 bg-light-navy flex-row items-center ${
        !backButton ? "pl-8" : ""
      }`}
    >
      {backButton ? (
        <TouchableOpacity
          onPress={backFunction}
          style={tw`h-full justify-center w-13`}
        >
          <Icon
            name="arrow-left"
            type="simple-line-icon"
            color="#fff"
            size={14}
          />
        </TouchableOpacity>
      ) : null}
      <View style={tw`justify-center w-2/3`}>
        <Text
          style={tw`text-base text-white `}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        {subtitle && <Text style={tw`text-gray-400 text-xs`}>{subtitle}</Text>}
      </View>
      <View style={tw`items-center flex-row`}>{extras}</View>
    </View>
  );
};
