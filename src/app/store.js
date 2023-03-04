import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import apiSlice from "./features/apiSlice";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authReducer: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
