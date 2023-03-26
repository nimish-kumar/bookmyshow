import { darkNavy } from "@assets";
import { PortalProvider } from "@context";
import { RootNavigator } from "@navigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <PortalProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar backgroundColor={darkNavy} barStyle="light-content" />
      </ThemeProvider>
    </PortalProvider>
  );
}
