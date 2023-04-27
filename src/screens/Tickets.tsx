import { AppBar, Ticket } from "@components";
import { useNavigation } from "@react-navigation/native";
import { tw } from "@tailwind";
import React, { useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Tickets = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <AppBar title="Tickets" />
      <ScrollView style={tw`px-3`}>
        <Ticket />
      </ScrollView>
    </SafeAreaView>
  );
};
