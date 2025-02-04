import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { WeatherSliceForm } from "../types";
import { getWeather } from "./getWeather";

export const extraReducers = (
  builder: ActionReducerMapBuilder<WeatherSliceForm>
) => {
  builder.addMatcher(isAnyOf(getWeather.pending), (state) => {
    state.isLoading = true;
  });
  builder.addMatcher(isAnyOf(getWeather.fulfilled), (state, action) => {
    state.isLoading = false;
    state.weather = action.payload;
  });
  builder.addMatcher(isAnyOf(getWeather.rejected), (state) => {
    state.isLoading = false;
  });
};
