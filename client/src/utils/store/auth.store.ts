import { create } from "zustand";

interface AuthStore {
  profile: null;
}
const store = (set: any) => ({
  profile: null,
});

export const authStore = create<AuthStore>(store);
