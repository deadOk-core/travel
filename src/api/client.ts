import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
console.log("ENV:", import.meta.env);

export default api;
