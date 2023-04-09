import { tw } from "@tailwind";
import { SeatStatus, SeatStatusCode, getSeatDetails } from "@utils";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ISeatProps {
  seat: string;
  seatSelectHandler?: () => void;
}
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
        tw`${status === "sold" ? "border-gray-400" : ""}`,
      ]}
    >
      <Text
        style={[
          tw`text-xs text-gray-500`,
          tw`${status === "selected" ? " text-white" : ""}`,
          tw`${status === "sold" ? "text-gray-500" : ""}`,
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
