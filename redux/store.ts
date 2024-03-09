import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slice/todoSlice";
import networkReducer from "./slice/networkSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    network: networkReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
