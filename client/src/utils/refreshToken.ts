import axios from "axios";
import { baseUrl } from "./baseUrl";
async function refreshToken() {
  try {
    const response = await axios.get(`${baseUrl}/auth/refreshToken`, {
      withCredentials: true,
    });
    return response.data.token;
  } catch (err) {
    console.log(err);
  }
}

export default refreshToken;
