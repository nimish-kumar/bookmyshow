import { tw } from "@tailwind";
import {
  IRowDetails,
  getSeatDetails,
  getUpdatedRow,
  hasRowStarted,
  isAisle,
  prependSeatRow,
  seatGenerator,
} from "@utils";
import React from "react";
import { Text, View } from "react-native";

import { Gap } from "./Gap";
import { Seat } from "./Seat";
const NonMemoizedSeatRow = ({
  rowHead,
  seatsString,
  updateRowDetails,
  updateSelectedSeats,
  grpRowIndex,
  grpCode,
}: ISeatRowProps) => {
  const seatsArray = seatsString.split(":");
  const updatedRow = (seatIndex: number) => {
    const updatedRow = getUpdatedRow(seatsArray, seatIndex).join(":");
    const updatedRowDetails = hasRowStarted(
      prependSeatRow(grpRowIndex, rowHead, grpCode, updatedRow)
    );
    if (updatedRowDetails === null) {
      throw Error("ParsingError: Error while parsing updated row");
    }
    return updatedRowDetails;
  };

  return (
    <View style={tw`flex-row mt-1 items-center`}>
      <Text style={tw`text-sm text-gray-500 w-4`}>{rowHead}</Text>
      {seatsArray.map((seat, idx) => {
        if (isAisle(seat)) {
          return <Gap key={`gap-${idx}`} />;
        } else {
          return (
            <Seat
              key={`seat-${idx}`}
              seat={seat}
              seatSelectHandler={() => {
                // Updates seats in the row when tapped
                updateRowDetails(updatedRow(idx));

                const seatDetails = getSeatDetails(seat);
                if (!seatDetails)
                  throw Error(`ParseError: Could not render seat ${seat}`);

                // Keeps track of selected seats
                if (updateSelectedSeats) {
                  updateSelectedSeats(
                    seatGenerator(
                      seatDetails.seatGrpCode,
                      seatDetails.seatRow,
                      seatDetails.seatCol,
                      seatDetails.seatNumber
                    )
                  );
                }
              }}
            />
          );
        }
      })}
    </View>
  );
};

const shouldNotRender = (
  prevProps: ISeatRowProps,
  currentProps: ISeatRowProps
) => {
  return prevProps.seatsString === currentProps.seatsString;
};
export const SeatRow = React.memo(NonMemoizedSeatRow, shouldNotRender);
