import { useQuery } from "@apollo/client";
import { AuthContext } from "@context";
import { GET_USER_DETAILS } from "@graphql";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { tw } from "@tailwind";
import {
  emptyAsyncStorage,
  getAccessToken,
  googleSignOut,
  removeSecureStoreKeys,
} from "@utils";
import React, { useCallback, useContext, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Text,
  View,
} from "react-native";

export const Profile = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const navigation = useNavigation();
  const {
    loading: loadingUserDetails,
    data: userDetailsData,
    error: userDetailsError,
  } = useQuery(GET_USER_DETAILS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Deactivate back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  if (loadingUserDetails) {
    return (
      <View style={tw`justify-center items-center min-h-full min-w-full`}>
        <ActivityIndicator color="red" />
      </View>
    );
  }
  if (userDetailsError) {
    throw Error("Error while fetching user details");
  }
  console.log("Data fetched --> ", userDetailsData?.getUserDetails);
  return (
    <View style={tw`h-full flex`}>
      <View style={tw`pt-40 absolute z-10 self-center`}>
        {!userDetailsData?.getUserDetails?.profileImageUrl ||
        userDetailsData?.getUserDetails?.profileImageUrl !== "" ? (
          <View
            style={tw`w-40 h-40 rounded-full bg-pink justify-center items-center`}
          >
            <Icon
              type="ionicon"
              name="person-sharp"
              color="white"
              size={100}
              style={tw`self-center`}
            />
          </View>
        ) : (
          <View style={tw`justify-center items-center`}>
            <Image
              source={{
                uri: userDetailsData.getUserDetails.profileImageUrl,
              }}
              progressiveRenderingEnabled
              resizeMode="contain"
              style={tw`w-30 h-30`}
            />
          </View>
        )}
        <View style={tw`items-center mt-1`}>
          <Text style={tw`text-base font-roboto-medium`}>
            {`${userDetailsData?.getUserDetails?.firstName} ${userDetailsData?.getUserDetails.lastName}`}
          </Text>
          <Text style={tw`font-roboto-regular`}>
            {userDetailsData?.getUserDetails.email}
          </Text>
        </View>
        <Button
          title="Logout"
          containerStyle={tw`mt-20`}
          onPress={async () => {
            const token = await getAccessToken();
            const promiseRemoveSecureStorage = removeSecureStoreKeys();
            const promiseEmptyStorage = emptyAsyncStorage();
            const promiseSignOut = token && googleSignOut(token);
            Promise.all([
              promiseEmptyStorage,
              promiseRemoveSecureStorage,
              promiseSignOut,
            ]).then(() => {
              setLoggedIn(false);
            });
          }}
          icon={
            <Icon
              type="material"
              name="logout"
              color="white"
              style={tw`mr-2`}
            />
          }
          iconPosition="left"
        />
      </View>
      <View style={tw`h-1/3 bg-light-navy opacity-70`} />
    </View>
  );
};
