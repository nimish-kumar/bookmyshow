import { SeatStatusCode } from "@utils";

export interface IRowDetails {
  inputString: string;
  grpRowIndex: number;
  rowHead: string;
  seatGrpCode: string;
  seatsString: string;
}
export interface IGrpDetails {
  inputGroupString: string;
  grpName: string;
  grpCode: string;
  cost: number;
  grpOrder: number;
  currency: string;
  rows: IRowDetails[];
}
export type SeatStatus = keyof typeof SeatStatusCode;

export interface IUserDetails {
  userEmail: string | null;
  userName: string | null;
}
