import { IForgotPasswordPayload, ILogInPayload, ISignUpPayload } from "../common";
import ForgotPassword from "../forgot-password/page";
import axiosClient from "./axios-client";

export const accountApi = {
  getAccounts() {
    return axiosClient.get("api/account");
  },
};
