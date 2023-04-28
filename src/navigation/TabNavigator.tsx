import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Home, Tickets } from "@screens";
import { tw } from "@tailwind";
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
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          if (route.name === "Home") {
            if (focused)
              return <Icon type="entypo" name="home" color="white" />;
            return <Icon type="entypo" name="home" color="#6B7280" />;
          }
          if (route.name === "Tickets") {
            if (focused)
              return <Icon type="fontisto" name="ticket" color="white" />;
            return <Icon type="fontisto" name="ticket" color="#6B7280" />;
          }
        },
        tabBarLabel: () => null,
        tabBarActiveBackgroundColor: "#DC3558",
        tabBarStyle: tw`h-10`,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tickets" component={Tickets} />
    </Tab.Navigator>
  );
};