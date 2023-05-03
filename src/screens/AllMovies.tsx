import { useLazyQuery } from "@apollo/client";
import { ActivityTile, AppBar } from "@components";
import { LIST_MOVIES_AND_FORMATS } from "@graphql";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { tw } from "@tailwind";
import { ILanguagesAndFormat, RootStackParamList } from "@types";
import { DEFAULT_MOVIE_LANG, PUNE_CITY_ID } from "@utils";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { FlatList, ImageSourcePropType, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MovieDetailsType } from "src/__generated__/graphql";
import { TabNavigatorParamsList } from "src/navigation/TabNavigator";
export type AllMoviesNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, "AllMovies">,
  BottomTabNavigationProp<TabNavigatorParamsList, "Home">
>;

export const AllMovies = () => {
  const navigation = useNavigation<AllMoviesNavigationProps>();
  const [page, setPage] = useState(1);
  const [
    fetchMovies,
    { data: moviesData, error: moviesError, loading: moviesLoading },
  ] = useLazyQuery(LIST_MOVIES_AND_FORMATS);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const [moviesList, setMoviesList] = useState<(MovieDetailsType | null)[]>([]);

  useEffect(() => {
    if (!moviesLoading) {
      setMoviesList((b) => {
        if (b)
          return [...b, ...(moviesData?.listMovieLangByCity.results || [])];
        return [...(moviesData?.listMovieLangByCity.results || [])];
      });
    }
  }, [moviesLoading]);
  useEffect(() => {
    fetchMovies({
      variables: { city: PUNE_CITY_ID, page, limit: 10 },
      fetchPolicy: "no-cache",
    });
  }, [page]);

  const goBack = useCallback(() => navigation.navigate("Home"), []);
  const movies =
    moviesList?.map((e) => {
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
  if (moviesError) {
    throw Error(moviesError.message);
  }
  if (movies.length === 0) {
    return (
      <Text style={tw`text-center mt-6 font-roboto-italic text-gray-500`}>
        No movies available
      </Text>
    );
  }
  return (
    <SafeAreaView>
      <AppBar title="Tickets" backButton backFunction={goBack} />
      <View style={tw`px-4 py-4 min-h-full items-center`}>
        <FlatList
          data={movies}
          renderItem={({ item, index }) => (
            <ActivityTile
              activityDetail={item}
              clickHandler={() =>
                clickHandler(item.id, item.title, item.formats)
              }
              imageStyle={tw`h-67.5 w-40`}
              style={tw`h-67.5 w-42 mb-12 mr-4`}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshing={moviesLoading}
          onEndReached={() => {
            if (moviesData?.listMovieLangByCity.count !== 0)
              setPage((p) => p + 1);
          }}
          onEndReachedThreshold={1}
          scrollsToTop={false}
        />
      </View>
    </SafeAreaView>
  );
};
