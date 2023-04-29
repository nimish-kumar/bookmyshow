import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { tw } from "@tailwind";
import React, { useCallback, useLayoutEffect } from "react";
import { BackHandler, Text, View } from "react-native";

export const Profile = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Deactivate back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );
  return (
    <View style={tw`h-full flex`}>
      <View style={tw`pt-40 absolute z-10 self-center`}>
        <View
          style={tw`w-40 h-40 rounded-full bg-pink justify-center items-center`}
        >
          <Icon
            type="ionicon"
            name="person-sharp"
            color="white"
            size={100}
            style={tw`self-center`}
          />
        </View>
        <View style={tw`items-center mt-1`}>
          <Text style={tw`text-base font-roboto-medium`}>John Doe</Text>
          <Text style={tw`font-roboto-regular`}>johndoe97@hotmail.com</Text>
        </View>
        <Button
          title="Logout"
          containerStyle={tw`mt-20`}
          icon={
            <Icon
              type="material"
              name="logout"
              color="white"
              style={tw`mr-2`}
            />
          }
          iconPosition="left"
        />
      </View>
      <View style={tw`h-1/3 bg-light-navy opacity-70`} />
    </View>
  );
};
