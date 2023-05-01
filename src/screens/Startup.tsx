import { useMutation } from "@apollo/client";
import { AuthContext } from "@context";
import { FIREBASE_WEB_CLIENT_ID } from "@env";
import { UPDATE_USER } from "@graphql";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { tw } from "@tailwind";
import { StartupNavigationProp } from "@types";
import {
  getAccessToken,
  googleSignIn,
  googleSignInSilently,
  hasTokenExpired,
  setAccessToken,
} from "@utils";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { SignIn } from "./SignIn";
import { Splash } from "./Splash";

export const Startup = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const [setUserDetails, { loading, data }] = useMutation(UPDATE_USER);
  useEffect(() => {
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
    getAccessToken()
      .then((t) => {
        if (t && hasTokenExpired(t)) {
          token = t;
          googleSignInSilently()
            .then(() => {})
            .catch((err) =>
              console.log("Firebase sign in silently err: ", err)
            );
        } else setTimeout(() => setSplashVisibility(false), 3000);
      })
      .catch((err) => console.log("Error while fetching tokens: ", err));

    const subscriber = auth().onAuthStateChanged(
      async (user: FirebaseAuthTypes.User | null) => {
        // After auth state changes, show loader
        // then do background tasks
        setSplashVisibility(true);

        console.log("-----AUTH STATE CHANGED-----");
        if (user) {
          // If a token has expired or no token
          if (!token || hasTokenExpired(token)) {
            token = await user.getIdToken();
          }
          setAccessToken(token)
            .then(() => {
              setUserDetails({
                variables: {
                  firstName: user.displayName?.split(" ")[0],
                  lastName: user.displayName?.split(" ")[1],
                  profileImageUrl: user.photoURL ?? "",
                },
              });
            })
            .catch((err) =>
              console.log("Error while setting access token", err)
            );
        }
      }
    );
    return subscriber; // unsubscribe on unmount
  }, []);
  useEffect(() => {
    if (!loading && data) {
      //Set splash visibility to false
      setSplashVisibility(false);
      // Route to application route
      setLoggedIn(true);
    }
  }, [loading]);
  if (splashVisible) {
    return <Splash />;
  }
  return (
    <View style={tw`flex-1`}>
      <SignIn handleLogin={googleSignIn} />
    </View>
  );
};
