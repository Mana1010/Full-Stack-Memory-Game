// import axios from "axios";
// import { baseUrl } from "@/utils/baseUrl";
// export default async function checkUser() {
//   try {
//     const response = await axios.get(`${baseUrl}/user/verify`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       withCredentials: true,
//     });
//     console.log(response.data);
//     return response.data.message;
//   } catch (err: any) {
//     console.log(err);
//   }
// }
