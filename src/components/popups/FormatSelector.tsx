import { tw } from "@lib";
import React from "react";
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

import { Backdrop } from "../Backdrop";
import { Badge } from "../Badge";
const langAndFormat = [
  {
    lang: "Hindi",
    format: ["2D"],
  },
  {
    lang: "English",
    format: ["2D", "3D", "4DX"],
  },
];
interface IFormatSelectorProps {
  isVisible: boolean;
  closeBackdrop: () => void;
}
type ContextType = {
  translateY: number;
};
export const FormatSelector = ({
  isVisible,
  closeBackdrop,
}: IFormatSelectorProps) => {
  const translateY = useSharedValue(0);
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
    <Backdrop closeBackdrop={closeBackdrop} isVisible={isVisible}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
          <>
            {/* line */}
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
                  <View style={tw`flex-row mx-4`}>
                    {e.format.map((format) => (
                      <View key={format} style={tw`mr-2`}>
                        <Badge badgeText={format} />
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
