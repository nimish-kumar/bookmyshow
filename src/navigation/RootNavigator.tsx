import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SeatSelector } from "@screens";
import React from "react";

const AppStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen
        name="Home"
        component={SeatSelector}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};
