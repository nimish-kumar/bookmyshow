import { useMutation } from "@apollo/client";
import { AuthContext } from "@context";
import { EMAIL_ID, PASSWORD } from "@env";
import { FETCH_ACCESS_TOKEN, REFRESH_TOKEN } from "@graphql";
import { useNavigation } from "@react-navigation/native";
import { tw } from "@tailwind";
import { StartupNavigationProp } from "@types";
import {
  getAccessToken,
  getRefreshExpiryTime,
  getRefreshToken,
  hasTokenExpired,
  isPastOrEqual,
  setAccessToken,
  setRefreshExpiryTime,
  setRefreshToken,
  setUserDetails,
} from "@utils";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { SignIn } from "./SignIn";
import { Splash } from "./Splash";

export const Startup = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const [splashVisible, setSplashVisibility] = useState(true);
  const navigation = useNavigation<StartupNavigationProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const [
    fetchLoginToken,
    {
      loading: fetchingAccessToken,
      error: accessTokenError,
      data: accessTokenData,
    },
  ] = useMutation(FETCH_ACCESS_TOKEN, {
    variables: { email: EMAIL_ID, password: PASSWORD },
    fetchPolicy: "no-cache",
  });

  const [
    fetchRefreshedToken,
    {
      loading: fetchingRefreshToken,
      error: refreshTokenError,
      data: refreshTokenData,
    },
  ] = useMutation(REFRESH_TOKEN, { fetchPolicy: "no-cache" });
  useEffect(() => {
    (async () => {
      try {
        let accessToken: string | null = null;
        let refreshToken: string | null = null;
        let refreshExpiryTime: number | null = null;
        accessToken = await getAccessToken();
        if (accessToken) {
          if (hasTokenExpired(accessToken)) {
            refreshToken = await getRefreshToken();
            refreshExpiryTime = await getRefreshExpiryTime();

            if (
              (refreshExpiryTime && isPastOrEqual(refreshExpiryTime)) ||
              refreshExpiryTime === null
            ) {
              setLoggedIn(false);
              setSplashVisibility(false);
            } else {
              fetchRefreshedToken({
                variables: { refreshToken },
              });
            }
          } else {
            // If access token has not expired, simply login
            setLoggedIn(true);
          }
        } else {
          // If token was not found set splash visibility false.
          // Because of which we will see SignIn page
          setSplashVisibility(false);
        }
      } catch (error) {
        if (error) {
          console.error("Error: ", error);
          throw Error("StorageError: Error while reading tokens");
        }
      }
    })();
  }, []);
  useEffect(() => {
    if (!fetchingAccessToken && accessTokenData?.tokenAuth) {
      const atPromise = setAccessToken(accessTokenData.tokenAuth.token);
      const rtPromise = setRefreshToken(accessTokenData.tokenAuth.refreshToken);
      const userDetailsPromise = setUserDetails(
        null,
        accessTokenData.tokenAuth.payload["email"]
      );
      const rtExpiryTimePromise = setRefreshExpiryTime(
        accessTokenData.tokenAuth.refreshExpiresIn
      );
      Promise.all([
        atPromise,
        rtPromise,
        rtExpiryTimePromise,
        userDetailsPromise,
      ])
        .then(() => {
          setSplashVisibility(true);
          setLoggedIn(true);
        })
        .catch((err) => {
          // This is used to switch back navigators
          // to Auth
          setLoggedIn(false);
          // User should now see login screen
          setSplashVisibility(false);
          console.error("Error: ", err);
          throw Error("StorageError: Error while setting tokens");
        });
    }
    if (!fetchingAccessToken && accessTokenError) {
      setLoggedIn(false);
      setSplashVisibility(false);
      throw Error(
        "APIError: Could not fetch results for FETCH_ACCESS_TOKEN api"
      );
    }
  }, [fetchingAccessToken]);

  useEffect(() => {
    if (
      refreshTokenData?.refreshToken &&
      refreshTokenData.refreshToken.token &&
      refreshTokenData.refreshToken.refreshToken
    ) {
      const atPromise = setAccessToken(refreshTokenData.refreshToken.token);
      const rtPromise = setRefreshToken(
        refreshTokenData.refreshToken.refreshToken
      );
      const userDetailsPromise = setUserDetails(
        null,
        refreshTokenData.refreshToken.payload["email"]
      );
      const rtExpiryTimePromise = setRefreshExpiryTime(
        refreshTokenData.refreshToken.refreshExpiresIn
      );
      Promise.all([
        atPromise,
        rtPromise,
        rtExpiryTimePromise,
        userDetailsPromise,
      ])
        .then(() => {
          setSplashVisibility(true);
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          setSplashVisibility(false);
          console.error("Error: ", err);
          throw Error("StorageError: Error while setting tokens");
        });
    }
    if (!fetchingRefreshToken && refreshTokenError) {
      setLoggedIn(false);
      setSplashVisibility(false);
      throw Error("APIError: Could not fetch results for REFRESH_TOKEN API");
    }
  }, [fetchingRefreshToken]);

  if (splashVisible) {
    return <Splash />;
  }
  return (
    <View style={tw`flex-1`}>
      <SignIn handleLogin={fetchLoginToken} />
    </View>
  );
};
