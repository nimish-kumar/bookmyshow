import { darkNavy } from "@assets";
import { ThemeProvider } from "@rneui/themed";
import { Home } from "@screens";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <ThemeProvider>
      <SafeAreaView>
        <Home />
        <StatusBar backgroundColor={darkNavy} barStyle="light-content" />
      </SafeAreaView>
    </ThemeProvider>
  );
}
