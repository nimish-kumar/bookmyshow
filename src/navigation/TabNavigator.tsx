// TODO: Tab looks dull make it better

import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Home, Profile, Tickets } from "@screens";
import { tw } from "@tailwind";
import React, { useLayoutEffect } from "react";
import { TouchableOpacity, View } from "react-native";
export type TabNavigatorParamsList = {
  Home: undefined;
  Tickets: undefined;
  Profile: undefined;
};

export interface ITab {
  name: keyof TabNavigatorParamsList;
  component: () => JSX.Element;
  iconType: string;
  iconName: string;
}

const tabs: ITab[] = [
  {
    name: "Home",
    component: Home,
    iconType: "material",
    iconName: "home-filled",
  },
  {
    name: "Tickets",
    component: Tickets,
    iconType: "fontisto",
    iconName: "ticket",
  },
  {
    name: "Profile",
    component: Profile,
    iconType: "ionicon",
    iconName: "person-sharp",
  },
];
export interface ITabProps extends BottomTabBarButtonProps {
  iconName: string;
  iconType: string;
}
const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

const TabBarBtn = ({
  accessibilityState,
  iconName,
  iconType,
  onPress,
}: ITabProps) => (
  <View style={tw`flex-1 justify-center items-center overflow-hidden`}>
    <View
      style={[
        tw`h-1/5 w-10 flex-1 rounded-xl -top-0.5`,
        tw`${accessibilityState?.selected ? "bg-white" : "bg-pink"}`,
      ]}
    />
    <TouchableOpacity style={tw`mt-1 h-4/5`} onPress={onPress}>
      <Icon
        type={iconType}
        name={iconName}
        iconStyle={tw`${
          accessibilityState?.selected ? "text-white" : "text-white opacity-60"
        }`}
      />
    </TouchableOpacity>
  </View>
);

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
        tabBarStyle: tw`absolute bottom-4 left-4 right-4 rounded-xl h-12 flex-1 bg-pink`,

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
      {/* <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tickets" component={Tickets} />
      <Tab.Screen name="Profile" component={Profile} /> */}
      {tabs.map((tab) => {
        return (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={({ navigation, route }) => ({
              tabBarButton: (props) => (
                <TabBarBtn
                  {...props}
                  iconName={tab.iconName}
                  iconType={tab.iconType}
                />
              ),
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
};
