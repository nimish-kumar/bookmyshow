import { useQuery } from "@apollo/client";
import { AppBar, Badge, CalendarDateTile, SlotTile } from "@components";
import { LIST_SLOTS } from "@graphql";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { tw } from "@tailwind";
import { IGroupedSlot, RootStackParamList } from "@types";
import { PUNE_CITY_ID, addListener, removeListener } from "@utils";
import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeNavigationProps } from "./Home";

export const SlotSelector = () => {
  const navigation = useNavigation<HomeNavigationProps>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const goBack = useCallback(() => navigation.navigate("Home"), []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const route = useRoute<RouteProp<RootStackParamList, "SlotSelector">>();
  const { format, lang, movieId, movieName, formats } = route.params;
  const {
    data: slotListData,
    loading: slotListLoading,
    error: slotListError,
  } = useQuery(LIST_SLOTS, {
    variables: {
      city: PUNE_CITY_ID,
      format,
      language: lang,
      movie: `${movieId}`,
    },
    fetchPolicy: "no-cache",
  });
  const groupedSlots: IGroupedSlot[] = useMemo(() => {
    const modMovieSlots = slotListData?.listMovieSlotsByCityDateLang
      .map((e) => {
        return {
          date: dayjs(e.screeningDatetime).format("DD-MM-YYYY"),
          ...e,
        };
      })
      .sort((x, y) => dayjs(x.date).unix() - dayjs(y.date).unix());
    const dateGroupedSlots = Array.from(
      new Set(modMovieSlots?.map((e) => e.date))
    ).map((date) => ({
      date,
      theatreSlots: modMovieSlots?.filter((slot) => slot.date === date) ?? null,
    }));
    return dateGroupedSlots.map((slot) => {
      const theatreSlots = slot.theatreSlots;
      if (theatreSlots) {
        const uniqueTheatreIds = Array.from(
          new Set(theatreSlots.map((e) => e.screen.theatre.id))
        );
        const theatresArray = [];
        for (let i = 0; i < uniqueTheatreIds.length; i++) {
          const theatreId = uniqueTheatreIds[i];
          const theatreObj = theatreSlots.find(
            (x) => x.screen.theatre.id === theatreId
          );
          if (theatreObj) {
            theatresArray.push({
              theatreId: theatreObj.screen.theatre.id,
              theatreName: theatreObj.screen.theatre.name,
              areaName: theatreObj.screen.theatre.areaName,
              timeSlots: theatreSlots
                .filter(
                  (x) => x.screen.theatre.id === theatreObj.screen.theatre.id
                )
                .sort(
                  (slotA, slotB) =>
                    dayjs(slotA.screeningDatetime).unix() -
                    dayjs(slotB.screeningDatetime).unix()
                ),
            });
          }
        }
        return { date: slot.date, theatreSlots: theatresArray };
      }
      return { date: slot.date, theatreSlots };
    });
  }, [slotListData]);

  const [langFormat, setLangFormat] = useState({ code: lang, format });
  const [slots, setSlots] = useState<IGroupedSlot | null>(null);
  const [priceRangeIdx, setPriceRangeIdx] = useState<number | null>(null);

  const generatePriceRanges = useCallback(
    (difference: number) => {
      const activeDateSlot =
        groupedSlots.find((e) => e.date === slots?.date) ?? null;
      if (activeDateSlot) {
        const costs = (
          activeDateSlot?.theatreSlots?.map((e) =>
            e.timeSlots.map((x) => ({ maxCost: x.maxCost, minCost: x.minCost }))
          ) || []
        ).flat(2);
        const maxCost =
          costs
            .map((e) => e.maxCost || Number.MIN_SAFE_INTEGER)
            .sort((a, b) => a - b)
            .at(-1) || Number.MIN_SAFE_INTEGER;
        const priceRangeCount = Math.floor(maxCost / difference) + 1;
        return Array(priceRangeCount)
          .fill({ maxCost: 0, minCost: 0 })
          .map((d, idx) => {
            return {
              maxCost: (idx + 1) * difference,
              minCost: idx === 0 ? idx * difference : idx * difference + 1,
            };
          });
      }
      return [];
    },
    [priceRangeIdx, slots]
  );
  const priceRanges = useMemo(() => generatePriceRanges(100), [slots]);

  useEffect(() => {
    const changeLangFormat = (lang: string, movieFormat: string) =>
      setLangFormat({ code: lang, format: movieFormat });
    addListener("OnLangFormatChange", changeLangFormat);
    return () => {
      removeListener("OnLangFormatChange", changeLangFormat);
    };
  }, []);

  const priceRangeHandler = (index: number) => {
    if (index === priceRangeIdx) setPriceRangeIdx(null);
    else {
      setPriceRangeIdx(index);
    }
  };
  const datetimeArray = useMemo(
    () =>
      Array(7)
        .fill(dayjs())
        .map((v: dayjs.Dayjs, idx) => v.add(idx, "day")),
    []
  );

  useEffect(() => {
    // Filter based on price range and movie da
    if (priceRangeIdx !== null && slots !== null) {
      const maxPrice = priceRanges[priceRangeIdx].maxCost;
      const minPrice = priceRanges[priceRangeIdx].minCost;
      setSlots((slot) => {
        if (slot) {
          const theatreSlots = [...(slot?.theatreSlots || [])];
          const costFilteredSlots = theatreSlots
            .map((e) => {
              const newSlots = e.timeSlots.filter(
                (t) =>
                  (t.maxCost || Number.MIN_SAFE_INTEGER) <= maxPrice &&
                  minPrice <= (t.minCost || Number.MAX_SAFE_INTEGER)
              );
              return {
                ...e,
                timeSlots: newSlots,
              };
            })
            .filter((e) => e.timeSlots.length !== 0);
          return { ...slot, theatreSlots: costFilteredSlots };
        }
        return null;
      });
    }
    if (slots !== null && priceRangeIdx === null) {
      const selectedDate = slots?.date;
      setSlots(groupedSlots.find((e) => e.date === selectedDate) || null);
    }
  }, [priceRangeIdx]);

  useEffect(() => {
    setSlots(groupedSlots[0]);
  }, [slotListLoading, langFormat]);
  if (slotListLoading || !slots) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  if (slotListError) {
    throw Error("APIError: Could not load LIST_SLOTS Query API");
  }
  return (
    <SafeAreaView>
      <View style={tw`flex justify-center bg-neutral-200 min-h-full`}>
        <AppBar title={movieName} backButton backFunction={goBack} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`border-b bg-white border-gray-300 max-h-20`}
        >
          {datetimeArray.map((dayjs_dt, idx) => {
            return (
              <CalendarDateTile
                key={idx}
                datetime={dayjs_dt}
                selectDateHandler={() => {
                  setPriceRangeIdx(null);
                  setSlots(
                    groupedSlots.find(
                      (e) => e.date === dayjs_dt.format("DD-MM-YYYY")
                    ) ?? null
                  );
                }}
                mode={
                  groupedSlots.find(
                    (s) => s.date === dayjs_dt.format("DD-MM-YYYY")
                  )?.theatreSlots ?? null
                    ? slots?.date === dayjs_dt.format("DD-MM-YYYY")
                      ? "selected"
                      : "default"
                    : "disabled"
                }
              />
            );
          })}
        </ScrollView>
        <View style={tw`pl-4 py-2 bg-white border-b border-gray-300 flex-row`}>
          <View style={tw`flex-row w-4/5 items-center`}>
            <Text style={tw`font-roboto-medium mr-2 text-xs`}>
              {formats.find((e) => e.code === langFormat.code)?.lang}
            </Text>
            <Text style={[tw`self-center`, { fontSize: 5 }]}>{"\u2B24"}</Text>
            <Text style={tw`font-roboto-medium ml-2 text-xs`}>
              {langFormat.format}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.push("FormatSelector", {
                movieId,
                movieName,
                formats,
              });
            }}
          >
            <Text style={tw`text-pink font-roboto-regular`}>{"Change >"}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          style={tw`bg-white pl-2 border-b border-gray-200 max-h-14`}
          data={priceRanges}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: { minCost, maxCost }, index }) => (
            <View style={tw`mr-2 my-3`}>
              <Badge
                badgeText={`${`₹${minCost} - ₹${maxCost}`}`}
                onPress={() => priceRangeHandler(index)}
                mode={index === priceRangeIdx ? "selected" : "default"}
              />
            </View>
          )}
        />

        <FlatList
          contentContainerStyle={tw`py-4 px-4`}
          data={slots.theatreSlots}
          renderItem={({ index, item }) => {
            return (
              <View key={index}>
                <SlotTile
                  areaName={item.areaName}
                  slots={item.timeSlots}
                  theatreName={item.theatreName}
                  slotSelectHandler={(timeSlotIdx, slotId) => {
                    navigation.navigate("SeatSelector", {
                      movieId,
                      format: langFormat.format,
                      lang: langFormat.code,
                      slotId,
                      movieName,
                      slotList: item.timeSlots.map((e) => ({
                        slotId: e.id,
                        datetime: e.screeningDatetime,
                      })),
                      selectedSlotId: slotId,
                      theatreName: item.theatreName,
                      areaName: item.areaName,
                    });
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
