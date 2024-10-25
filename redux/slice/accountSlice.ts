// src/store/todosSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Account {
  id: string,
  name: string,
  address: string,
  user_id: number,
  index_acc: number,
  privateKey: string,
  balance: any
}

interface AccountState {
  accounts: Account[];
  selectedAccount: Account;
}

const defaultAccount : Account = {
  id: "0",
  name: "Account 1",
  address: "0xrfe4...234dw",
  user_id: 0,
  index_acc: 0,
  privateKey: "privateKey",
  balance: "0.0"
}

const initialState: AccountState = {
  accounts: [],
  selectedAccount: defaultAccount
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    changeAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload;
    },
    changeSelectedAccountName: (state, action: PayloadAction<string>) => {
      state.selectedAccount.name = action.payload;
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    addManyAccount: (state, action: PayloadAction<Account[]>) => {
      state.accounts = [...action.payload];
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(account => account.id !== action.payload);
    },

    // toggleTodo: (state, action: PayloadAction<number>) => {
    //   const todo = state.todos.find((t) => t.id === action.payload);
    //   if (todo) {
    //     todo.completed = !todo.completed;
    //   }
    // },
    // deleteTodo: (state, action: PayloadAction<number>) => {
    //   state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    // },
    // setTodos: (state, action: PayloadAction<Todo[]>) => {
    //   state.todos = action.payload;
    // },
  },
});

export const { changeAccount, changeSelectedAccountName, addAccount, addManyAccount, removeAccount } = accountsSlice.actions;
export default accountsSlice.reducer;

// Selector to get the todos state
export const selectAccounts = (state: RootState) => state.account.accounts;
export const selectedAccount = (state: RootState) => state.account.selectedAccount;
export const getPrivateKey = (state: RootState) => state.account.selectedAccount.privateKey;
