import { IForgotPasswordPayload, ILogInPayload, ISignUpPayload } from "../common";
import axiosClient from "./axios-client";

export const authApi = {
  logIn(payload: ILogInPayload) {
    return axiosClient.post("api/auth/login", payload);
  },
  signUp(payload: ISignUpPayload) {
    return axiosClient.post("api/auth/signup", payload);
  },
  forgotPassword(payload: IForgotPasswordPayload) {
    return axiosClient.post("api/auth/forgot-password", payload);
  },
  changePassword(newPassword: string) {
    let changePasswordPayload = {
      "newPassword": newPassword
    }
    return axiosClient.post("api/auth/change-password", changePasswordPayload);
  },
};
