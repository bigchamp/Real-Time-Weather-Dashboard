import { PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import * as types from "./types";

export const initialState = (state: types.WeatherSliceForm) => {
  return {
    ...state,
    weather: null,
  };
};

export const setFavourites: types.BaseContract<types.Favourite[]> = (
  state,
  action
) => {
  return {
    ...state,
    favorites: action.payload,
  };
};

export const toogleFavourite: types.BaseContract<types.Favourite> = (
  state,
  action
) => {
  const exists = state.favorites.some(
    (loc) => loc.timezone === action.payload.timezone
  );

  return {
    ...state,
    favorites: exists
      ? state.favorites.filter(
          (loc) => loc.timezone !== action.payload.timezone
        )
      : [...state.favorites, action.payload],
  };
};
