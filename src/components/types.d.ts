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
