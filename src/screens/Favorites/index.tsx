import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  FavouriteIcon,
  HStack,
  Pressable,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

// components
import CommonLayout from "@/src/components/CommonLayout";

// redux
import { useWeather } from "@/src/store/weather";
import { CityWeatherForm } from "@/src/store/weather/types";

// styles
import styles from "./styles";

// utils
import { getErrorMessage } from "@/src/utils/getErrorMessage";

// screen
import FullScreenLoader from "../FullScreenLoader";

const Separator = () => <View style={styles.line}></View>;
const Favourites = () => {
  const navigation = useNavigation();
  const { favorites, toogleFavourite, getCityWeather } = useWeather();
  const [weathers, setWeathers] = useState<CityWeatherForm[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCityWeatherData = async () => {
    try {
      setIsLoading(true);

      const res = favorites.map(async (favorite) => {
        const name = favorite.timezone;
        const response = await getCityWeather(name);
        return response;
      });

      const data = await Promise.all(res);
      setWeathers(data);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener(
      "focus",
      getCityWeatherData
    );
    const unsubscribeBlur = navigation.addListener("blur", () => {
      setWeathers(null);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, favorites]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const renderItem = (item: CityWeatherForm) => {
    return (
      <HStack style={styles.row}>
        <HStack alignItems="center" gap={6}>
          <Text style={styles.cityName}>{item?.name}</Text>
          <Text fontWeight={"$bold"}>
            {Math.round(item.main.temp - 273.15)}°C
          </Text>
        </HStack>
        <Pressable
          onPress={async () =>
            item && [
              toogleFavourite({
                timezone: item.name,
                latitude: item.coord.lat,
                longitude: item.coord.lon,
              }),
              setWeathers(
                weathers?.filter((weather) => weather.name !== item.name) || []
              ),
            ]
          }
        >
          <FavouriteIcon h={35} w={35} color={"red"} fill={"red"} />
        </Pressable>
      </HStack>
    );
  };

  const listEmptyComponent = () => {
    return (
      <Text fontSize={24} fontWeight={"$bold"} textAlign="center">
        Favorites is empty.
      </Text>
    );
  };

  const listHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Favourites</Text>
      </View>
    );
  };

  return (
    <CommonLayout>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={Separator}
        data={weathers}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, i) => i.toString()}
      />
    </CommonLayout>
  );
};

export default Favourites;
