import React from "react";
import { StyleSheet, Text } from "react-native";

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
      <Text style={styles.backdropText}>FormatSelector</Text>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  backdropText: {
    color: "white",
    backgroundColor: "white",
  },
});
