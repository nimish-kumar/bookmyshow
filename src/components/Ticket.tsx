import { PopcornImage } from "@assets";
import { Image } from "@rneui/themed";
import { tw } from "@tailwind";
import dayjs from "dayjs";
import React from "react";
import { Text, View } from "react-native";
interface ITicketProps {
  movieName: string;
  movieLang: string;
  movieFormat: string;
  screeningDatetime: string;
  theatreArea: string;
  theatreName: string;
  screenId: string;
  seatNumber: number;
  seatRow: string;
  cost: number;
}
export const Ticket = ({
  cost,
  movieName,
  movieLang,
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
      style={tw`flex-row border border-black overflow-hidden bg-ticket-navy rounded-lg`}
    >
      <Image
        source={PopcornImage}
        style={tw`h-40 w-30 mt-8 -mb-12 -ml-14 -z-10`}
      />
      <View style={tw`ml-4 flex-row`}>
        <View style={tw`w-3/5 mt-4`}>
          <Text
            style={tw`text-white text-sm font-montserrat`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${movieName}`.toUpperCase()}
          </Text>
          <Text
            style={tw`text-ticket-yellow text-3xl font-montserrat-bold  w-2/3`}
          >
            {`Movie Ticket`.toUpperCase()}
          </Text>
          <View style={tw`w-9/10`}>
            <Text
              style={tw`text-white text-xs font-montserrat-thin mt-1`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{`${theatreName}`}</Text>
            <Text
              style={tw`text-white text-xs font-montserrat-thin`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {theatreArea}
            </Text>
          </View>
        </View>
        <View
          style={[
            tw`w-2/5 flex-row -ml-5 border-l-2 border-white`,
            { borderTopStartRadius: 1, borderTopEndRadius: 1 },
          ]}
        >
          <View
            style={[
              { transform: [{ rotate: "-90deg" }] },
              tw`-ml-6 justify-center`,
            ]}
          >
            <Text
              style={tw`bg-red-600 px-2 text-ticket-yellow font-montserrat-bold`}
            >
              {`₹ ${cost}`}
            </Text>
          </View>
          <View style={tw`items-center justify-center`}>
            {[
              `${movieLang}`,
              `${movieFormat}`,
              `screen ${screenId}`,
              `${seatRow} ${seatNumber}`,
              `${dayjs(screeningDatetime).format("DD MMM, YY")}`,
              `${dayjs(screeningDatetime).format("hh:mm A")}`,
            ].map((text, idx) => (
              <Text style={tw`text-white text-xs font-montserrat`}>
                {text.toUpperCase()}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
