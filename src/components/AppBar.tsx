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
      <Text
        style={tw`text-base text-white ml-6 w-2/3`}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <View style={tw`items-center flex-row`}>{extras}</View>
    </View>
  );
};
