import { useQuery } from "@apollo/client";
import { LIST_MOVIES_AND_FORMATS } from "@graphql";
import { IActivity, ILanguagesAndFormat, IMoviesListProps } from "@types";
import { DEFAULT_MOVIE_LANG, PUNE_CITY_ID } from "@utils";
import React from "react";
import { ActivityIndicator } from "react-native";

import { ActivityList } from "./ActivityList";
export const MoviesList = ({ navigation }: IMoviesListProps) => {
  const {
    data: moviesList,
    error: moviesError,
    loading: moviesLoading,
  } = useQuery(LIST_MOVIES_AND_FORMATS, {
    variables: { city: PUNE_CITY_ID },
  });
  if (moviesLoading) {
    return <ActivityIndicator />;
  }
  if (moviesError) {
    throw Error(moviesError.message);
  }
  let formats: ILanguagesAndFormat[] | null = null;
  const movies: IActivity[] =
    moviesList?.listMovieLangByCity.map(({ movie, langs }) => {
      formats =
        langs?.map((d) => {
          return {
            code: d?.lang?.langCode || DEFAULT_MOVIE_LANG.code,
            lang: d?.lang?.name || DEFAULT_MOVIE_LANG.lang,
            format: d?.formats?.map((format) => format?.format || "-1") || [],
          };
        }) || [];
      return {
        id: parseInt(movie?.id || "-1", 10),
        title: movie?.name || "Movie title here",
      };
    }) || [];
  const clickHandler = (id: number) => {
    if (formats)
      navigation.navigate("FormatSelector", {
        movieId: id,
        formats,
      });
  };

  return <ActivityList activities={movies} activityHandler={clickHandler} />;
};
