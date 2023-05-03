import { ApolloProvider } from "@apollo/client";
import { darkNavy } from "@assets";
import { AuthContextProvider } from "@context";
import { RootNavigator } from "@navigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import { client } from "@utils";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
    Montserrat: require("./assets/fonts/Montserrat.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <StatusBar backgroundColor={darkNavy} barStyle="light-content" />
        </ThemeProvider>
      </ApolloProvider>
    </AuthContextProvider>
  );
}
