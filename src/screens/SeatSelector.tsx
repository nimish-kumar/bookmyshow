import { useLazyQuery, useMutation } from "@apollo/client";
import { AppBar, LayoutViewer } from "@components";
import { BOOK_TICKETS, GET_SLOT_DETAILS } from "@graphql";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Icon, Overlay } from "@rneui/themed";
import { tw } from "@tailwind";
import {
  IGrpDetails,
  ISubmitBtnProps,
  ITimingBtnProp,
  RootStackParamList,
} from "@types";
import {
  SeatStatusCode,
  calculateTotalCost,
  extractGroupsDetails,
} from "@utils";
import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabNavigatorParamsList } from "src/navigation/TabNavigator";

type TicketsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamsList, "Tickets">,
  NativeStackNavigationProp<RootStackParamList>
>;
const TimingBtn = ({ time, setTimeSlot, type = "default" }: ITimingBtnProp) => {
  if (type === "selected")
    return (
      <Button
        buttonStyle={tw`mr-2 h-10 w-28S rounded-md bg-dark-green justify-center`}
        onPress={setTimeSlot}
      >
        <Text style={tw`text-white font-bold text-sm`}>{time}</Text>
      </Button>
    );
  return (
    <Button
      buttonStyle={tw`mr-2 h-10 w-28S rounded-md bg-white justify-center border border-black`}
      onPress={setTimeSlot}
    >
      <Text style={tw`text-dark-green font-bold text-sm`}>{time}</Text>
    </Button>
  );
};
const SubmitBtnNode = ({
  totalCost,
  bookingTickets,
  bookingTicketsError,
  bookingTicketsData,
}: ISubmitBtnProps) => {
  const BtnPayText = () => (
    <Text
      style={tw`text-base ${totalCost === 0 ? "text-slate-400" : "text-white"}`}
    >
      Pay ₹ {totalCost}
    </Text>
  );
  const BtnLoader = () => <ActivityIndicator color="white" />;

  if (bookingTickets) return <BtnLoader />;
  if (bookingTicketsError) throw Error(bookingTicketsError.message);
  if (bookingTicketsData) {
    return <Icon name="check-circle-outline" type="material" color="white" />;
  }
  return <BtnPayText />;
};
export const SeatSelector = () => {
  const navigation = useNavigation<TicketsNavigationProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const route = useRoute<RouteProp<RootStackParamList, "SeatSelector">>();
  const {
    format,
    slotId,
    slotList,
    movieName,
    selectedSlotId,
    areaName,
    theatreName,
  } = route.params;
  const [selectedTimeSlotIdx, setTimeSlotIdx] = useState(
    slotList.findIndex((e) => e.slotId === selectedSlotId)
  );
  const [overlay, setOverlay] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [
    bookTickets,
    {
      loading: bookingTickets,
      data: bookingTicketsData,
      error: bookingTicketsError,
    },
  ] = useMutation(BOOK_TICKETS);

  const [fetchSlotDetails, { loading, error, data }] = useLazyQuery(
    GET_SLOT_DETAILS,
    {
      fetchPolicy: "no-cache",
    }
  );
  // Reset selected seats and total cost if time slot is changed
  useEffect(() => {
    fetchSlotDetails({
      variables: { id: `${slotList[selectedTimeSlotIdx].slotId}` },
    });
    setSelectedSeats([]);
    setTotalCost(0);
  }, [selectedTimeSlotIdx]);

  const payTicketsHandler = () => {
    // Prepending seat code with seats since selected seats doesn't have
    // status code with the seat
    const seats = selectedSeats.map((e) => `${SeatStatusCode.available}${e}`);
    bookTickets({ variables: { slotId, seats } });
  };
  const layout = data?.getSlotDetails.currentLayout || "|||";
  // Memoize group details as it will not change
  // unless the layout is changed
  const groupDetailsArray = useMemo(() => {
    const grps = layout.split("||")[0].split("|");
    const grpDetails: IGrpDetails[] = [];
    for (let i = 0; i < grps.length; i++) {
      const grp = extractGroupsDetails(grps[i]);
      if (grp) {
        grpDetails.push(grp);
      }
    }
    return grpDetails;
  }, [layout]);
  useEffect(() => {
    setTotalCost(calculateTotalCost(groupDetailsArray, selectedSeats));
  }, [selectedSeats]);

  useEffect(() => {
    if (!bookingTickets && bookingTicketsData) {
      setTimeout(() => {
        navigation.navigate("Tickets");
      }, 3000);
    }
    if (!bookingTickets && bookingTicketsError) {
      setOverlay(false);
    }
  }, [bookingTickets]);

  if (error) {
    throw Error(error.message);
  }
  return (
    <SafeAreaView>
      <View style={tw`min-h-full`}>
        <View style={tw`z-2 absolute top-0 left-0 right-0`}>
          <AppBar
            title={`${movieName}, ${format}`}
            subtitle={areaName ? `${theatreName} | ${areaName}` : theatreName}
            backButton
            backFunction={navigation.goBack}
          />
          <View style={tw`bg-gray-200 h-25 pl-4`}>
            <Text style={tw`text-sm my-3`}>
              {dayjs(slotList[selectedTimeSlotIdx].datetime).format(
                "ddd, DD MMM"
              )}
            </Text>
            <ScrollView horizontal>
              {slotList.map(({ datetime: timing }, slotIdx) => {
                return (
                  <TimingBtn
                    time={dayjs(timing).format("hh:mm A")}
                    key={slotIdx}
                    type={
                      selectedTimeSlotIdx === slotIdx ? "selected" : "default"
                    }
                    setTimeSlot={() => setTimeSlotIdx(slotIdx)}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        {!loading ? (
          <>
            <Overlay isVisible={overlay} style={tw`min-h-full min-w-full`}>
              <ActivityIndicator color="#DC3558" size="large" />
            </Overlay>
            <ScrollView style={tw`mb-23 mt-40`}>
              <LayoutViewer
                layout={layout}
                selectedSeatChangeHandler={(seat) => {
                  setSelectedSeats((prevSelectedSeats) => {
                    if (prevSelectedSeats.includes(seat)) {
                      const seatIndex = prevSelectedSeats.indexOf(seat);
                      return [
                        ...prevSelectedSeats.slice(0, seatIndex),
                        ...prevSelectedSeats.slice(seatIndex + 1),
                      ];
                    }
                    return [...prevSelectedSeats, seat];
                  });
                }}
              />
            </ScrollView>
          </>
        ) : (
          <ActivityIndicator style={tw`mt-44`} color="red" size="large" />
        )}
        <View
          style={tw`z-2 absolute bottom-0 left-0 right-0 bg-white items-center flex-col`}
        >
          <View
            style={tw`py-2 flex-row min-w-full justify-around items-center px-8`}
          >
            <View style={tw`flex-row items-center w-1/4`}>
              <View style={tw`bg-gray-200 h-6 w-6 mr-2 rounded-sm`} />
              <Text style={tw`text-xs`}>Sold</Text>
            </View>
            <View style={tw`flex-row items-center w-1/4`}>
              <View
                style={tw`border border-dark-green h-6 w-6 mr-2 rounded-sm`}
              />
              <Text style={tw`text-xs`}>Available</Text>
            </View>
            <View style={tw`flex-row items-center w-1/4`}>
              <View style={tw`bg-dark-green h-6 w-6 mr-2 rounded-sm`} />
              <Text style={tw`text-xs`}>Selected</Text>
            </View>
          </View>
          <View style={tw`min-w-full`}>
            <Button
              buttonStyle={[
                tw`rounded-md h-12 items-center justify-center`,
                tw`${overlay ? "bg-dark-green" : "bg-pink"}`,
              ]}
              disabled={totalCost === 0}
              onPress={() => {
                setOverlay(true);
                payTicketsHandler();
              }}
            >
              <SubmitBtnNode
                bookingTickets={bookingTickets}
                bookingTicketsData={bookingTicketsData}
                bookingTicketsError={bookingTicketsError}
                totalCost={totalCost}
              />
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
