import { AuthContext } from "@context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  FormatSelector,
  Home,
  SeatSelector,
  SlotSelector,
  Startup,
} from "@screens";
import { RootStackParamList } from "@types";
import React, { useContext } from "react";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
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

const AuthNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Startup">
      <RootStack.Group>
        <RootStack.Screen name="Startup" component={Startup} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export const RootNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // console.log("Is logged in? ---> ", isLoggedIn);
  return !isLoggedIn ? <AuthNavigator /> : <AppNavigator />;
};
