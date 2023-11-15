import axios from "axios";
import { getCookie } from "./cookies";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("successLogin");
  if (token) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

export default axiosInstance;