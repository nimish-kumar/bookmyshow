import { Text } from "@rneui/themed";
import { tw } from "@tailwind";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export const SignIn = () => {
  return (
    <View style={tw`flex-col`}>
      <TouchableOpacity style={tw`w-4 h-2`}>
        <View style={tw`flex`}>
          <Text style={tw``}> SignIn</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
