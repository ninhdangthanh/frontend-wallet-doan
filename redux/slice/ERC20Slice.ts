// src/store/todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ERC20Token {
  id: number,
  account_id: number,
  balance: any
  contract_address: string,
  decimal: number,
  name: string,
  symbol: string,
}

interface TokenState {
  tokens: ERC20Token[];
}


const initialState: TokenState = {
  tokens: [],
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<ERC20Token>) => {
      state.tokens.push(action.payload);
    },
    addManyTokens: (state, action: PayloadAction<ERC20Token[]>) => {
      state.tokens = [...action.payload];
    },
    removeToken: (state, action: PayloadAction<number>) => {
      state.tokens = state.tokens.filter(token => token.id !== action.payload);
    },
    updateTokenBalance: (state, action: PayloadAction<{ id: number; balance: any }>) => {
      const token = state.tokens.find(token => token.id === action.payload.id);
      if (token) {
        token.balance = action.payload.balance;
      }
    },
  },
});

export const {
  addToken,
  addManyTokens,
  removeToken,
  updateTokenBalance,
} = tokensSlice.actions;

export default tokensSlice.reducer;

// Selectors
export const selectTokens = (state: RootState) => state.tokens;