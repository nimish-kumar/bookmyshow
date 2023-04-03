import { tw } from "@lib";
import { SeatStatus, SeatStatusCode, getSeatDetails, isAisle } from "@utils";
import React from "react";
import { Text, View } from "react-native";

import { Gap } from "./Gap";
import { Seat } from "./Seat";
interface ISeatRow {
  rowHead: string;
  seatsString: string;
  seatSelectHandler?: (idx: number) => void;
}
export const SeatRow = ({
  rowHead,
  seatsString,
  seatSelectHandler,
}: ISeatRow) => {
  // const rowHead = "A";
  // const seatsString =
  //   "A0+0:A0+0:1A&H1+30:1A&H2+29:1A&H3+28:1A&H4+27:1A&H5+26:1A&H6+25:1A&H7+24:1A&H8+23:1A&H9+22:1A&H10+21:1A&H11+20:1A&H12+19:1A&H13+18:1A&H14+17:1A&H15+16:1A&H16+15:1A&H17+14:1A&H18+13:1A&H19+12:1A&H20+11:1A&H21+10:1A&H22+9:1A&H23+8:1A&H24+7:1A&H25+6:1A&H26+5:1A&H27+4:1A&H28+3:1A&H29+2:1A&H30+1";
  const seatsArray = seatsString.split(":");
  const statuses = Object.keys(SeatStatusCode) as SeatStatus[];
  // Converts status code to status
  const getStatusFromStatusCode = (index: string) =>
    statuses[parseInt(index, 10)];

  return (
    <View style={tw`flex-row`}>
      <Text style={tw`text-lg text-gray-500 w-4 items-center`}>{rowHead}</Text>
      {seatsArray.map((seat, idx) => {
        if (isAisle(seat)) {
          return <Gap key={`gap-${idx}`} />;
        } else {
          const seatDetails = getSeatDetails(seat);
          if (seatDetails) {
            return (
              <Seat
                key={`seat-${idx}`}
                seatNumber={seatDetails.seatNumber}
                status={getStatusFromStatusCode(
                  seatDetails?.seatStatusCode ??
                    `${statuses.indexOf("available")}`
                )}
                seatSelectHandler={() => {
                  if (seatSelectHandler) seatSelectHandler(idx);
                }}
              />
            );
          }
        }
      })}
    </View>
  );
};
