import { tw } from "@tailwind";
import { ISeatProps, SeatStatus } from "@types";
import { SeatStatusCode, getSeatDetails } from "@utils";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const Seat = ({ seat, seatSelectHandler }: ISeatProps) => {
  const seatDetails = getSeatDetails(seat);
  if (!seatDetails) throw Error(`ParseError: Could not render seat ${seat}`);
  const { seatNumber, seatStatusCode } = seatDetails;

  const getStatusFromStatusCode = () => {
    const statuses = Object.keys(SeatStatusCode) as SeatStatus[];
    const status = statuses[parseInt(seatStatusCode, 10)];
    if (!status)
      throw Error(
        `ParseError: COuld not find status with value ${seatStatusCode}`
      );
    return status;
  };
  const status = getStatusFromStatusCode();

  const seatJsx = (
    <View
      style={[
        tw`bg-white mr-1 h-6 w-6 border border-seagreen justify-center items-center rounded-sm`,
        tw`${status === "selected" ? "bg-seagreen" : ""}`,
        tw`${status === "sold" ? "border-gray-300 bg-gray-300 " : ""}`,
      ]}
    >
      <Text
        style={[
          tw`text-xs text-gray-500`,
          tw`${
            status === "selected" || status === "sold" ? " text-white" : ""
          }`,
        ]}
      >
        {seatNumber}
      </Text>
    </View>
  );
  if (status !== "sold") {
    return (
      <TouchableOpacity onPress={seatSelectHandler}>{seatJsx}</TouchableOpacity>
    );
  }
  return seatJsx;
};
