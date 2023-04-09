import { tw } from "@lib";
import {
  IGrpDetails,
  IRowDetails,
  extractGroupsDetails,
  hasRowStarted,
  immutableInsertArray,
} from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { SeatRow, SeatRowHeader } from "./seats";

interface ILayoutViewerProps {
  layout: string;
  selectedSeatChangeHandler?: (seat: string) => void;
}

export const LayoutViewer = ({
  layout,
  selectedSeatChangeHandler,
}: ILayoutViewerProps) => {
  const [grps, rows] = layout.split("||");
  const rowsArray = useMemo(
    () =>
      rows
        .split("|")
        .map((row) => hasRowStarted(row))
        .sort((a, b) => (a?.grpRowIndex ?? 0) - (b?.grpRowIndex ?? 0))
        .filter((n) => !!n) as IRowDetails[],
    [layout]
  );

  const grpsArray = useMemo(
    () =>
      grps
        .split("|")
        .map((grp) => extractGroupsDetails(grp))
        .sort((a, b) => (a?.grpOrder ?? 0) - (b?.grpOrder ?? 0))
        .filter((x) => !!x) as IGrpDetails[],
    [layout]
  );

  const updatedGrpWithRows = grpsArray.map((g) => {
    const grpCode = g.grpCode;
    const rows = rowsArray.filter((r) => r.seatGrpCode === grpCode);
    g["rows"] = [...rows];
    return g;
  });
  const [theatreGrps, setTheatreGrps] =
    useState<IGrpDetails[]>(updatedGrpWithRows);

  useEffect(() => {
    setTheatreGrps(updatedGrpWithRows);
  }, [layout]);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[{ display: "flex", flex: 1, alignItems: "center" }]}>
          {theatreGrps.map((grp, grpIndex) => {
            const rows = grp.rows;
            return (
              <SeatRowHeader
                grpName={grp.grpName}
                cost={grp.cost}
                key={grpIndex}
              >
                {rows.map((row, rowIndex) => {
                  function updateLayout(
                    updatedRowDetails: IRowDetails,
                    grpIndex: number
                  ) {
                    setTheatreGrps((theatreGrps) =>
                      immutableInsertArray(theatreGrps, grpIndex, {
                        ...theatreGrps[grpIndex],
                        rows: immutableInsertArray(
                          theatreGrps[grpIndex].rows,
                          rowIndex,
                          updatedRowDetails
                        ),
                      })
                    );
                  }
                  return (
                    <SeatRow
                      rowHead={row.rowHead}
                      seatsString={row.seatsString}
                      grpCode={row.seatGrpCode}
                      grpRowIndex={row.grpRowIndex}
                      updateRowDetails={(rowDetails) =>
                        updateLayout(rowDetails, grpIndex)
                      }
                      updateSelectedSeats={(seat) =>
                        selectedSeatChangeHandler &&
                        selectedSeatChangeHandler(seat)
                      }
                      key={rowIndex}
                    />
                  );
                })}
              </SeatRowHeader>
            );
          })}
          <View
            style={tw`w-1/3 h-5 shadow-lg shadow-red-600 my-4 border-red-600`}
          />
          <Text style={tw`text-xs font-roboto-regular text-gray-500`}>
            All eyes this way please!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
