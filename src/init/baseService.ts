import axios from "axios";
import Constants from "expo-constants";
import { save } from "../utils/storage";

const accessToken = "accessToken";
const apiUrl = Constants.expoConfig?.extra?.API_URL;

export const authAccessTokenHeaderName = "Authorization";
const baseService = axios.create({
  baseURL: `${apiUrl}`,
});

export const saveTokens = async (access_token: string) => {
  await save(accessToken, access_token);
};

export const setAuthHeader = (access_token: string) => {
  baseService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `Bearer ${access_token}`;
};
baseService.interceptors.response.use((response) => {
  if (response.data && response.data[accessToken]) {
    saveTokens(response.data[accessToken]);
    setAuthHeader(response.data[accessToken]);
  }
  return response;
});

export default baseService;
