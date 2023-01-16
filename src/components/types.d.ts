import { GestureResponderEvent } from "react-native";

export interface ITitlebarProps {
  currentCity: string;
  searchHandler?: (event: GestureResponderEvent) => void;
  notificationHandler?: (event: GestureResponderEvent) => void;
  scanHandler?: (event: GestureResponderEvent) => void;
}

export interface IActivity {
  id: string;
  imgSrc: any;
  title: string;
  pressHandler?: (event: GestureResponderEvent) => void;
  description?: string;
  additionalInfo?: string;
}
