import { profile } from "console";
import { create } from "zustand";

interface Profile {
  ign: string | null;
  gender: string | null;
  age: number | null;
}
interface ProfileState {
  profile: Profile;
}
interface ProfileStoreSchema {
  profile: Profile | null;
  setIgn: (value: string) => void;
  setGender: (value: string) => void;
  setAge: (value: number) => void;
}
const store = (set: any) => ({
  profile: {
    ign: null,
    gender: null,
    age: null,
  },
  setIgn: (value: string) => {
    set((state: ProfileState) => ({
      profile: {
        ...state.profile,
        ign: value,
      },
    }));
  },
  setGender: (value: string) => {
    set((state: ProfileState) => ({
      profile: {
        ...state.profile,
        gender: value,
      },
    }));
  },
  setAge: (value: number) => {
    set((state: ProfileState) => ({
      profile: {
        ...state.profile,
        age: value,
      },
    }));
  },
});

export const ProfileStore = create<ProfileStoreSchema>(store);
