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
    <View style={tw`justify-start`}>
      <Text style={tw`text-gray-500`}>{`${grpName} - Rs. ${cost}`}</Text>
      <View style={tw`bg-slate-500 border-t border`} />
      <View style={tw`justify-center`}>{children}</View>
    </View>
  );
};
