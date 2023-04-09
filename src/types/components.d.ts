import { PropsWithChildren } from "react";
import { GestureResponderEvent } from "react-native";

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

export interface IActivityList {
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
  day: string;
  date: number;
  month: string;
  mode?: CalendarTileModeType;
}
export interface IBadgeProps {
  badgeText: string;
  onPress?: () => void;
  mode?: BadgeModeType;
}
