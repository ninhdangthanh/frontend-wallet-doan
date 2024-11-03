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
  updateActivity(act_id: number, body: Activity) {
    return axiosClient.put(`api/activities/${act_id}`, body);
  },
  getActivity({ accountId, status = "", type = "", page = 1, pageSize = 10 }: GetActivityParams) {
    const params = {
        status: status || undefined,
        type: type || undefined,
        page,
        pageSize,
    };

    return axiosClient.get(`api/activities/account/${accountId}/activities`, {
        params, // Attach the params to the request
    });
  },
};

export interface GetActivityParams {
  accountId: number;
  status?: string;
  type?: string;
  page?: number;
  pageSize?: number;
}
