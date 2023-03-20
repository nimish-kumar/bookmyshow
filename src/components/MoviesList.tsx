import React, { useState } from "react";
import { View } from "react-native";

import { ActivityList } from "./ActivityList";
import { FormatSelector } from "./popups";

export const MoviesList = () => {
  const [isFormatSelectorOpen, setFormatSelectorVisibility] =
    useState<boolean>(false);
  const openFormatSelector = (id: string | number) => {
    setFormatSelectorVisibility(true);
  };
  const closeFormatSelector = () => setFormatSelectorVisibility(false);
  return (
    <View>
      <ActivityList clickHandler={openFormatSelector} />
      <FormatSelector
        isOpen={isFormatSelectorOpen}
        closeModal={closeFormatSelector}
      />
    </View>
  );
};
