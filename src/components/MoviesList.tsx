import {
  AvatarTile,
  KutteyTile,
  LakadbaggaTile,
  ValviTile,
  VedTile,
} from "@assets";
import { HomeNavigationProps } from "@screens";
import { IActivity } from "@types";
import React from "react";

import { ActivityList } from "./ActivityList";

const movies: IActivity[] = [
  {
    id: 1,
    imgSrc: AvatarTile,
    title: "Avatar: The Way of Water",
  },
  {
    id: 2,
    imgSrc: KutteyTile,
    title: "Kuttey",
  },
  {
    id: 3,
    imgSrc: LakadbaggaTile,
    title: "Lakadbaggha",
  },

  {
    id: 4,
    imgSrc: ValviTile,
    title: "Vaalvi",
  },
  {
    id: 5,
    imgSrc: VedTile,
    title: "Ved",
  },
];


export const MoviesList = ({ navigation }: IMoviesListProps) => {
  const clickHandler = (id: number) =>
    navigation.navigate("FormatSelector", {
      movieId: id,
    });
  return <ActivityList activities={movies} activityHandler={clickHandler} />;
};
