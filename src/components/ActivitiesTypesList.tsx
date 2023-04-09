import {
  AmusementParkIcon,
  ComedyShowsIcon,
  MoviesIcon,
  MusicShowsIcon,
  PlaysIcon,
  SeeAllIcon,
  SportsIcon,
  StreamIcon,
} from "@assets";
import { Image } from "@rneui/themed";
import { tw } from "@tailwind";
import { IActivity } from "@types";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

const activitiesTypesList: IActivity[] = [
  {
    id: 1,
    title: "Movies",
    imgSrc: MoviesIcon,
  },
  {
    id: 2,
    title: "Stream",
    imgSrc: StreamIcon,
  },
  {
    id: 3,
    title: "Sports",
    imgSrc: SportsIcon,
  },
  {
    id: 4,
    title: "Music shows",
    imgSrc: MusicShowsIcon,
  },
  {
    id: 5,
    title: "Plays",
    imgSrc: PlaysIcon,
  },
  {
    id: 6,
    title: "Comedy shows",
    imgSrc: ComedyShowsIcon,
  },
  {
    id: 7,
    title: "Amusement park",
    imgSrc: AmusementParkIcon,
  },
  {
    id: 8,
    title: "See all",
    imgSrc: SeeAllIcon,
  },
];

export const ActivitiesTypesList = () => {
  return (
    <FlatList
      horizontal
      keyExtractor={(item, index) => `${item.id}`}
      data={activitiesTypesList}
      style={tw`h-20`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          style={tw`aspect-square flex-1 w-19 h-19`}
          source={item.imgSrc}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
    />
  );
};
