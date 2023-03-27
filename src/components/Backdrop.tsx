import React, { PropsWithChildren } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IBackdropProps extends PropsWithChildren {
  isVisible: boolean;
  closeBackdrop: () => void;
}
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
export const Backdrop = ({
  closeBackdrop,
  isVisible,
  children,
}: IBackdropProps) => {
  // Unmount component if not visible
  return isVisible ? (
    <View style={styles.sheetContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={closeBackdrop} />
        {children}
      </GestureHandlerRootView>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  sheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
});
