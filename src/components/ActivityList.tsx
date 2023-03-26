import {
  AvatarTile,
  KutteyTile,
  LakadbaggaTile,
  ValviTile,
  VedTile,
} from "@assets";
import { PortalFrom } from "@context";
import { tw } from "@lib";
import { Image } from "@rneui/themed";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { FormatSelector } from "./popups";
import { IActivity } from "./types";

const movieTiles: IActivity[] = [
  {
    id: "avatar",
    imgSrc: AvatarTile,
    title: "Avatar: The Way of Water",
  },
  {
    id: "kuttey",
    imgSrc: KutteyTile,
    title: "Kuttey",
  },
  {
    id: "lakkadbagga",
    imgSrc: LakadbaggaTile,
    title: "Lakadbaggha",
  },

  {
    id: "valvi",
    imgSrc: ValviTile,
    title: "Vaalvi",
  },
  {
    id: "ved",
    imgSrc: VedTile,
    title: "Ved",
  },
];

const ActivityTile = (activityDetail: IActivity) => {
  const [popupVisibility] = useState(true);
  return (
    <PortalFrom>
      {(portal) => (
        <TouchableOpacity
          style={tw`h-full w-32 mr-2 flex-col`}
          onPress={() => {
            activityDetail.clickHandler?.(activityDetail.id);
            portal(
              "format-selector",
              <FormatSelector
                isVisible={popupVisibility}
                closeBackdrop={() => {
                  // Reset portal for closing backdrop
                  portal("format-selector", <></>);
                }}
              />
            );
          }}
        >
          <Image
            style={tw`h-54 w-auto rounded-lg`}
            resizeMode="contain"
            source={activityDetail.imgSrc}
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
      )}
    </PortalFrom>
  );
};

export const ActivityList = () => {
  return (
    <FlatList
      horizontal
      data={movieTiles}
      showsHorizontalScrollIndicator={false}
      style={tw`h-auto mt-4`}
      renderItem={({ item: movie }) => (
        <ActivityTile key={movie.id} {...movie} />
      )}
    />
  );
};
