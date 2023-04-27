import { AvatarTile } from "@assets";
import { Divider, Text } from "@rneui/themed";
import { tw } from "@tailwind";
import React from "react";
import { Image, View } from "react-native";

export const Ticket = () => {
  return (
    <View style={tw`py-2 flex-row justify-between`}>
      <View style={tw`items-center w-1/3`}>
        <Image source={AvatarTile} style={tw`h-50 w-30 rounded-lg`} />
      </View>
      <View style={tw`w-2/3 justify-center ml-6`}>
        <Text style={tw`font-roboto-bold text-xl text-green-600`}>Booked</Text>
        <Text
          style={tw`text-lg font-roboto-bold w-4/5 pb-1`}
          lineBreakMode="tail"
          numberOfLines={2}
        >
          Doctor Strange: In the Multiverse of Madness
        </Text>
        <Text style={tw`text-gray-500 text-sm font-roboto-bold pb-1`}>
          English, 3D
        </Text>
        <Text style={tw`font-roboto-bold text-sm pb-1`}>
          Fri, 06 May 03:30 PM
        </Text>
        <Text style={tw`text-gray-500 text-xs`}>
          PVR Pheonix Market City, Viman Nagar
        </Text>
        <Divider width={1} style={tw`my-2 w-3/5`} />
        <Text style={tw`text-sm w-4/5 pb-1 font-roboto-bold`}>AUDI 03</Text>
        <Text
          style={tw`text-sm w-4/5 pb-1 font-roboto-bold`}
          lineBreakMode="tail"
          numberOfLines={2}
        >
          16C
        </Text>
      </View>
    </View>
  );
};
