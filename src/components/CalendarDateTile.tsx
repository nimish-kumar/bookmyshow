import { tw } from "@tailwind";
import { ICalendarTile } from "@types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NonTouchableCalendarTile = ({
  datetime,
  mode = "default",
}: ICalendarTile) => {
  const dateArr = datetime.format("ddd DD MMM YYYY").toUpperCase().split(" ");
  const day = dateArr[0];
  const date = dateArr[1];
  const month = dateArr[2];
  return (
    <View
      style={tw`px-4 pt-2 pb-4 items-center ${
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

export const CalendarDateTile = ({
  datetime,
  mode,
  selectDateHandler,
}: ICalendarTile) => {
  return (
    <TouchableOpacity
      onPress={selectDateHandler}
      disabled={mode === "disabled"}
    >
      <NonTouchableCalendarTile datetime={datetime} mode={mode} />
    </TouchableOpacity>
  );
};
