import { Image } from "@rneui/themed";
import { tw } from "@tailwind";
import { IActivityProps } from "@types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ActivityTile = ({
  activityDetail,
  clickHandler,
}: IActivityProps) => {
  return (
    <TouchableOpacity
      style={tw`h-full w-32 mr-2 flex-col`}
      onPress={() => {
        clickHandler?.(activityDetail.id, activityDetail.title);
      }}
    >
      {activityDetail.imgSrc ? (
        <Image
          style={tw`h-54 w-auto rounded-lg`}
          resizeMode="contain"
          source={activityDetail.imgSrc}
        />
      ) : (
        <View style={tw`h-54 w-auto rounded-lg bg-gray-300`} />
      )}
      <View style={tw`px-1`}>
        <Text
          style={tw`flex-wrap font-roboto-regular text-sm max-h-12 h-auto`}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {activityDetail.title}
        </Text>
        {activityDetail?.description && (
          <Text
            style={tw`font-roboto-regular text-slate-500 text-sm`}
            numberOfLines={1}
          >
            {activityDetail.description}
          </Text>
        )}
        {activityDetail?.additionalInfo && (
          <Text
            style={tw`font-roboto-regular text-slate-500 text-xs`}
            numberOfLines={1}
          >
            {activityDetail.additionalInfo}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
