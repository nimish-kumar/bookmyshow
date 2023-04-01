import { tw } from "@lib";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CalendarTileModeType = "default" | "selected" | "disabled";

export interface ICalendarTile {
  day: string;
  date: number;
  month: string;
  mode?: CalendarTileModeType;
}
const NonTouchableCalendarTile = ({
  day,
  date,
  month,
  mode = "default",
}: ICalendarTile) => {
  return (
    <View
      style={tw`px-3.7 pt-2 pb-5 items-center ${
        mode === "selected" ? "bg-pink" : ""
      }`}
    >
      <Text
        style={tw`text-sm ${
          mode === "selected" ? "text-white" : "text-gray-500"
        }`}
      >
        {day}
      </Text>
      <Text
        style={tw`text-xl font-roboto-regular ${
          mode === "disabled"
            ? "text-gray-500"
            : mode === "selected"
            ? "text-white"
            : "text-slate-800"
        }`}
      >
        {date}
      </Text>
      <Text
        style={tw`${
          mode === "selected" ? "text-white" : "text-gray-500"
        } text-sm `}
      >
        {month}
      </Text>
    </View>
  );
};

export const CalendarDateTile = ({ day, date, month, mode }: ICalendarTile) => {
  if (mode === "disabled") {
    return (
      <NonTouchableCalendarTile
        day={day}
        month={month}
        date={date}
        mode={mode}
      />
    );
  }
  return (
    <TouchableOpacity>
      <NonTouchableCalendarTile
        day={day}
        month={month}
        date={date}
        mode={mode}
      />
    </TouchableOpacity>
  );
};
