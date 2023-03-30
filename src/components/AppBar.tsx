import { tw } from "@lib";
import { Icon } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";

interface IAppBarProps {
  title: string;
  backButton?: boolean;
  backFunction?: () => void;
  extras?: JSX.Element;
}

export const AppBar = ({
  title,
  backButton,
  backFunction,
  extras,
}: IAppBarProps) => {
  return (
    <View style={tw`h-14 bg-fade-navy px-4 flex-row items-center`}>
      {backButton ? (
        <Icon
          name="chevron-back-outline"
          type="ionicon"
          color="#fff"
          size={28}
          onPress={backFunction}
        />
      ) : null}
      <Text
        style={tw`text-lg text-white font-roboto-regular ml-6 w-2/3`}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <View>{extras}</View>
    </View>
  );
};
