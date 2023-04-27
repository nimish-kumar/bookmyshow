import {
  ActivitiesTypesList,
  Carousel,
  MoviesList,
  Titlebar,
} from "@components";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { tw } from "@tailwind";
import { RootStackParamList } from "@types";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
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
  return (
    <SafeAreaView>
      <View style={tw`flex justify-center`}>
        <Titlebar currentCity="Pune" />
        <ActivitiesTypesList />
        <Carousel />
        <View style={tw`mt-4 ml-4 mr-2`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-roboto-medium font-normal text-lg`}>
              Recommended Movies
            </Text>
            <Text style={tw`font-roboto-regular text-pink text-sm`}>
              {"See All >"}
            </Text>
          </View>
          <MoviesList navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};
