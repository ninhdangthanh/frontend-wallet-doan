import axiosClient from "./axios-client";

export interface Activity {
  id?: number | null;
  tx_hash: string | null;
  from: string | null;
  to: string;
  amount: string;
  erc20_name?: string;
  erc20_symbol?: string;
  nonce?: number;
  status: "FAILED" | "PENDING" | "SUCCESS";
  account_id: number;
  user_id?: number;
  createdAt: any;
}

export const activityApi = {
  createActivity(body: Activity) {
    return axiosClient.post("api/activities", body);
  },
  getActivity(accountId: number) {
    return axiosClient.get(`api/activities/${accountId}`);
  },
};
