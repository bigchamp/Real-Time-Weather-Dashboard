import React, { useEffect, useMemo, useState } from "react";
import { FlatList, TouchableHighlight, Image, AppState } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  View,
  Text,
  FavouriteIcon,
  Pressable,
  HStack,
} from "@gluestack-ui/themed";

// utils
import { getErrorMessage } from "@/src/utils/getErrorMessage";

// components
import CommonLayout from "@/src/components/CommonLayout";
import TextField from "@/src/components/TextField";
import CustomHeader from "@/src/components/CustomHeader";
import CustomButton from "@/src/components/Button";

//styles
import styles from "./styles";

// redux
import { useWeather } from "@/src/store/weather";

// types
import { DailyWeather, HomeScreenForm } from "@/src/store/weather/types";
import { Alert } from "react-native";

const validationSchema = yup.object({
  city: yup.string().required(),
});

const WeatherApp = () => {
  const { getWeather, getCityWeather, weather, favorites, toogleFavourite } =
    useWeather();
  const [city, setSity] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#f2f2f2");

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const {
    formState: { isValid },
    setValue,
    handleSubmit,
  } = methods;

  const onSearch = (values: HomeScreenForm) => {
    setSity(values.city);
  };

  const convertUnixToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
        }

        let latitude;
        let longitude;

        if (!city) {
          const currentLocation = await Location.getCurrentPositionAsync({});
          latitude = currentLocation.coords.latitude;
          longitude = currentLocation.coords.longitude;
        } else {
          const response = await getCityWeather(city);
          latitude = response.coord.lat;
          longitude = response.coord.lon;
          setValue("city", "");
        }

        await getWeather({ latitude, longitude });

        if (weather?.current.weather[0].main === "Clear") {
          setBackgroundColor("#FFD700");
        } else if (weather?.current.weather[0].main === "Clouds") {
          setBackgroundColor("#B0C4DE");
        } else if (weather?.current.weather[0].main === "Rain") {
          setBackgroundColor("#708090");
        } else {
          setBackgroundColor("#f2f2f2");
        }
      } catch (error) {
        if (error == 404) {
          Alert.alert("Error", `City "${city}" not found`);
          setValue("city", "");
        }

        getErrorMessage(error);
      }
    };

    getWeatherData();
  }, [city]);

  const renderItem = (item: DailyWeather) => {
    const date = convertUnixToDate(item.dt);

    return (
      <View style={styles.weatherCard}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.summary}>{item.summary}</Text>

        <View style={styles.tempContainer}>
          <Text style={styles.temp}>
            Min: {Math.round(item.temp.min - 273.15)}°C
          </Text>
          <Text style={styles.temp}>
            Max: {Math.round(item.temp.max - 273.15)}°C
          </Text>
        </View>

        <View style={styles.weatherInfo}>
          <Text style={styles.infoText}>
            Weather: {item.weather[0].description}
          </Text>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
            }}
          />
        </View>

        <Text style={styles.infoText}>Wind Speed: {item.wind_speed} m/s</Text>
        <Text style={styles.infoText}>Humidity: {item.humidity}%</Text>
      </View>
    );
  };

  const inFav = useMemo(() => {
    if (!weather) return false;

    const exists = favorites.some(
      (loc) => loc.latitude === weather.lat && loc.longitude === weather.lon
    );

    return exists;
  }, [favorites, weather]);

  const listHeaderComponent = () => {
    return (
      weather && (
        <TouchableHighlight>
          <View my={24}>
            <View style={styles.weatherContainer}>
              <HStack alignItems="center" gap={6}>
                <Text style={styles.cityName}>{weather?.timezone}</Text>
                <Pressable
                  onPress={() =>
                    toogleFavourite({
                      timezone: weather.timezone.split("/")[1].toString(),
                      latitude: weather.lat,
                      longitude: weather.lon,
                    })
                  }
                >
                  <FavouriteIcon
                    h={35}
                    w={35}
                    color={inFav ? "red" : "black"}
                    fill={inFav ? "red" : "transparent"}
                  />
                </Pressable>
              </HStack>
              <Text style={styles.temperature}>
                {Math.floor(weather?.current.temp - 273)}°C
              </Text>
              <Text style={styles.weatherCondition}>
                {weather?.current?.weather[0]?.description}
              </Text>
              <Image
                style={styles.icon}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weather?.current?.weather[0]?.icon}.png`,
                }}
              />
            </View>
          </View>
        </TouchableHighlight>
      )
    );
  };

  const listEmptyComponent = () => {
    return (
      <View flex={1} alignItems="center" pt={16}>
        <Text fontSize={24}>...Loading</Text>
      </View>
    );
  };
  return (
    <FormProvider {...methods}>
      <LinearGradient
        colors={[backgroundColor, "#f2f2f2"]}
        style={styles.container}
      >
        <CommonLayout>
          <View flex={1} justifyContent="space-between">
            <CustomHeader>
              <TextField name={"city"} placeholder={"Enter city name"} />
              <CustomButton
                w={100}
                onPress={handleSubmit(onSearch)}
                disabled={!isValid}
                opacity={!isValid ? 0.4 : 1}
              >
                Search
              </CustomButton>
            </CustomHeader>

            <FlatList
              ListEmptyComponent={listEmptyComponent}
              ListHeaderComponent={listHeaderComponent}
              style={styles.container}
              data={weather?.daily || []}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item.dt.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </CommonLayout>
      </LinearGradient>
    </FormProvider>
  );
};

export default WeatherApp;
