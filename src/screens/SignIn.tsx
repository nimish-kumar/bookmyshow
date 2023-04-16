import { Button, Text } from "@rneui/themed";
import { tw } from "@tailwind";
import React from "react";
import { View } from "react-native";

interface ISignInProps {
  handleLogin: () => void;
}
export const SignIn = ({ handleLogin }: ISignInProps) => {
  return (
    <View style={tw`flex-1 bg-red-400`}>
      <Button style={tw`w-14 h-4`} onPress={handleLogin}>
        <Text style={tw`text-white`}> SignIn</Text>
      </Button>
    </View>
  );
};
