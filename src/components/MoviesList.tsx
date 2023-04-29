import { useQuery } from "@apollo/client";
import { LIST_MOVIES_AND_FORMATS } from "@graphql";
import { tw } from "@tailwind";
import { ILanguagesAndFormat, IMoviesListProps } from "@types";
import { DEFAULT_MOVIE_LANG, PUNE_CITY_ID } from "@utils";
import React from "react";
import { ActivityIndicator, FlatList, ImageSourcePropType } from "react-native";

import { ActivityTile } from "./ActivityTile";

export const MoviesList = ({ navigation }: IMoviesListProps) => {
  const {
    data: moviesList,
    error: moviesError,
    loading: moviesLoading,
  } = useQuery(LIST_MOVIES_AND_FORMATS, {
    variables: { city: PUNE_CITY_ID, page: 1, limit: 5 },
  });
  if (moviesLoading) {
    return <ActivityIndicator />;
  }
  if (moviesError) {
    throw Error(moviesError.message);
  }

  const movies =
    moviesList?.listMovieLangByCity.results?.map((e) => {
      const movie = e?.movie;
      const langs = e?.langs;
      const formats: ILanguagesAndFormat[] =
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
        imgSrc: movie?.posterUrl as ImageSourcePropType,
        formats,
      };
    }) || [];
  const clickHandler = (
    id: number,
    name: string,
    formats: ILanguagesAndFormat[]
  ) => {
    navigation.navigate("FormatSelector", {
      movieId: id,
      movieName: name,
      formats,
    });
  };
  return (
    <FlatList
      horizontal
      data={movies}
      showsHorizontalScrollIndicator={false}
      style={tw`h-auto mt-4`}
      renderItem={({ item }) => (
        <ActivityTile
          key={item.id}
          activityDetail={item}
          clickHandler={() => clickHandler(item.id, item.title, item.formats)}
        />
      )}
    />
  );
};
