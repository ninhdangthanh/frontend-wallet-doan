import axiosClient from "./axios-client";

export const networkApi = {
  getNetworks() {
    return axiosClient.get("api/network");
  },
};
