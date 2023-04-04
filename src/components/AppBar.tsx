import { tw } from "@lib";
import { Icon } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";

interface IAppBarProps {
  title: string;
  subtitle?: string;
  backButton?: boolean;
  backFunction?: () => void;
  extras?: JSX.Element;
}

export const AppBar = ({
  title,
  subtitle,
  backButton,
  backFunction,
  extras,
}: IAppBarProps) => {
  return (
    <View style={tw`h-14 bg-light-navy px-4 flex-row items-center`}>
      {backButton ? (
        <Icon
          name="arrow-left"
          type="simple-line-icon"
          color="#fff"
          size={14}
          onPress={backFunction}
        />
      ) : null}
      <View style={tw`justify-center ml-6 w-2/3`}>
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
