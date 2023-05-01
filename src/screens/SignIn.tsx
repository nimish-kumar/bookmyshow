import { BookMyShowDarkSvg, GoogleSvg } from "@assets";
import { Button } from "@rneui/themed";
import { tw } from "@tailwind";
import React from "react";
import { Text, View } from "react-native";

interface ISignInProps {
  handleLogin: () => void;
}
export const SignIn = ({ handleLogin }: ISignInProps) => {
  return (
    <View style={tw`flex-1 bg-white pt-40 items-center px-8`}>
      <BookMyShowDarkSvg height={180} width={180} />
      <Button
        onPress={handleLogin}
        buttonStyle={tw`h-12 w-full bg-white border border-black flex-row px-10 mt-10`}
      >
        <View style={tw`flex-row justify-center`}>
          <GoogleSvg height={20} width={20} />
          <Text style={tw`px-8`}>Continue with Google</Text>
        </View>
      </Button>
    </View>
  );
};
