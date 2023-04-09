import { Image } from "@rneui/themed";
import { tw } from "@tailwind";
import { IActivity } from "@types";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const Activity = ({ activityDetail, clickHandler }: IActivityProps) => {
  // const [popupVisibility] = useState(true);
  return (
    // <PortalFrom>
    //   {(portal) => (
    <TouchableOpacity
      style={tw`h-full w-32 mr-2 flex-col`}
      onPress={() => {
        clickHandler?.(activityDetail.id);
        // portal(
        //   "format-selector",
        //   <FormatSelector
        //     isVisible={popupVisibility}
        //     closeBackdrop={() => {
        //       // Reset portal for closing backdrop
        //       portal("format-selector", <></>);
        //     }}
        //   />
        // );
      }}
    >
      <Image
        style={tw`h-54 w-auto rounded-lg`}
        resizeMode="contain"
        source={activityDetail.imgSrc}
      />
      <View style={tw`px-1`}>
        <Text
          style={tw`flex-wrap font-roboto-regular text-sm max-h-12 h-auto`}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {activityDetail.title}
        </Text>
        {activityDetail?.description && (
          <Text
            style={tw`font-roboto-regular text-slate-500 text-sm`}
            numberOfLines={1}
          >
            {activityDetail.description}
          </Text>
        )}
        {activityDetail?.additionalInfo && (
          <Text
            style={tw`font-roboto-regular text-slate-500 text-xs`}
            numberOfLines={1}
          >
            {activityDetail.additionalInfo}
          </Text>
        )}
      </View>
    </TouchableOpacity>
    // )}
    // </PortalFrom>
  );
};

export const ActivityList = ({
  activities,
  activityHandler,
}: IActivityList) => {
  return (
    <FlatList
      horizontal
      data={activities}
      showsHorizontalScrollIndicator={false}
      style={tw`h-auto mt-4`}
      renderItem={({ item: activity }) => (
        <Activity
          key={activity.id}
          activityDetail={activity}
          clickHandler={activityHandler}
        />
      )}
    />
  );
};
