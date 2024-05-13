import axios from "axios";

export const getToken =
  typeof window !== "undefined" && localStorage.getItem("token");
export const axiosInterceptor = axios.create({
  baseURL: " http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  withCredentials: true,
});
