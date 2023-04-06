import { tw } from "@lib";
import { RootStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Backdrop } from "../../components/Backdrop";
import { Badge } from "../../components/Badge";
const langAndFormat = [
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
type ContextType = {
  translateY: number;
};
type LangFormatType = {
  lang: string;
  format: string;
};
export const FormatSelector = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "FormatSelector">
    >();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const route = useRoute<RouteProp<RootStackParamList, "FormatSelector">>();
  const { movieId } = route.params;
  const translateY = useSharedValue(0);
  const closeBackdrop = () => navigation.goBack();

  const [langFormat, setLangFormat] = useState<LangFormatType | null>(null);
  useEffect(() => {
    if (langFormat) {
      navigation.navigate("SlotSelector", {
        movieId,
        format: langFormat.format,
        lang: langFormat.lang,
      });
    }
  }, [langFormat]);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, ctx) => {
      ctx.translateY = event.translationY;
    },
    onActive: (event, ctx) => {
      translateY.value = Math.max(event.translationY + ctx.translateY, 0);
    },
    onEnd: (event) => {
      if (event.translationY > 100) {
        runOnJS(closeBackdrop)();
      } else {
        translateY.value = withSpring(0);
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Backdrop closeBackdrop={closeBackdrop} isVisible>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
          <>
            <View
              style={tw`self-center h-1 w-24 rounded-3xl bg-gray-400 mt-2 mb-6`}
            />
            <View style={tw`px-4 mb-2`}>
              <Text style={tw`font-roboto-regular text-sm`}>Movie name</Text>
              <Text style={tw`text-lg`}>Select language and format</Text>
            </View>
            <View style={tw`mb-2`}>
              {langAndFormat.map((e) => (
                <View key={e.lang}>
                  <View style={tw`bg-gray-100 justify-center px-4 h-8`}>
                    <Text style={tw`text-xs text-gray-600`}>
                      {e.lang.toUpperCase()}
                    </Text>
                  </View>
                  <View style={tw`flex-row mx-4 py-3`}>
                    {e.format.map((format, formatIdx) => (
                      <View key={format} style={tw`mr-4`}>
                        <Badge
                          badgeText={format}
                          onPress={() => {
                            setLangFormat({
                              lang: e.code,
                              format,
                            });
                          }}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </>
        </Animated.View>
      </PanGestureHandler>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "white",
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
