import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FormatSelector, Home, SeatSelector, SlotSelector } from "@screens";
import React from "react";

export type RootStackParamList = {
  Home: undefined;
  SeatSelector: {
    movieId: number;
    lang: string;
    format: string;
    slotId: number;
  };
  SlotSelector: { movieId: number; lang: string; format: string };
  FormatSelector: { movieId: number };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Group>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SeatSelector"
          component={SeatSelector}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SlotSelector"
          component={SlotSelector}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "transparentModal" }}>
        <RootStack.Screen name="FormatSelector" component={FormatSelector} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
