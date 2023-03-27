import { tw } from "@lib";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
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
export const FormatSelector = ({
  isVisible,
  closeBackdrop,
}: IFormatSelectorProps) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      console.log("e.translationY", e.translationY);
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, 0);
    });
  const animatedBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(translateY.value, {
            stiffness: 500,
            velocity: 1,
          }),
        },
      ],
    };
  });
  return (
    <Backdrop closeBackdrop={closeBackdrop} isVisible={isVisible}>
      {/* TODO: Use PanGestureHandler component as GestureDetector doesn't registers
      all gestures */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheet, animatedBottomSheetStyle]}>
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
      </GestureDetector>
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
