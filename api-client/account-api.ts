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
  createAccount() {
    return axiosClient.post(`api/account/create`);
  },
  importAccount(privateKey : string) {
    let importAccountPayload = {
      "account_private_key": privateKey
    }
    return axiosClient.post(`api/account/add`, importAccountPayload);
  },
};
