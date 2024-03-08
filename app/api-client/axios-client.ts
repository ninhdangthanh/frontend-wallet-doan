import axios from "axios";
import { WALLET_SERVICE_API_URL } from "../common";

export const getAccessToken = () =>
  sessionStorage.getItem("access_token") || "";

const axiosClient = axios.create({
  baseURL: WALLET_SERVICE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Get access token
    const accessToken = getAccessToken();

    // If access token exists, add Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosClient;
