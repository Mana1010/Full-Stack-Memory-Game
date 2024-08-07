import { create, StoreApi } from "zustand";

//This store is for the step profile verification.
export interface ProfileState {
  gender: {
    value: string | null;
    isDone: boolean;
  };
  age: {
    value: number[];
    isDone: boolean;
  };
  ign: {
    value: string | null;
    isDone: boolean;
  };
  profilePic: string | null;
}
interface ProfileActions {
  currentStep: string;
  setIgn: (value: string | null) => void;
  setGender: (value: string | null) => void;
  setAge: (value: number[]) => void;
  setGenderIsDone: (isDone: boolean) => void;
  setAgeIsDone: (isDone: boolean) => void;
  setIgnIsDone: (isDone: boolean) => void;
  setProfilePic: (value: string | null) => void;
  setCurrentStep: (value: string) => void;
}
type ProfileStore = ProfileState & ProfileActions;
const store = (set: StoreApi<ProfileStore>["setState"]) => ({
  gender: {
    value: null,
    isDone: false,
  },
  age: {
    value: [1],
    isDone: false,
  },
  ign: {
    value: null,
    isDone: false,
  },
  profilePic: null,
  currentStep: "gender",
  setIgn: (value: string | null) => {
    set((state: ProfileState) => ({
      ign: {
        ...state.ign,
        value,
      },
    }));
  },
  setGender: (value: string | null) => {
    set((state: ProfileState) => ({
      gender: {
        ...state.gender,
        value,
      },
    }));
  },
  setAge: (value: number[]) => {
    set((state: ProfileState) => ({
      age: {
        ...state.age,
        value: value,
      },
    }));
  },
  setGenderIsDone: (isDone: boolean) => {
    set((state: ProfileState) => ({
      gender: {
        ...state.gender,
        isDone,
      },
    }));
  },
  setAgeIsDone: (isDone: boolean) => {
    set((state: ProfileState) => ({
      age: {
        ...state.age,
        isDone,
      },
    }));
  },
  setIgnIsDone: (isDone: boolean) => {
    set((state: ProfileState) => ({
      ign: {
        ...state.ign,
        isDone,
      },
    }));
  },
  setProfilePic: (value: string | null) => {
    set({ profilePic: value });
  },
  setCurrentStep: (value: string) => {
    set({ currentStep: value });
  },
});

export const useProfileStore = create<ProfileStore>(store);
