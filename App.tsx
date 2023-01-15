import { darkNavy } from "@assets";
import { ActivitiesMenu, Titlebar } from "@components";
import { ThemeProvider } from "@rneui/themed";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <Titlebar currentCity="Pune" />
        <ActivitiesMenu />
        <StatusBar backgroundColor={darkNavy} barStyle="light-content" />
      </SafeAreaView>
    </ThemeProvider>
  );
}
