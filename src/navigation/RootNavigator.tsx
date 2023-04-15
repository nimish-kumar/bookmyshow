import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FormatSelector, Home, SeatSelector, SlotSelector } from "@screens";
import { RootStackParamList } from "@types";
import React from "react";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Group>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="SeatSelector" component={SeatSelector} />
        <RootStack.Screen name="SlotSelector" component={SlotSelector} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "transparentModal" }}>
        <RootStack.Screen name="FormatSelector" component={FormatSelector} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
