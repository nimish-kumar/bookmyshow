import { tw } from "@lib";
import { Icon } from "@rneui/themed";
import React from "react";
import { View, Text } from "react-native";

import { ITitlebarProps } from "./types";

export const Titlebar = ({
  currentCity,
  searchHandler,
  notificationHandler,
  scanHandler,
}: ITitlebarProps) => {
  return (
    <View
      style={tw`bg-fade-navy w-full h-18 flex flex-row justify-between items-center`}
    >
      <View style={tw`flex-col justify-around h-12 pl-4`}>
        <Text style={tw`text-white text-lg font-medium`}>
          It All Starts Here
        </Text>
        <Text
          style={tw`text-white text-xs font-normal`}
        >{`${currentCity} > `}</Text>
      </View>
      <View style={tw`flex flex-row justify-around w-40`}>
        <Icon
          name="search"
          type="feather"
          color="white"
          onPress={searchHandler}
        />
        <Icon
          name="bell"
          type="feather"
          color="white"
          onPress={notificationHandler}
        />
        <Icon
          name="qrcode-scan"
          type="material-community"
          color="white"
          onPress={scanHandler}
        />
      </View>
    </View>
  );
};
