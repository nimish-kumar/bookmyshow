import {
  BookingSlotType,
  ObtainJsonWebToken,
  PaginatedBookingType,
  PaginatedMoviesListFormats,
  Refresh,
  UpdateUserDetails,
} from "src/__generated__/graphql";

export interface IAccessTokenData {
  tokenAuth: ObtainJsonWebToken;
}
export interface IRefreshTokenData {
  refreshToken: Refresh;
}
export interface IPayload {
  email: string;
  exp: number;
  origIat: number;
}

export interface IMoviesListFormatsData {
  listMovieLangByCity: PaginatedMoviesListFormats;
}

export interface ISlotListData {
  listMovieSlotsByCityDateLang: BookingSlotType[];
}

export interface ITheatreGroupedSlot {
  theatreId: string;
  theatreName: string;
  areaName: string;
  timeSlots: BookingSlotType[];
}
export interface IGroupedSlot {
  date: string;
  theatreSlots: ITheatreGroupedSlot[] | null;
}

export interface ISlotDetailsData {
  getSlotDetails: BookingSlotType;
}

export interface IBookingTicketData {
  bookTickets: BookingSlotType[];
}

export interface IListBookingDetailsData {
  listBookingDetails: PaginatedBookingType;
}

export interface IUpdateUserDetails {
  updateUser: UpdateUserDetails;
}
