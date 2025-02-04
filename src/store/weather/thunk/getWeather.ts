import { createAsyncThunk } from "@reduxjs/toolkit";
import baseService from "@/src/init/baseService";
import Constants from "expo-constants";

// types
import { locationForm, WeatherForm } from "../types";

// types

export const getWeather = createAsyncThunk<WeatherForm, locationForm>(
  "weather/getWeather",
  async (weatherDetails, { rejectWithValue }) => {
    try {
      const apiKey = Constants.expoConfig?.extra?.API_KEY;
      const { data } = await baseService.get(
        `3.0/onecall?lat=${weatherDetails.latitude}&lon=${weatherDetails.longitude}&appid=${apiKey}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.errorMessage || "Something is wrong"
      );
    }
  }
);
