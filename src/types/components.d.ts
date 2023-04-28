import { PropsWithChildren } from "react";
import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { BookingSlotType } from "src/__generated__/graphql";
import { HomeNavigationProps } from "@screens";

export type BadgeModeType = "default" | "selected";
export type CalendarTileModeType = "default" | "selected" | "disabled";
export type PanGestureContextType = {
  translateY: number;
};
export type SlotType = {
  slotId: string;
  datetime: string;
};
export type RootStackParamList = {
  Startup: undefined;
  Main: undefined;
  SeatSelector: {
    movieId: number;
    lang: string;
    format: string;
    slotId: string;
    movieName: string;
    slotList: SlotType[];
    selectedSlotId: string;
    theatreName: string;
    areaName: string;
  };
  SlotSelector: {
    movieId: number;
    lang: string;
    format: string;
    movieName: string;
    formats: ILanguagesAndFormat[];
  };
  FormatSelector: {
    movieId: number;
    movieName: string;
    formats: ILanguagesAndFormat[];
  };
};

export type StartupNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Startup"
>;

export interface IPriceRange {
  high: number;
  low: number;
}

export interface ITitlebarProps {
  currentCity: string;
  searchHandler?: (event: GestureResponderEvent) => void;
  notificationHandler?: (event: GestureResponderEvent) => void;
  scanHandler?: (event: GestureResponderEvent) => void;
}

export interface IActivity {
  id: number;
  imgSrc: ImageSourcePropType;
  title: string;
  description?: string;
  additionalInfo?: string;
}

export interface IActivityProps {
  activityDetail: IActivity;
  clickHandler?: (id: number, name: string) => void;
}

export interface IActivityListProps {
  activities: IActivity[];
  activityHandler: (id: number, name: string) => void;
}
export interface IAppBarProps {
  title: string;
  subtitle?: string;
  backButton?: boolean;
  backFunction?: () => void;
  extras?: JSX.Element;
}

export interface IBackdropProps extends PropsWithChildren {
  isVisible: boolean;
  closeBackdrop: () => void;
}

export interface ISeatRowHeaderProps {
  grpName: string;
  cost: number;
}

export interface IPortalTo {
  activeGateName: string;
}
export interface ISeatSelectorProps {
  layout: string;
}
export interface ITimingBtnProp {
  time: string;
  type?: "selected" | "default";
  setTimeSlot?: () => void;
}
export interface ITimingLayout {
  time: string;
  layout: string;
}

export interface IGate {
  [gateName: string]: JSX.Element;
}
export interface IPortal {
  gates: IGate;
  gateSetter: (gateName: string, element: JSX.Element) => void;
}
export interface IPortalFrom {
  children?: (
    gateSetter: (gateName: string, element: JSX.Element) => void
  ) => JSX.Element;
}

export interface ISeatRowProps {
  grpCode: string;
  grpRowIndex: number;
  rowHead: string;
  seatsString: string;
  updateRowDetails: (rowDetails: IRowDetails) => void;
  updateSelectedSeats?: (seat: string) => void;
}
export interface ISeatProps {
  seat: string;
  seatSelectHandler?: () => void;
}
export interface ITimeSlot {
  time: string;
  available?: boolean;
}
export interface ISlotTileProps {
  theatreName: string;
  areaName?: string;
  cancellationAvailable?: boolean;
  slots: BookingSlotType[];
  slotSelectHandler?: (idx: number, slotId: string) => void;
}

export interface IMoviesListProps {
  navigation: HomeNavigationProps;
}
export interface ILayoutViewerProps {
  layout: string;
  selectedSeatChangeHandler?: (seat: string) => void;
}
export interface ICalendarTile {
  datetime: dayjs.Dayjs;
  mode?: CalendarTileModeType;
  selectDateHandler?: () => void;
}
export interface IBadgeProps {
  badgeText: string;
  onPress?: () => void;
  mode?: BadgeModeType;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export interface ILanguagesAndFormat {
  code: string;
  lang: string;
  format: string[];
}
export interface ISubmitBtnProps {
  totalCost: number;
  bookingTickets: boolean;
  bookingTicketsData: IBookingTicketData | null | undefined;
  bookingTicketsError: ApolloError | undefined;
}
