import { IForgotPasswordPayload, ILogInPayload, ISignUpPayload } from "../common";
// import ForgotPassword from "../forgot-password/page";
import axiosClient from "./axios-client";

export const tokenApi = {
  getTokenERC20s(accountId: any) {
    return axiosClient.get(`api/token/erc20/${accountId}`);
  },
  importTokenERC20(payload: ERC20Import) {
    return axiosClient.patch(`api/token/erc20/import`, payload);
  },
};


export interface ERC20Import {
  account_id: string,
  token_address: string
}
