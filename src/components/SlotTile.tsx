import { tw } from "@lib";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ITimeSlot {
  time: string;
  available?: boolean;
}
export interface ISlotTile {
  theatreName: string;
  areaName?: string;
  cancellationAvailable?: boolean;
  slots: ITimeSlot[];
}

export const SlotTile = ({
  theatreName,
  areaName,
  slots,
  cancellationAvailable = false,
}: ISlotTile) => {
  return (
    <View style={tw`px-4 py-4 bg-white`}>
      <View style={tw`flex-row mb-2`}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={tw`w-4/5 font-roboto-medium text-sm`}
        >
          {areaName ? `${theatreName}, ${areaName}` : `${theatreName}`}
        </Text>
      </View>
      <View style={tw`flex flex-wrap flex-row`}>
        {slots.map((slot, idx) => {
          return (
            <TouchableOpacity style={tw`mr-2`} key={idx}>
              <View
                style={tw`py-2 mt-2 border border-black border-opacity-60 justify-center items-center rounded-sm w-24.66`}
              >
                <Text style={tw`font-roboto-bold text-green-500`}>
                  {slot.time}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
