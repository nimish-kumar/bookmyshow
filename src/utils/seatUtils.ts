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
