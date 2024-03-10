// src/store/todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ApiLoadingState {
  isLoading: boolean;
}

const initialState: ApiLoadingState = {
  isLoading: false,
};

const apiLoadingSlice = createSlice({
  name: "apiLoading",
  initialState,
  reducers: {
    showApiLoading: (state) => {
      state.isLoading = true;
    },
    hideApiLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showApiLoading, hideApiLoading } = apiLoadingSlice.actions;
export default apiLoadingSlice.reducer;

// Selector to get the todos state
export const selectLoading = (state: RootState) => state.apiLoading;
