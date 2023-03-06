import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "./api/authApi";
import { todoApi } from "./api/todoApi";
import { nestedTodoApi } from "./api/nestedTodoApi";

export const store = configureStore({
  reducer: {
    // Connect the api reducers to the store
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [nestedTodoApi.reducerPath]: nestedTodoApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      // Add the apis middleware to the store
      authApi.middleware,
      todoApi.middleware,
      nestedTodoApi.middleware,
    ]),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
