import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Provider } from "react-redux";
import * as Location from "expo-location";
import { TabsNavigation } from "../navigation/tabNavigation";

// utils
import { getErrorMessage } from "../utils/getErrorMessage";

// redux
import store from "../store";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const requestLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
        }
      } catch (error) {
        getErrorMessage(error);
      }
    };
    requestLocation();
  });

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <TabsNavigation />
      </GluestackUIProvider>
    </Provider>
  );
}
