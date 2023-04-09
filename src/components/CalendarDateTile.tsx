import { tw } from "@tailwind";
import { ICalendarTile } from "@types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NonTouchableCalendarTile = ({
  day,
  date,
  month,
  mode = "default",
}: ICalendarTile) => {
  return (
    <View
      style={tw`px-4 pt-2 pb-8 items-center ${
        mode === "selected" ? "bg-pink" : ""
      }`}
    >
      <Text
        style={tw`text-xs ${
          mode === "selected" ? "text-white" : "text-gray-500"
        }`}
      >
        {day}
      </Text>
      <Text
        style={tw`text-xl  ${
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
        } text-xs `}
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
