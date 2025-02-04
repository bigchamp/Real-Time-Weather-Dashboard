import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppState } from "react-native";
import { useEffect } from "react";

// screens
import WeatherApp from "../screens/Home/index";
import Favorites from "../screens/Favorites/index";

// components
import { TabBar } from "../components/TabBar";

// redux
import { useWeather } from "../store/weather";

// utils
import { getErrorMessage } from "../utils/getErrorMessage";
import { load, save } from "../utils/storage";

type TabsParamsList = {
  Home: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabsParamsList>();
const CustomTabBar = (props: any) => <TabBar {...props} />;

export function TabsNavigation() {
  const { favorites, setFavourites } = useWeather();

  useEffect(() => {
    const loadDataFromAsyncStorage = async () => {
      try {
        const savedFavorites = await load("favorites");

        if (savedFavorites) {
          setFavourites(savedFavorites);
        }
      } catch (error) {
        getErrorMessage(error);
      }
    };

    loadDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const saveDataToAsyncStorage = async () => {
      try {
        await save("favorites", favorites);
      } catch (error) {
        getErrorMessage(error);
      }
    };

    const unsubscribe = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        saveDataToAsyncStorage();
      }
    });

    return () => unsubscribe.remove();
  }, [favorites]);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={CustomTabBar}>
      <Tab.Screen name="Home" component={WeatherApp} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}
