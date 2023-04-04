import {
  IGrpDetails,
  IRowDetails,
  extractGroupsDetails,
  hasRowStarted,
  immutableInsertArray,
} from "@utils";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { SeatRow, SeatRowHeader } from "./seats";

interface ILayoutViewerProps {
  layout: string;
}

export const LayoutViewer = ({ layout }: ILayoutViewerProps) => {
  const [grps, rows] = layout.split("||");
  const rowsArray = rows
    .split("|")
    .map((row) => hasRowStarted(row))
    .sort((a, b) => (a?.grpRowIndex ?? 0) - (b?.grpRowIndex ?? 0))
    .filter((n) => !!n) as IRowDetails[];

  const grpsArray = grps
    .split("|")
    .map((grp) => extractGroupsDetails(grp))
    .sort((a, b) => (a?.grpOrder ?? 0) - (b?.grpOrder ?? 0))
    .filter((x) => !!x) as IGrpDetails[];

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
      <ScrollView horizontal>
        <View style={[{ display: "flex", flex: 1 }]}>
          {theatreGrps.map((grp, grpIndex) => {
            const rows = grp.rows;
            return (
              <SeatRowHeader
                grpName={grp.grpName}
                cost={grp.cost}
                key={grpIndex}
              >
                {rows.map((row, rowIndex) => {
                  function updateTheatreGrps(
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
                        updateTheatreGrps(rowDetails, grpIndex)
                      }
                      key={rowIndex}
                    />
                  );
                })}
              </SeatRowHeader>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
