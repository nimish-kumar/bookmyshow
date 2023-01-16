import {
  ActivitiesTypesList,
  ActivityList,
  Carousel,
  Titlebar,
} from "@components";
import { tw } from "@lib";
import React from "react";
import { View, Text } from "react-native";

export const Home = () => {
  return (
    <>
      <Titlebar currentCity="Pune" />
      <ActivitiesTypesList />
      <Carousel />
      <View style={tw`mt-4 mx-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-roboto-medium font-normal text-lg`}>
            Recommended Movies
          </Text>
          <Text style={tw`font-roboto-regular text-pink text-sm`}>
            {"See All >"}
          </Text>
        </View>

        <ActivityList />
      </View>
    </>
  );
};
