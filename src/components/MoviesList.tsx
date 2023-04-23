import { useQuery } from "@apollo/client";
import { LIST_MOVIES_AND_FORMATS } from "@graphql";
import { IActivity, IMoviesListProps } from "@types";
import React from "react";
import { ActivityIndicator } from "react-native";

import { ActivityList } from "./ActivityList";
export const MoviesList = ({ navigation }: IMoviesListProps) => {
  const {
    data: moviesList,
    error: moviesError,
    loading: moviesLoading,
  } = useQuery(LIST_MOVIES_AND_FORMATS, {
    variables: { city: "1" },
  });
  if (moviesLoading) {
    return <ActivityIndicator />;
  }
  if (moviesError) {
    throw Error(moviesError.message);
  }
  const movies: IActivity[] =
    moviesList?.listMovieLangByCity.map(({ movie }) => {
      return {
        id: parseInt(movie?.id || "-1", 10),
        title: movie?.name || "Movie title here",
      };
    }) || [];
  const clickHandler = (id: number) =>
    navigation.navigate("FormatSelector", {
      movieId: id,
    });

  return <ActivityList activities={movies} activityHandler={clickHandler} />;
};
