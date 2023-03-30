import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SlotSelector } from "@screens";
import React from "react";

const AppStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName="Home">
      <AppStack.Screen
        name="Home"
        component={SlotSelector}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};
