import { PropsWithChildren } from "react";
import { GestureResponderEvent } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";

export type BadgeModeType = "default" | "selected";
export type CalendarTileModeType = "default" | "selected" | "disabled";
export type PanGestureContextType = {
  translateY: number;
};

export type RootStackParamList = {
  Home: undefined;
  SeatSelector: {
    movieId: number;
    lang: string;
    format: string;
    slotId: number;
  };
  SlotSelector: {
    movieId: number;
    lang: string;
    format: string;
  };
  FormatSelector: {
    movieId: number;
  };
};
export type HomeNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
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
  imgSrc: any;
  title: string;
  description?: string;
  additionalInfo?: string;
}

export interface IActivityProps {
  activityDetail: IActivity;
  clickHandler?: (id: number) => void;
}

export interface IActivityListProps {
  activities: IActivity[];
  activityHandler: (id: number) => void;
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
export interface ISlotTile {
  theatreName: string;
  areaName?: string;
  cancellationAvailable?: boolean;
  slots: ITimeSlot[];
  slotSelectHandler?: () => void;
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
