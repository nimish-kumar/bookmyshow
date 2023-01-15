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

const activitiesList: IActivity[] = [
  {
    id: "movies",
    name: "Movies",
    img_src: MoviesIcon,
  },
  {
    id: "stream",
    name: "Stream",
    img_src: StreamIcon,
  },
  {
    id: "sports",
    name: "Sports",
    img_src: SportsIcon,
  },
  {
    id: "music-shows",
    name: "Music shows",
    img_src: MusicShowsIcon,
  },
  {
    id: "plays",
    name: "Plays",
    img_src: PlaysIcon,
  },
  {
    id: "comedy",
    name: "Comedy shows",
    img_src: ComedyShowsIcon,
  },
  {
    id: "amusement-park",
    name: "Amusement park",
    img_src: AmusementParkIcon,
  },
  {
    id: "all",
    name: "See all",
    img_src: SeeAllIcon,
  },
];

export const ActivitiesMenu = () => {
  return (
    <FlatList
      horizontal
      keyExtractor={({ id }) => id}
      data={activitiesList}
      style={tw`h-20`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          style={tw`aspect-square flex-1 w-19 h-19`}
          source={item.img_src}
          onPress={item.pressHandler}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
    />
  );
};
