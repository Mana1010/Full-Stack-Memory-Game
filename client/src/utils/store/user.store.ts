import axios from "axios";
import { create } from "zustand";

// interface Profile {
//   age: number;
//   ign: string;
//   gender: string;
// }

interface UserState {
  isAuthenticated: boolean;
}
interface UserSetState extends UserState {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
const store = (set: any) => ({
  isAuthenticated: true,
  setIsAuthenticated: async (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
});

export const useUserStore = create<UserSetState>(store);
