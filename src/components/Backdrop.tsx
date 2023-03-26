import React, { PropsWithChildren } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

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
    <TouchableOpacity style={styles.sheetContainer} onPress={closeBackdrop}>
      {children}
    </TouchableOpacity>
  ) : null;
};
const styles = StyleSheet.create({
  sheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    zIndex: 1,
    opacity: 0.8,
  },
});
