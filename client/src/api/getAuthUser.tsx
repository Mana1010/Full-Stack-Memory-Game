import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";

export async function getAuthUser() {
  try {
    const response = await axios.get(`${baseUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.data.message;
  } catch (err) {
    console.log(err);
  }
}
