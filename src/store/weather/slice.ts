import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";
import { extraReducers } from "./thunk";
import * as types from "./types";

const initialState: types.WeatherSliceForm = {
  weather: null,
  favorites: [],
  isLoading: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers,
  extraReducers,
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
