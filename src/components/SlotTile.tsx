import { tw } from "@tailwind";
import { ISlotTile } from "@types";
import dayjs from "dayjs";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const SlotTile = ({
  theatreName,
  areaName,
  slots,
  cancellationAvailable = false,
  slotSelectHandler,
}: ISlotTile) => {
  return (
    <View style={tw`px-4 py-4 bg-white`}>
      <View style={tw`flex-col mb-2 justify-center`}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={tw`w-4/5 font-roboto-medium text-sm text-slate-700`}
        >
          {areaName ? `${theatreName}, ${areaName}` : `${theatreName}`}
        </Text>
        <Text style={tw`text-xs text-slate-400`}>
          {cancellationAvailable ? "Cancellation Available" : "Non-cancellable"}
        </Text>
      </View>
      <View style={tw`flex flex-wrap flex-row`}>
        {slots.map((slot, idx) => {
          return (
            <TouchableOpacity
              style={tw`mr-2`}
              key={idx}
              onPress={slotSelectHandler}
            >
              <View
                style={tw`py-2 mt-2 border border-black border-opacity-60 justify-center items-center rounded-sm w-24.66`}
              >
                <Text style={tw`font-roboto-bold text-green-500`}>
                  {dayjs(slot.screeningDatetime).format("hh:mm a")}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
