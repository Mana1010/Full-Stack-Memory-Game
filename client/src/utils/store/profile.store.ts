import { create } from "zustand";

//This store is for the step profile verification.
interface ProfileState {
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
}
interface ProfileStoreSchema extends ProfileState {
  currentStep: string;
  setIgn: (value: string) => void;
  setGender: (value: string) => void;
  setAge: (value: number[]) => void;
  setGenderIsDone: (isDone: boolean) => void;
  setAgeIsDone: (isDone: boolean) => void;
  setIgnIsDone: (isDone: boolean) => void;
  setCurrentStep: (value: string) => void;
}
const store = (set: any) => ({
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
  currentStep: "gender",
  setIgn: (value: string) => {
    set((state: ProfileState) => ({
      ign: {
        ...state.ign,
        value,
      },
    }));
  },
  setGender: (value: string) => {
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
  setCurrentStep: (value: string) => {
    set({ currentStep: value });
  },
});

export const ProfileStore = create<ProfileStoreSchema>(store);
