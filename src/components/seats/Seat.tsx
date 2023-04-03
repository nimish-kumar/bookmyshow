import { tw } from "@lib";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export const SeatStatusCode = {
  sold: 0,
  available: 1,
  selected: 2,
} as const;
export type SeatStatus = keyof typeof SeatStatusCode;

interface ISeatProps {
  seatNumber: string;
  status: SeatStatus;
  seatSelectHandler?: () => void;
}

export const Seat = ({ seatNumber, status, seatSelectHandler }: ISeatProps) => {
  const seat = (
    <View
      style={[
        tw`bg-white mr-1 h-6 w-6 border border-green justify-center items-center rounded-sm`,
        tw`${status === "selected" ? "bg-green" : ""}`,
        tw`${status === "sold" ? "border-gray-400" : ""}`,
      ]}
    >
      <Text
        style={[
          tw`text-xs text-green`,
          tw`${status === "selected" ? " text-white" : ""}`,
          tw`${status === "sold" ? "text-gray-500" : ""}`,
        ]}
      >
        {seatNumber}
      </Text>
    </View>
  );
  if (status === "available") {
    return (
      <TouchableOpacity onPress={seatSelectHandler}>{seat}</TouchableOpacity>
    );
  }
  return seat;
};
