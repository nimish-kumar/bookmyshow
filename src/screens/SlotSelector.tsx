import { AppBar, Badge, CalendarDateTile, SlotTile } from "@components";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { tw } from "@tailwind";
import { IPriceRange, ISlotTile, RootStackParamList } from "@types";
import { addListener, removeListener } from "@utils";
import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

const priceRanges: IPriceRange[] = [
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
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "SlotSelector">
    >();
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
  const [langFormat, setLangFormat] = useState({ code: lang, format });
  const [movieDateIdx, setMovieDateIdx] = useState(0);
  const [priceRangeIdx, setPriceRangeIdx] = useState<number | null>(null);
  useEffect(() => {
    const changeLangFormat = (lang: string, movieFormat: string) =>
      setLangFormat({ code: lang, format: movieFormat });
    addListener("OnLangFormatChange", changeLangFormat);
    return () => {
      removeListener("OnLangFormatChange", changeLangFormat);
    };
  }, []);
  const priceRangeHandler = (idx: number) => {
    if (priceRangeIdx === idx) setPriceRangeIdx(null);
    else setPriceRangeIdx(idx);
  };
  const datetimeArray = useMemo(
    () =>
      Array(7)
        .fill(dayjs())
        .map((v: dayjs.Dayjs, idx) => {
          let datetime = v.add(idx, "day");
          if (idx !== 0) {
            datetime = datetime.startOf("day");
          }
          return datetime;
        }),
    []
  );
  return (
    <SafeAreaView>
      <View style={tw`flex justify-center bg-neutral-200 min-h-full`}>
        <AppBar title="Movie name" backButton backFunction={goBack} />
        <ScrollView horizontal style={tw`border-b bg-white border-gray-300`}>
          {datetimeArray.map((dayjs_dt, idx) => {
            return (
              <CalendarDateTile
                key={idx}
                datetime={dayjs_dt}
                selectDateHandler={() => {
                  setMovieDateIdx(idx);
                }}
                // TODO: Add condition for disabled state on CalenderDateTile
                mode={idx === movieDateIdx ? "selected" : "default"}
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
          style={tw`bg-white pl-2 border-b border-gray-200`}
          data={priceRanges}
          renderItem={({ item: { low, high }, index }) => (
            <View style={tw`mr-2 mt-2 mb-5`}>
              <Badge
                badgeText={`${`₹${low} - ₹${high}`}`}
                onPress={() => priceRangeHandler(index)}
                mode={priceRangeIdx === index ? "selected" : "default"}
              />
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
                  slotSelectHandler={() => {
                    navigation.navigate("SeatSelector", {
                      movieId,
                      format: langFormat.format,
                      lang: langFormat.code,
                      slotId: 0,
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
