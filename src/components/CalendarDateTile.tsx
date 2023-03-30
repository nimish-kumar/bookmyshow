import { tw } from "@lib";
import React from "react";
import { Text, View } from "react-native";

export const CalendarDateTile = () => {
  return (
    <View style={tw`px-4 py-2 items-center flex-col`}>
      <Text>Day</Text>
      <Text>Date</Text>
      <Text>Month</Text>
    </View>
  );
};
