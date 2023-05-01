import { BookMyShowSvg } from "@assets";
import { tw } from "@tailwind";
import React from "react";
import { ActivityIndicator, View } from "react-native";
export const Splash = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-pink opacity-95`}>
      <BookMyShowSvg height={200} width={200} />
      <ActivityIndicator
        size="large"
        color="#fff"
        style={tw`h-140 w-140 font-extrabold`}
      />
    </View>
  );
};
