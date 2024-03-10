import { configureStore } from "@reduxjs/toolkit";
import apiLoadingReducer from "./slice/apiLoadingSlice";
import networkReducer from "./slice/networkSlice";

const store = configureStore({
  reducer: {
    apiLoading: apiLoadingReducer,
    network: networkReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
