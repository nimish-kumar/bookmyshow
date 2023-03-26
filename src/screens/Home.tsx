import {
  ActivitiesTypesList,
  Carousel,
  MoviesList,
  Titlebar,
} from "@components";
import { PortalTo } from "@context";
import { tw } from "@lib";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  return (
    <SafeAreaView>
      <View style={tw`flex justify-center`}>
        <PortalTo activeGateName="format-selector" />
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
          <MoviesList />
        </View>
      </View>
    </SafeAreaView>
  );
};
