import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Temperature = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type DailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
};

type CurrentWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
};

export type locationForm = {
  latitude: number;
  longitude: number;
};

export type WeatherForm = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyWeather[];
};

export type WeatherSliceForm = {
  weather: WeatherForm | null;
  favorites: Favourite[];
  isLoading: boolean;
};

export interface Favourite extends locationForm {
  timezone: string;
}

type Coordinates = {
  lon: number;
  lat: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Clouds = {
  all: number;
};

type Sys = {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type CityWeatherForm = {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type HomeScreenForm = {
  city: string;
};

export type BaseContract<T = unknown> = CaseReducer<
  WeatherSliceForm,
  PayloadAction<T>
>;
