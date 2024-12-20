import { configureStore } from "@reduxjs/toolkit";
import apiLoadingReducer from "./slice/apiLoadingSlice";
import networkReducer from "./slice/networkSlice";
import accountReducer from "./slice/accountSlice";
import tokenReducer from "./slice/ERC20Slice";
import activityReducer from "./slice/activitySlice";

const store = configureStore({
  reducer: {
    apiLoading: apiLoadingReducer,
    network: networkReducer,
    account: accountReducer,
    tokens: tokenReducer,
    activities: activityReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
