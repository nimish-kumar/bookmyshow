import { BottomSheet } from "@rneui/themed";
import React from "react";
import { Text } from "react-native";

interface IFormatSelectorProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const FormatSelector = ({
  isOpen,
  closeModal,
}: IFormatSelectorProps) => {
  return (
    <BottomSheet isVisible={isOpen} onBackdropPress={closeModal}>
      <Text>FormatSelector</Text>
    </BottomSheet>
  );
};
