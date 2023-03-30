import { AppBar, ISlotTile, SlotTile } from "@components";
import { tw } from "@lib";
import React from "react";
import { View } from "react-native";
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

export const SlotSelector = () => {
  return (
    <SafeAreaView>
      <AppBar title="Movie name" backButton />
      <View style={tw`flex justify-center bg-neutral-200 min-h-full mt-12`}>
        <FlatList
          data={data}
          renderItem={({ index, item }) => {
            return (
              <SlotTile
                key={index}
                areaName={item.areaName}
                slots={item.slots}
                theatreName={item.theatreName}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
