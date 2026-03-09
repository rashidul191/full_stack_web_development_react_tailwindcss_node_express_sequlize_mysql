import axios from "axios";
import { URL } from "../config/app";

const api = axios.create({
  baseURL: URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
