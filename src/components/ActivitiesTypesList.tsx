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
import { tw } from "@lib";
import { Image } from "@rneui/themed";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { IActivity } from "./types";

const activitiesTypesList: IActivity[] = [
  {
    id: "movies",
    title: "Movies",
    imgSrc: MoviesIcon,
  },
  {
    id: "stream",
    title: "Stream",
    imgSrc: StreamIcon,
  },
  {
    id: "sports",
    title: "Sports",
    imgSrc: SportsIcon,
  },
  {
    id: "music-shows",
    title: "Music shows",
    imgSrc: MusicShowsIcon,
  },
  {
    id: "plays",
    title: "Plays",
    imgSrc: PlaysIcon,
  },
  {
    id: "comedy",
    title: "Comedy shows",
    imgSrc: ComedyShowsIcon,
  },
  {
    id: "amusement-park",
    title: "Amusement park",
    imgSrc: AmusementParkIcon,
  },
  {
    id: "all",
    title: "See all",
    imgSrc: SeeAllIcon,
  },
];

export const ActivitiesTypesList = () => {
  return (
    <FlatList
      horizontal
      keyExtractor={({ id }) => id}
      data={activitiesTypesList}
      style={tw`h-20`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          style={tw`aspect-square flex-1 w-19 h-19`}
          source={item.imgSrc}
          onPress={item.pressHandler}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
    />
  );
};
