import { create, StoreApi } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
}
interface UserActions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserId: (userId: string | null) => void;
}
type UserStore = UserState & UserActions;
const store = (set: StoreApi<UserStore>["setState"]) => ({
  isAuthenticated: true,
  userId: null,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated });
  },
  setUserId: (userId: string | null) => {
    set({ userId });
  },
});

export const useUserStore = create<UserStore>(store);
