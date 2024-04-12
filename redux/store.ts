import { configureStore } from "@reduxjs/toolkit";
import apiLoadingReducer from "./slice/apiLoadingSlice";
import networkReducer from "./slice/networkSlice";
import accountReducer from "./slice/accountSlice";

const store = configureStore({
  reducer: {
    apiLoading: apiLoadingReducer,
    network: networkReducer,
    account: accountReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
