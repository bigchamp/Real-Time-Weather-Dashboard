import { useDispatch as useReduxDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export const useDispatch: () => AppDispatch &
  ThunkDispatch<RootState, void, AnyAction> = useReduxDispatch;
