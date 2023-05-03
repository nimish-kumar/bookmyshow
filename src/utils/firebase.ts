import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  NativeModuleError,
} from "@react-native-google-signin/google-signin";

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    const typedError = error as NativeModuleError;
    throw Error(typedError.code);
  }
};

export const googleSignInSilently = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signInSilently();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    const typedError = error as NativeModuleError;
    throw Error(typedError.code);
  }
};
export const googleSignOut = async (token: string) => {
  try {
    await GoogleSignin.clearCachedAccessToken(token);
    await GoogleSignin.signOut();
    return auth().signOut();
  } catch (error) {
    const typedError = error as NativeModuleError;
    throw Error(typedError.code);
  }
};
