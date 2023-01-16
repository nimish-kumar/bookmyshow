import { darkNavy } from "@assets";
import {
  ActivitiesTypesList,
  ActivityList,
  Carousel,
  Titlebar,
} from "@components";
import { tw } from "@lib";
import { Text, ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { StatusBar, View } from "react-native";
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
        <Titlebar currentCity="Pune" />
        <ActivitiesTypesList />
        <Carousel />
        <View style={tw`mt-4 mx-4`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-roboto-medium font-normal text-lg`}>
              Recommended Movies
            </Text>
            <Text style={tw`font-roboto-regular text-pink text-sm`}>
              {"See All >"}
            </Text>
          </View>

          <ActivityList />
        </View>
        <StatusBar backgroundColor={darkNavy} barStyle="light-content" />
      </SafeAreaView>
    </ThemeProvider>
  );
}
