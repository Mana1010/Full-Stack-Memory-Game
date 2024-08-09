import axios from "axios";

export const getToken =
  typeof window !== "undefined" && localStorage.getItem("token");
export const axiosInterceptor = axios.create({
  baseURL: "https://full-stack-memory-game.vercel.app/",
  // baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  withCredentials: true,
});
