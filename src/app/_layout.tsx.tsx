import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { TabsNavigation } from "../navigation/tabNavigation";
import { Provider } from "react-redux";

// utils
import { getErrorMessage } from "../utils/getErrorMessage";

// redux
import store from "../store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <TabsNavigation />
      </GluestackUIProvider>
    </Provider>
  );
}
