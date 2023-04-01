import {
  AppBar,
  Badge,
  CalendarDateTile,
  ICalendarTile,
  ISlotTile,
  SlotTile,
} from "@components";
import { tw } from "@lib";
import React from "react";
import { ScrollView, View } from "react-native";
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
  ...Array(6).fill({
    day: "SUN",
    date: 28,
    month: "DEC",
    mode: "default",
  }),
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

export const SlotSelector = () => {
  return (
    <SafeAreaView>
      <View style={tw`flex justify-center bg-neutral-200 min-h-full`}>
        <AppBar title="Movie name" backButton />
        <ScrollView horizontal style={tw`border-b bg-white border-gray-300`}>
          {dateData.map((e) => (
            <CalendarDateTile
              date={e.date}
              day={e.day}
              month={e.month}
              mode={e.mode}
            />
          ))}
        </ScrollView>
        <FlatList
          horizontal
          style={tw`bg-white pl-2 shadow-xl shadow-black border-b border-gray-200`}
          data={priceRange}
          renderItem={({ item: e }) => (
            <View style={tw`mr-2 mt-2 mb-5`}>
              <Badge badgeText={`${`₹${e.low} - ₹${e.high}`}`} />
            </View>
          )}
        />

        <FlatList
          contentContainerStyle={tw`pt-2 pb-55`}
          data={data}
          renderItem={({ index, item }) => {
            return (
              <View key={index} style={tw`mt-2`}>
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
