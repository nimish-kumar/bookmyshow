import { Text } from "@rneui/themed";
import { tw } from "@tailwind";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export const SignIn = () => {
  return (
    <View>
      <TouchableOpacity>
        <View>
          <Text style={tw``}> SignIn</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
