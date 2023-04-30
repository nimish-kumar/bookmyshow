import { AuthContext } from "@context";
import { FIREBASE_WEB_CLIENT_ID } from "@env";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { tw } from "@tailwind";
import { StartupNavigationProp } from "@types";
import {
  getAccessToken,
  googleSignIn,
  hasTokenExpired,
  setAccessToken,
  setUserDetails,
} from "@utils";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { SignIn } from "./SignIn";
import { Splash } from "./Splash";

export const Startup = () => {
  const { setLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log("FIREBASE_WEB_CLIENT_ID", FIREBASE_WEB_CLIENT_ID);
    GoogleSignin.configure({
      scopes: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/user.gender.read",
      ],
      webClientId: FIREBASE_WEB_CLIENT_ID,
    });
  }, []);
  const [splashVisible, setSplashVisibility] = useState(true);
  const navigation = useNavigation<StartupNavigationProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    let token: string | null = null;
    getAccessToken().then((t) => {
      if (!t) {
        setSplashVisibility(false);
      }
      token = t;
    });

    const subscriber = auth().onAuthStateChanged(
      async (user: FirebaseAuthTypes.User | null) => {
        if (user) {
          console.log("User");
          const promiseSetUser = await setUserDetails(
            user.displayName,
            user.email || "",
            user.photoURL
          );
          // If a token has expired or no token
          if (!token || hasTokenExpired(token)) {
            token = await user.getIdToken(true);
          }
          const promiseSetAccessToken = await setAccessToken(token);
          Promise.all([promiseSetUser, promiseSetAccessToken]).then(() => {
            //Set splash visibility to false
            setSplashVisibility(false);
            // Route to application route
            setLoggedIn(true);
          });
        }
      }
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  if (splashVisible) {
    return <Splash />;
  }
  return (
    <View style={tw`flex-1`}>
      <SignIn
        handleLogin={() =>
          googleSignIn()
            .then(() => setSplashVisibility(true))
            .catch(() => setSplashVisibility(false))
        }
      />
    </View>
  );
};
