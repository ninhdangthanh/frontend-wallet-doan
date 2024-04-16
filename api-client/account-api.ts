import { IForgotPasswordPayload, ILogInPayload, ISignUpPayload } from "../common";
// import ForgotPassword from "../forgot-password/page";
import axiosClient from "./axios-client";

export const accountApi = {
  getAccounts() {
    return axiosClient.get("api/account");
  },
  changeAccountName(accountId : any, payload: any) {
    return axiosClient.patch(`api/account/change-name/${accountId}`, payload);
  },
  removeAccount(accountId : any) {
    return axiosClient.delete(`api/account/remove/${accountId}`);
  },
};
