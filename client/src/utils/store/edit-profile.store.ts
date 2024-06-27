import { create } from "zustand";
import boy1 from "../../components/images/images/boy1.png";
import boy2 from "../../components/images/images/boy2.png";
import boy3 from "../../components/images/images/boy3.png";
import boy4 from "../../components/images/images/boy4.png";
import boy5 from "../../components/images/images/boy5.png";
import boy6 from "../../components/images/images/boy6.png";
import boy7 from "../../components/images/images/boy7.png";
import boy8 from "../../components/images/images/boy8.png";
import girl1 from "../../components/images/images/girl1.png";
import girl2 from "../../components/images/images/girl2.png";
import girl3 from "../../components/images/images/girl3.png";
import girl4 from "../../components/images/images/girl4.png";
import girl5 from "../../components/images/images/girl5.png";
import girl6 from "../../components/images/images/girl6.png";
import devil from "../../components/images/images/devil.png";
import vampire from "../../components/images/images/vampire.png";
import frankestein from "../../components/images/images/frankenstein.png";
import { StaticImageData } from "next/image";

export interface Profiles {
  avatar: StaticImageData;
  name: string;
}
const profile = [
  {
    avatar: boy1,
    name: "boy1",
  },
  {
    avatar: boy2,
    name: "boy2",
  },
  {
    avatar: boy3,
    name: "boy3",
  },
  {
    avatar: boy4,
    name: "boy4",
  },
  {
    avatar: boy5,
    name: "boy5",
  },
  {
    avatar: boy6,
    name: "boy6",
  },
  {
    avatar: boy7,
    name: "boy7",
  },
  {
    avatar: boy8,
    name: "boy8",
  },
  {
    avatar: girl1,
    name: "girl1",
  },
  {
    avatar: girl2,
    name: "girl2",
  },
  {
    avatar: girl3,
    name: "girl3",
  },
  {
    avatar: girl4,
    name: "girl4",
  },
  {
    avatar: girl5,
    name: "girl5",
  },
  {
    avatar: girl6,
    name: "girl6",
  },
  {
    avatar: devil,
    name: "devil",
  },
  {
    avatar: vampire,
    name: "vampire",
  },
  {
    avatar: frankestein,
    name: "frankestein",
  },
];
interface EditProfileState {
  profileSelection: Profiles[]; //For Avatar Selection
  selectedProfile: Profiles | null; //For the provided Avatar only
  selectedPreviewCustomProfile: string | null; //For previewing or showing a custom profile no the ready made avatar only and it formats from FileReader
  selectedCustomProfile: File | null; //This is the one who is sent to the backend and it is File type
}
interface EditProfileStoreSchema extends EditProfileState {
  setSelectedProfile: (data: Profiles | null) => void;
  setSelectedPreviewCustomProfile: (data: string | null) => void;
  setSelectedCustomProfile: (data: File | null) => void;
}
const store = (set: any) => ({
  profileSelection: profile,
  selectedProfile: null,
  selectedPreviewCustomProfile: null,
  selectedCustomProfile: null,
  setSelectedProfile: (data: Profiles | null) => {
    set({ selectedProfile: data });
  },
  setSelectedPreviewCustomProfile: (data: string | null) => {
    set({ selectedPreviewCustomProfile: data });
  },
  setSelectedCustomProfile: (data: File | null) => {
    set({ selectedCustomProfile: data });
  },
});

export const useEditProfileStore = create<EditProfileStoreSchema>(store);
