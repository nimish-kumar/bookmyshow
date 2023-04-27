import { AppBar } from "@components";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
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
      <View>
        <Text>Tickets</Text>
      </View>
    </SafeAreaView>
  );
};
