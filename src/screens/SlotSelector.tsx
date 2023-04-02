import {
  AppBar,
  Badge,
  CalendarDateTile,
  FormatSelector,
  ICalendarTile,
  ISlotTile,
  SlotTile,
} from "@components";
import { PortalFrom, PortalTo } from "@context";
import { tw } from "@lib";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const data: ISlotTile[] = [
  {
    areaName: "Viman Nagar",
    theatreName: "Pheonix Marktcity",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Talwandi",
    theatreName: "PVR Talkies",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Pune",
    theatreName: "INOX Bund Garden Road",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "NIBM Exit",
    theatreName: "INOX Royal Heritage mall",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: false },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Viman Nagar",
    theatreName: "Pheonix Marktcity",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Viman Nagar",
    theatreName: "Pheonix Marktcity",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Talwandi",
    theatreName: "PVR Talkies",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Pune",
    theatreName: "INOX Bund Garden Road",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "NIBM Exit",
    theatreName: "INOX Royal Heritage mall",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: false },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Viman Nagar",
    theatreName: "Pheonix Marktcity",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Talwandi",
    theatreName: "PVR Talkies",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Pune",
    theatreName: "INOX Bund Garden Road",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "NIBM Exit",
    theatreName: "INOX Royal Heritage mall",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: false },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Viman Nagar",
    theatreName: "Pheonix Marktcity",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Talwandi",
    theatreName: "PVR Talkies",
    cancellationAvailable: true,
    slots: [
      { time: "08:30 AM", available: true },
      { time: "10:40 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "Pune",
    theatreName: "INOX Bund Garden Road",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: true },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
  {
    areaName: "NIBM Exit",
    theatreName: "INOX Royal Heritage mall",
    cancellationAvailable: true,
    slots: [
      { time: "10:40 AM", available: false },
      { time: "11:30 AM", available: true },
      { time: "12:40 PM", available: true },
      { time: "01:30 PM", available: true },
      { time: "03:40 PM", available: true },
    ],
  },
];

const dateData: ICalendarTile[] = [
  {
    day: "SUN",
    date: 28,
    month: "DEC",
    mode: "selected",
  },
  ...Array(4).fill({
    day: "SUN",
    date: 28,
    month: "DEC",
    mode: "default",
  }),
  {
    day: "SUN",
    date: 28,
    month: "DEC",
    mode: "disabled",
  },
  {
    day: "SUN",
    date: 28,
    month: "DEC",
    mode: "disabled",
  },
];

const priceRange = [
  {
    low: 0,
    high: 100,
  },
  {
    low: 200,
    high: 300,
  },
];
const langAndFormatArray = [
  {
    code: "HI",
    lang: "Hindi",
    format: ["2D"],
  },
  {
    code: "EN",
    lang: "English",
    format: ["2D", "3D", "4DX"],
  },
];

export const SlotSelector = () => {
  const [popupVisibility, setPopupVisibility] = useState(true);
  const [langFormat, setLangFormat] = useState({ code: "EN", format: "2D" });
  return (
    <SafeAreaView>
      <View style={tw`flex justify-center bg-neutral-200 min-h-full`}>
        <PortalTo activeGateName="format-selector" />
        <AppBar title="Movie name" backButton />
        <ScrollView horizontal style={tw`border-b bg-white border-gray-300`}>
          {dateData.map((e, idx) => (
            <CalendarDateTile
              key={idx}
              date={e.date}
              day={e.day}
              month={e.month}
              mode={e.mode}
            />
          ))}
        </ScrollView>
        <View style={tw`pl-4 py-2 bg-white border-b border-gray-300 flex-row`}>
          <View style={tw`flex-row w-4/5 items-center`}>
            <Text style={tw`font-roboto-medium mr-2 text-xs`}>
              {langAndFormatArray.find((e) => e.code === langFormat.code)?.lang}
            </Text>
            <Text style={[tw`self-center`, { fontSize: 5 }]}>{"\u2B24"}</Text>
            <Text style={tw`font-roboto-medium ml-2 text-xs`}>
              {langFormat.format}
            </Text>
          </View>
          <PortalFrom>
            {(portal) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPopupVisibility(true);
                    portal(
                      "format-selector",
                      <FormatSelector
                        isVisible={popupVisibility}
                        closeBackdrop={() => portal("format-selector", <></>)}
                        langFormatHandler={(code, format) => {
                          setLangFormat({ code, format });
                          portal("format-selector", <></>);
                        }}
                      />
                    );
                  }}
                >
                  <Text style={tw`text-pink font-roboto-regular`}>
                    {"Change >"}
                  </Text>
                </TouchableOpacity>
              );
            }}
          </PortalFrom>
        </View>
        <FlatList
          horizontal
          style={tw`bg-white pl-2 border-b border-gray-200`}
          data={priceRange}
          renderItem={({ item: e }) => (
            <View style={tw`mr-2 mt-2 mb-5`}>
              <Badge badgeText={`${`₹${e.low} - ₹${e.high}`}`} />
            </View>
          )}
        />

        <FlatList
          contentContainerStyle={tw`pt-4 pb-65 px-4`}
          data={data}
          renderItem={({ index, item }) => {
            return (
              <View key={index}>
                <SlotTile
                  areaName={item.areaName}
                  slots={item.slots}
                  theatreName={item.theatreName}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
