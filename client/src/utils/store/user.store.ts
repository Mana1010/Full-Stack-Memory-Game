import axios from "axios";
import { create, StoreApi } from "zustand";

interface UserState {
  isAuthenticated: boolean;
}
interface UserActions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
type UserStore = UserState & UserActions;
const store = (set: StoreApi<UserStore>["setState"]) => ({
  isAuthenticated: true,
  setIsAuthenticated: async (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
});

export const useUserStore = create<UserStore>(store);
