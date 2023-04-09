import { tw } from "@lib";
import React from "react";
import { View } from "react-native";

const NonMemoizedGap = () => {
  return <View style={tw`h-6 w-6 mr-1`} />;
};

export const Gap = React.memo(NonMemoizedGap);
