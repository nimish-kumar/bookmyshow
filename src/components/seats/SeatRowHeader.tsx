import { tw } from "@lib";
import React, { PropsWithChildren } from "react";
import { Text, View } from "react-native";

interface ISeatRowHeaderProps {
  grpName: string;
  cost: number;
}
export const SeatRowHeader: React.FC<
  PropsWithChildren<ISeatRowHeaderProps>
> = ({ grpName, cost, children }) => {
  return (
    <View style={tw`justify-start mt-4 mb-2 px-6`}>
      <Text
        style={tw`text-gray-500 text-sm mb-1`}
      >{`${grpName}      Rs. ${cost}`}</Text>
      <View style={tw`border-t border-gray-300`} />
      <View style={tw`justify-center pt-2`}>{children}</View>
    </View>
  );
};
