import { BalliBanner, GpayBanner, MartinBanner, PrimaryBanner } from "@assets";
import { Image } from "@rneui/themed";
import { tw } from "@tailwind";
import React from "react";
import { FlatList, useWindowDimensions } from "react-native";

const banners = [
  {
    id: 1,
    img_src: PrimaryBanner,
  },
  {
    id: 2,
    img_src: GpayBanner,
  },
  {
    id: 3,
    img_src: MartinBanner,
  },
  {
    id: 4,
    img_src: BalliBanner,
  },
];

export const Carousel = () => {
  let { width: windowWidth } = useWindowDimensions();
  windowWidth = windowWidth - 4;
  return (
    <FlatList
      horizontal
      style={tw`h-50`}
      data={banners}
      keyExtractor={({ id }) => `${id}`}
      renderItem={({ item }) => (
        <Image
          source={item.img_src}
          style={[tw`h-full`, { width: windowWidth }]}
        />
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};
