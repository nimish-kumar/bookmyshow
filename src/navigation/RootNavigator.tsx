import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "@screens";
import React from "react";

const AppStack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
};
