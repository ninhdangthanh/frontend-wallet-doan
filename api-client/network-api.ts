import { IAddNetwork } from "@/common";
import axiosClient from "./axios-client";

export const networkApi = {
  getNetworks() {
    return axiosClient.get("api/network");
  },
  deleteNetwork(network_id: number) {
    return axiosClient.delete(`api/network/remove/${network_id}`);
  },
  addNetwork(payload: IAddNetwork) {
    return axiosClient.post(`api/network/create`, payload);
  },
};
