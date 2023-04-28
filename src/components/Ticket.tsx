import { Divider, Text } from "@rneui/themed";
import { tw } from "@tailwind";
import dayjs from "dayjs";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
interface ITicketProps {
  bookingId: string;
  movieName: string;
  movieLang: string;
  posterUrl: ImageSourcePropType;
  movieFormat: string;
  screeningDatetime: string;
  theatreArea: string;
  theatreName: string;
  screenId: string;
  seatNumber: number;
  seatRow: string;
}
export const Ticket = ({
  bookingId,
  movieName,
  movieLang,
  posterUrl,
  movieFormat,
  screeningDatetime,
  theatreArea,
  theatreName,
  screenId,
  seatNumber,
  seatRow,
}: ITicketProps) => {
  return (
    <View
      style={tw`py-2 flex-row justify-between px-4 rounded-xl bg-green-100`}
    >
      <View style={tw`items-center w-1/3`}>
        {posterUrl ? (
          <Image
            source={posterUrl}
            style={tw`h-50 w-30 rounded-lg`}
            resizeMode="contain"
          />
        ) : (
          <View style={tw`h-54 w-30 rounded-lg bg-gray-300`} />
        )}
      </View>
      <View style={tw`w-2/3 justify-center ml-6`}>
        <Text
          style={tw`font-roboto-bold text-xl text-green-600`}
        >{`#${bookingId}`}</Text>
        <Text
          style={tw`text-lg font-roboto-bold w-4/5 pb-1`}
          lineBreakMode="tail"
          numberOfLines={2}
        >
          {movieName}
        </Text>
        <Text style={tw`text-gray-500 text-sm font-roboto-bold pb-1`}>
          {`${movieLang}, ${movieFormat}`}
        </Text>
        <Text style={tw`font-roboto-bold text-sm pb-1`}>
          {dayjs(screeningDatetime).format("ddd, DD MMM   hh:mm A")}
        </Text>
        <Text style={tw`text-gray-500 text-xs`}>
          {`${theatreName}, ${theatreArea}`}
        </Text>
        <Divider width={0.7} style={tw`my-2 w-3/5`} />
        <Text style={tw`text-sm w-4/5 pb-1 font-roboto-bold`}>
          {`${screenId}`.toUpperCase()}
        </Text>
        <Text
          style={tw`text-sm w-4/5 pb-1 font-roboto-bold`}
          lineBreakMode="tail"
          numberOfLines={2}
        >
          {`${seatNumber}${seatRow}`}
        </Text>
      </View>
    </View>
  );
};
