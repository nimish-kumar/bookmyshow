import { tw } from "@tailwind";
import { ISlotTileProps } from "@types";
import dayjs from "dayjs";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NonMemoizedSlotTile = ({
  theatreName,
  areaName,
  slots,
  cancellationAvailable = false,
  slotSelectHandler,
}: ISlotTileProps) => {
  return (
    <View style={tw`px-4 py-4 bg-white`}>
      <View style={tw`flex-col mb-2 justify-center`}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={tw`font-roboto-medium text-base text-slate-700`}
        >
          {theatreName}
        </Text>
        <View style={tw`flex-row items-center justify-between mb-1`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`font-roboto-regular text-sm text-slate-400`}
          >
            {areaName}
          </Text>
          <Text style={tw`text-xs text-slate-400`}>
            {cancellationAvailable
              ? "Cancellation Available"
              : "Non-cancellable"}
          </Text>
        </View>
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

const shouldNotRender = (
  prevProps: ISlotTileProps,
  nextProps: ISlotTileProps
) =>
  prevProps.areaName === nextProps.areaName &&
  prevProps.cancellationAvailable === nextProps.cancellationAvailable &&
  prevProps.theatreName === nextProps.theatreName;

export const SlotTile = React.memo(NonMemoizedSlotTile, shouldNotRender);
