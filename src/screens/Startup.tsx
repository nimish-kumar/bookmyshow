import { useMutation } from "@apollo/client";
import { AuthContext } from "@context";
import { EMAIL_ID, PASSWORD } from "@env";
import { FETCH_ACCESS_TOKEN, REFRESH_TOKEN } from "@graphql";
import { tw } from "@tailwind";
import {
  getAccessToken,
  getRefreshToken,
  hasTokenExpired,
  setAccessToken,
  setRefreshToken,
} from "@utils";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { SignIn } from "./SignIn";
import { Splash } from "./Splash";

export const Startup = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const [splashVisible, setSplashVisibility] = useState(true);
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
        accessToken = await getAccessToken();

        if (accessToken && hasTokenExpired(accessToken)) {
          refreshToken = await getRefreshToken();
          fetchRefreshedToken({
            variables: { refreshToken },
          });
        }
        if (!accessToken) {
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
      Promise.all([atPromise, rtPromise])
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
      Promise.all([atPromise, rtPromise])
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
