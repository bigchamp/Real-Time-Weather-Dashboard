import { getWeather } from "./thunk/getWeather";
import { getCityWeather } from "./thunk/getCityWeather";
import { weatherActions } from "./slice";

// hooks
import { useSelector } from "@/src/hooks/useSelector";
import { useDispatch } from "@/src/hooks/useDispatch";

// types
import { Favourite, locationForm } from "./types";

export const useWeather = () => {
  const dispatch = useDispatch();

  return {
    weather: useSelector(({ weather }) => weather.weather),
    favorites: useSelector(({ weather }) => weather.favorites),

    toogleFavourite: (location: Favourite) =>
      dispatch(weatherActions.toogleFavourite(location)),
    getWeather: async (location: locationForm) =>
      await dispatch(getWeather(location)).unwrap(),
    getCityWeather: async (city: string) =>
      await dispatch(getCityWeather(city)).unwrap(),
    setFavourites: (location: Favourite[]) =>
      dispatch(weatherActions.setFavourites(location)),
  };
};
