import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  NativeModuleError,
  statusCodes,
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

    switch (typedError.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        // sign in was cancelled
        break;
      case statusCodes.IN_PROGRESS:
        // operation (eg. sign in) already in progress
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        // android only
        break;
      default:
        return {
          userInfo: null,
          error: typedError,
        };
    }
  }
};

export const googleSignOut = async (token: string) => {
  try {
    await GoogleSignin.clearCachedAccessToken(token);
    await GoogleSignin.signOut();
    return auth().signOut();
  } catch (error) {
    const typedError = error as NativeModuleError;

    return {
      userInfo: null,
      error: typedError,
    };
  }
};
