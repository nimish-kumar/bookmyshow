import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Backdrop } from "../Backdrop";

interface IFormatSelectorProps {
  isVisible: boolean;
  closeBackdrop: () => void;
}
export const FormatSelector = ({
  isVisible,
  closeBackdrop,
}: IFormatSelectorProps) => {
  return (
    <Backdrop closeBackdrop={closeBackdrop} isVisible={isVisible}>
      <View style={styles.bottomSheet}>
        <Text style={styles.backdropText}>FormatSelector</Text>
      </View>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  backdropText: {
    color: "black",
  },
  bottomSheet: {
    backgroundColor: "white",
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: 500,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
