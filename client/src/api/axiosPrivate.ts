import axios from "axios";

export const getToken =
  typeof window !== "undefined" && localStorage.getItem("token");
export const axiosInterceptor = axios.create({
  baseURL: "https://full-stack-memory-game.vercel.app/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  withCredentials: true,
});
