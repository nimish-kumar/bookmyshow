// TODO: Tab looks dull make it better

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Home, Profile, Tickets } from "@screens";
import { tw } from "@tailwind";
import React, { useLayoutEffect } from "react";
export type TabNavigatorParamsList = {
  Home: undefined;
  Tickets: undefined;
  Profile: undefined;
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
          if (route.name === "Profile") {
            if (focused)
              return <Icon type="ionicon" name="person-sharp" color="white" />;
            return <Icon type="ionicon" name="person-sharp" color="#6B7280" />;
          }
        },
        tabBarLabel: () => null,
        tabBarActiveBackgroundColor: "#DC3558",
        tabBarStyle: tw`h-10`,

        // Most important property, it unmounts screens
        // on bottom tab which are not active
        // by default it is false. The problem occurs when it
        // is false.
        // Consider screen A and B are in BottomTabNavigator and
        // screen C is in NativeStackNavigator.
        // Now you visited, A-> B->A---->C screen now if you try
        // to go back to screen B from C, the screen will not mount again
        // as it was already mounted when A->B happened but it never got
        // unmounted when B->A happened. Thus, actions that are suppose to
        // happen while mounting will not happen when you go from C to B.
        unmountOnBlur: true,
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tickets" component={Tickets} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
