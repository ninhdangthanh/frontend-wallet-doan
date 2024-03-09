// src/store/todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Network {
  id: number;
  name: string;
  rpc_url: string;
  chain_id: number;
  currency_symbol: string;
  block_explorer_url: string | null;
  logo: string | null; 
  is_default: boolean;
  user_id: number | null;
}


export interface NetworkState {
  network: Network | null;
  isDefault: boolean
}

const initialState: NetworkState = {
  network: null,
  isDefault: true
};

const networksSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    changeNetwork: (state, action: PayloadAction<NetworkState>) => {
      state.isDefault = action.payload.isDefault;
      state.network = action.payload.network
    },
  },
});

export const { changeNetwork } = networksSlice.actions;
export default networksSlice.reducer;

// Selector to get the todos state
export const selectNetwork = (state: RootState) => state.network;
