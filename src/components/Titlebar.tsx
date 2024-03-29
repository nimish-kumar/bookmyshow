import { Icon } from "@rneui/themed";
import { tw } from "@tailwind";
import { ITitlebarProps } from "@types";
import React from "react";
import { Text, View } from "react-native";

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
        <Text style={tw`text-white text-lg font-montserrat-bold`}>
          It All Starts Here
        </Text>
        <Text
          style={tw`text-white text-xs font-montserrat`}
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
