// import { create } from "zustand";
// import axios from "axios";
// import { baseUrl } from "../baseUrl";

// export interface UserAuth {
//   username: string;
//   isOldUser: boolean;
//   _id: string;
// }
// interface AuthStore {
//   userAuthInfo: UserAuth | null;
//   authInfo: () => Promise<UserAuth>;
// }

// const store = (set: any) => ({
//   userAuthInfo: null,
//   authInfo: async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/auth/verify`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         withCredentials: true,
//       });
//       // localStorage.setItem(
//       //   "isOldUser",
//       //   JSON.stringify(response.data.message.isOldUser)
//       // );
//       return response.data.message;
//     } catch (err) {
//       console.log(err);
//     }
//   },
// });

// export const authStore = create<AuthStore>(store);
