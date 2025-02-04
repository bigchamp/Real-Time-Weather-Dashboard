import { createAsyncThunk } from "@reduxjs/toolkit";
import baseService from "@/src/init/baseService";
import Constants from "expo-constants";

// types
import { CityWeatherForm } from "../types";

export const getCityWeather = createAsyncThunk<CityWeatherForm, string>(
  "weather/getCityWeather",
  async (city, { rejectWithValue }) => {
    try {
      const apiKey = Constants.expoConfig?.extra?.API_KEY;
      const { data } = await baseService.get(
        `2.5/weather?q=${city}&APPID=${apiKey}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.status || "Something is wrong");
    }
  }
);
