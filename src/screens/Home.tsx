import { useLazyQuery } from "@apollo/client";
import {
  ActivitiesTypesList,
  ActivityTile,
  Carousel,
  Loader,
  Titlebar,
} from "@components";
import { LIST_MOVIES_AND_FORMATS } from "@graphql";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { tw } from "@tailwind";
import { ILanguagesAndFormat, RootStackParamList } from "@types";
import { DEFAULT_MOVIE_LANG, PUNE_CITY_ID } from "@utils";
import { default as React, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabNavigatorParamsList } from "src/navigation/TabNavigator";

export type HomeNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamsList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;
export const Home = () => {
  const navigation = useNavigation<HomeNavigationProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const [
    fetchMoviesList,
    { data: moviesList, error: moviesError, loading: moviesLoading },
  ] = useLazyQuery(LIST_MOVIES_AND_FORMATS);

  useEffect(() => {
    fetchMoviesList({
      variables: { city: PUNE_CITY_ID, page: 1, limit: 5 },
      fetchPolicy: "no-cache",
    });
  }, []);
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
        imgSrc: movie?.posterUrl ?? null,
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
  const MoviesList = () => {
    if (movies.length === 0) {
      return (
        <Text style={tw`text-center mt-6 font-roboto-italic text-gray-500`}>
          No movies available
        </Text>
      );
    }
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
  if (moviesLoading) {
    return <Loader size="sm" style={tw`mt-8`} />;
  }
  if (moviesError) {
    throw Error(moviesError.message);
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={moviesLoading}
            onRefresh={() =>
              fetchMoviesList({
                variables: { city: PUNE_CITY_ID, page: 1, limit: 5 },
                fetchPolicy: "no-cache",
              })
            }
          />
        }
      >
        <Titlebar currentCity="Pune" />
        <ActivitiesTypesList />
        <Carousel />
        <View style={tw`mt-4 ml-4 mr-2`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-roboto-medium font-normal text-lg`}>
              Recommended Movies
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("AllMovies")}>
              <Text style={tw`font-roboto-regular text-pink text-sm`}>
                {"See All >"}
              </Text>
            </TouchableOpacity>
          </View>
          <MoviesList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
