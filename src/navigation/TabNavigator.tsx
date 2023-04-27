import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Home, Tickets } from "@screens";
import React, { useLayoutEffect } from "react";
export type TabNavigatorParamsList = {
  Home: undefined;
  Tickets: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

export const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tickets" component={Tickets} />
    </Tab.Navigator>
  );
};
