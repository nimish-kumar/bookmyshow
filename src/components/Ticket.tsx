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
  bookedAt: string;
}
const NonMemoizedTicket = ({
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
  bookedAt,
}: ITicketProps) => {
  return (
    <View
      style={tw`flex-row border border-black overflow-hidden bg-ticket-navy rounded-lg`}
    >
      <Text
        style={tw`text-white text-xs mx-2 my-2 absolute top-0 font-montserrat-thin`}
      >
        {dayjs(bookedAt).format("hh:mm A   DD MMM, YY")}
      </Text>
      <Image
        source={PopcornImage}
        style={tw`h-40 w-30 mt-8 -mb-12 -ml-14 -z-10`}
      />
      <View style={tw`ml-4 flex-row`}>
        <View style={tw`w-3/5 py-4 mt-3`}>
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
            tw`w-2/5 flex-row justify-center items-center -ml-8`,
            { borderTopStartRadius: 1, borderTopEndRadius: 1 },
          ]}
        >
          <View style={tw`border-l border-dashed border-white h-full`} />
          <View
            style={[
              { transform: [{ rotate: "-90deg" }] },
              tw`justify-center -ml-3`,
            ]}
          >
            <Text
              style={tw`bg-red-600 px-2 text-ticket-yellow font-montserrat-bold`}
            >
              {`₹ ${cost}`}
            </Text>
          </View>
          <View style={tw`items-center justify-center -ml-2`}>
            {[
              `${movieLang}`,
              `${movieFormat}`,
              `screen ${screenId}`,
              `${seatRow} ${seatNumber}`,
              `${dayjs(screeningDatetime).format("DD MMM, YY")}`,
              `${dayjs(screeningDatetime).format("hh:mm A")}`,
            ].map((text, idx) => (
              <Text style={tw`text-white text-xs font-montserrat`} key={idx}>
                {text.toUpperCase()}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export const Ticket = React.memo(NonMemoizedTicket);
