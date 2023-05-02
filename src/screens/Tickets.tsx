// TODO: Tickets screen looks dull make it better

import { useLazyQuery } from "@apollo/client";
import { AppBar, Ticket } from "@components";
import { LIST_MOVIE_BOOKINGS } from "@graphql";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import { tw } from "@tailwind";
import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { BackHandler, FlatList, ImageSourcePropType, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookingType } from "src/__generated__/graphql";

export const Tickets = () => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const navigation = useNavigation();
  const [fetchBookings, { loading, data, error }] =
    useLazyQuery(LIST_MOVIE_BOOKINGS);
  const [bookings, setBookings] = useState<(BookingType | null)[]>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!loading && data) {
      setBookings((b) => {
        if (page !== 1 && b)
          return [...b, ...(data?.listBookingDetails.results || [])];
        return [...(data?.listBookingDetails.results || [])];
      });
    }
  }, [loading]);
  useEffect(() => {
    fetchBookings({
      variables: { page, limit: 10 },
      fetchPolicy: "no-cache",
    });
  }, [page]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  if (error) {
    throw Error(error.message);
  }
  return (
    <SafeAreaView>
      <AppBar title="Tickets" />
      <View style={tw``}>
        <FlatList
          contentContainerStyle={tw`pb-50`}
          data={bookings}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider style={tw`my-1`} />}
          renderItem={({ item: booking, index }) => (
            <Ticket
              bookingId={booking?.id || "-1"}
              posterUrl={
                (booking?.slotGrp.slot.movie.posterUrl ||
                  null) as ImageSourcePropType
              }
              movieFormat={booking?.slotGrp.slot.format?.format || "2D"}
              movieLang={booking?.slotGrp.slot.lang.name || "Hindi"}
              movieName={booking?.slotGrp.slot.movie.name || "Movie name"}
              screenId={booking?.slotGrp.slot.screen.screenId || "Screen ID"}
              screeningDatetime={
                booking?.slotGrp.slot.screeningDatetime || dayjs().toString()
              }
              seatNumber={booking?.seatNumber || -1}
              seatRow={booking?.row || "Seat row"}
              theatreArea={
                booking?.slotGrp.slot.screen.theatre.areaName || "Area name"
              }
              theatreName={
                booking?.slotGrp.slot.screen.theatre.name || "Theatre name"
              }
            />
          )}
          keyExtractor={(item) => item?.id || "key"}
          refreshing={loading}
          onEndReached={() => {
            if (data?.listBookingDetails.nextPage) setPage((p) => p + 1);
          }}
          onEndReachedThreshold={1}
          scrollsToTop={false}
        />
      </View>
    </SafeAreaView>
  );
};
