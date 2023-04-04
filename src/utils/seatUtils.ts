export const SeatStatusCode = {
  sold: 0,
  available: 1,
  selected: 2,
} as const;
export type SeatStatus = keyof typeof SeatStatusCode;

export const seatGenerator = (
  groupCode: string,
  row: string,
  col: number,
  seatNumber: number,
  statusCode?: SeatStatus
) => {
  if (statusCode) {
    const status = SeatStatusCode[statusCode];
    return `${status}${groupCode}&${row}${col}+${seatNumber}`;
  }
  return `${groupCode}&${row}${col}+${seatNumber}`;
};

export const prependSeatRow = (
  grpIndex: number,
  rowHead: string,
  grpCode: string,
  rowString: string
) => `${grpIndex}:${rowHead}:${grpCode}000:${rowString}`;

export const aisleGenerator = (grpCode: string) => `${grpCode}0+0`;
// '4D&AA99+16'
// {STATUS_CODE}{GRP_CODE}{&}{ROW}{COL}+SEAT_NO
export const getSeatDetails = (seatString: string) => {
  const regex = /^([0-9]?)([A-Z]+)&([A-Z]+)([0-9]+)\+([0-9]+)$/gm;
  const matches = seatString.matchAll(regex);
  const seatDetailsArray = [];
  for (const match of matches) {
    seatDetailsArray.push(match);
  }
  try {
    return {
      inputString: seatDetailsArray[0][0],
      seatStatusCode: seatDetailsArray[0][1],
      seatGrpCode: seatDetailsArray[0][2],
      seatRow: seatDetailsArray[0][3],
      seatCol: parseInt(seatDetailsArray[0][4], 10),
      seatNumber: parseInt(seatDetailsArray[0][5], 10),
    };
  } catch (err) {
    console.error("Caught error while extracting seat details", err);
    return null;
  }
};

export const immutableInsertArray = <T>(row: T[], index: number, obj: T) => [
  ...row.slice(0, index),
  obj,
  ...row.slice(index + 1),
];

export interface IRowDetails {
  inputString: string;
  grpRowIndex: number;
  rowHead: string;
  seatGrpCode: string;
  seatsString: string;
}
// 1:F:D000:D0+0:D0+0:4D&F16+16:4D&F15+15:D0+0:D0+0:4D&F12+15|
export const hasRowStarted = (rowString: string): IRowDetails | null => {
  const regex = /^([0-9]+:[A-Z]+:[A-Z]+000:)(.*)/gm;
  const matches = rowString.matchAll(regex);
  const seatDetailsArray = [];
  for (const match of matches) {
    seatDetailsArray.push(match);
  }
  if (seatDetailsArray.length > 0) {
    return {
      inputString: seatDetailsArray[0][0],
      grpRowIndex: parseInt(seatDetailsArray[0][1].split(":")[0], 10),
      rowHead: seatDetailsArray[0][1].split(":")[1],
      seatGrpCode: seatDetailsArray[0][1].split(":")[2].split("000")[0],
      seatsString: seatDetailsArray[0][2],
    };
  }
  return null;
};

export interface IGrpDetails {
  inputGroupString: string;
  grpName: string;
  grpCode: string;
  cost: number;
  grpOrder: number;
  currency: string;
  rows: IRowDetails[];
}

export const extractGroupsDetails = (
  grpDeatilsString: string
): IGrpDetails | null => {
  const grpRegex = /^([A-Z]+):([A-Z]+):([\d]+):INR:([\d]+):N$/gm;
  const grpDetails = [];
  for (const match of grpDeatilsString.matchAll(grpRegex)) {
    grpDetails.push(match);
  }
  if (grpDetails.length > 0) {
    return {
      inputGroupString: grpDetails[0][0],
      grpName: grpDetails[0][1],
      grpCode: grpDetails[0][2],
      cost: parseInt(grpDetails[0][3], 10),
      grpOrder: parseInt(grpDetails[0][4], 10),
      currency: "INR",
      rows: [],
    };
  }
  return null;
};

export const isAisle = (boxString: string): boolean => {
  const regex = /^[A-Z]+0\+0$/;
  return regex.test(boxString);
};

export const getUpdatedRow = (row: string[], index: number, reverse = true) => {
  let updatedRow: string[] = [...row];
  if (reverse) {
    updatedRow = updatedRow.reverse();
    index = updatedRow.length - (index + 1);
  }
  const selectedSeat = getSeatDetails(updatedRow[index]);
  if (selectedSeat) {
    let updatedSeat = "";
    if (
      parseInt(selectedSeat.seatStatusCode, 10) === SeatStatusCode["available"]
    ) {
      updatedSeat = seatGenerator(
        selectedSeat.seatGrpCode,
        selectedSeat.seatRow,
        selectedSeat.seatCol,
        selectedSeat.seatNumber,
        "selected"
      );
    } else {
      updatedSeat = seatGenerator(
        selectedSeat.seatGrpCode,
        selectedSeat.seatRow,
        selectedSeat.seatCol,
        selectedSeat.seatNumber,
        "available"
      );
    }
    updatedRow = immutableInsertArray(updatedRow, index, updatedSeat);
  }
  if (reverse) {
    updatedRow = [...updatedRow].reverse();
  }
  return updatedRow;
};

export const calculateTotalCost = (
  grpDetails: IGrpDetails[],
  seats: string[]
): number => {
  let cost = 0;
  for (let i = 0; i < seats.length; i++) {
    const seatDetails = getSeatDetails(seats[i]);
    if (seatDetails) {
      const grpCode = seatDetails.seatGrpCode;
      const grp = grpDetails.find((grp) => grp.grpCode === grpCode);
      if (grp) {
        cost += grp.cost;
      } else {
        throw Error(`ParseError: Could not parse seat ${seats[i]}`);
      }
    } else {
      throw Error(`ParseError: Could not parse seat ${seats[i]}`);
    }
  }
  return cost;
};
