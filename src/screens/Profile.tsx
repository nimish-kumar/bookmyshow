import { AuthContext } from "@context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { tw } from "@tailwind";
import { IUserDetails } from "@types";
import {
  emptyAsyncStorage,
  getAccessToken,
  getUserDetails,
  googleSignOut,
  removeSecureStoreKeys,
} from "@utils";
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { BackHandler, Image, Text, View } from "react-native";

export const Profile = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  getUserDetails().then(({ userEmail, userName, profileImageUrl }) => {
    const imageUrl = profileImageUrl !== "" ? profileImageUrl : null;
    setUserDetails({ userName, userEmail, profileImageUrl: imageUrl });
  });

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
  return (
    <View style={tw`h-full flex`}>
      <View style={tw`pt-40 absolute z-10 self-center`}>
        {!userDetails?.profileImageUrl ? (
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
          <View style={tw` justify-center items-center`}>
            <Image
              source={{
                uri: userDetails.profileImageUrl,
              }}
              resizeMode="contain"
              style={tw`w-30 h-30`}
            />
          </View>
        )}
        <View style={tw`items-center mt-1`}>
          <Text style={tw`text-base font-roboto-medium`}>
            {userDetails?.userName}
          </Text>
          <Text style={tw`font-roboto-regular`}>{userDetails?.userEmail}</Text>
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
