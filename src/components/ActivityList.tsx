import { Image } from "@rneui/themed";
import { tw } from "@tailwind";
import { IActivityListProps, IActivityProps } from "@types";
import React from "react";
import {
  FlatList,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Activity = ({ activityDetail, clickHandler }: IActivityProps) => {
  return (
    <TouchableOpacity
      style={tw`h-full w-32 mr-2 flex-col`}
      onPress={() => {
        clickHandler?.(activityDetail.id, activityDetail.title);
      }}
    >
      <Image
        style={tw`h-54 w-auto rounded-lg`}
        resizeMode="contain"
        source={activityDetail.imgSrc as ImageSourcePropType}
      />
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

export const ActivityList = ({
  activities,
  activityHandler,
}: IActivityListProps) => {
  return (
    <FlatList
      horizontal
      data={activities}
      showsHorizontalScrollIndicator={false}
      style={tw`h-auto mt-4`}
      renderItem={({ item: activity }) => (
        <Activity
          key={activity.id}
          activityDetail={activity}
          clickHandler={activityHandler}
        />
      )}
    />
  );
};
