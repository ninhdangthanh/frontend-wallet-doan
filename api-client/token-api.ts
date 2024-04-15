import { IForgotPasswordPayload, ILogInPayload, ISignUpPayload } from "../common";
// import ForgotPassword from "../forgot-password/page";
import axiosClient from "./axios-client";

export const tokenApi = {
  getTokenERC20s(accountId: any) {
    return axiosClient.get(`api/token/erc20/${accountId}`);
  },
  importTokenERC20(payload: ERC20Import) {
    return axiosClient.post(`api/token/erc20/import`, payload);
  },
  hideTokenERC20(tokenID: number, accountID: number) {
    return axiosClient.delete(`api/token/erc20/remove/${tokenID}/${accountID}`);
  },
};


export interface ERC20Import {
  account_id: string,
  token_address: string
}
