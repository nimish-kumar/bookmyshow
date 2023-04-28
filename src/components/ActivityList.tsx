import { tw } from "@tailwind";
import { IActivityListProps } from "@types";
import React from "react";
import { FlatList } from "react-native";

import { ActivityTile } from "./ActivityTile";

export const ActivityList = ({
  activities,
  activityHandler,
}: IActivityListProps) => {
  return (
    <FlatList
      horizontal
      data={activities}
      showsHorizontalScrollIndicator={false}
      style={tw`h-auto mt-4`}
      renderItem={({ item: activity }) => (
        <ActivityTile
          key={activity.id}
          activityDetail={activity}
          clickHandler={activityHandler}
        />
      )}
    />
  );
};
