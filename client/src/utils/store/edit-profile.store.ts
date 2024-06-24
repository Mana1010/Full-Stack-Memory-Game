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

const profile = [
  boy1,
  boy2,
  boy3,
  boy4,
  boy5,
  boy6,
  boy7,
  boy8,
  girl1,
  girl2,
  girl3,
  girl4,
  girl5,
  girl6,
  devil,
  vampire,
  frankestein,
];
interface EditProfileState {
  profileSelection: StaticImageData[];
  selectedProfile: StaticImageData | null;
  selectedPreviewCustomProfile: string | null;
  selectedCustomProfile: File | null;
}
interface EditProfileStoreSchema extends EditProfileState {
  setSelectedProfile: (data: StaticImageData | null) => void;
  setSelectedPreviewCustomProfile: (data: string | null) => void;
  setSelectedCustomProfile: (data: File | null) => void;
}
const store = (set: any) => ({
  profileSelection: profile,
  selectedProfile: null,
  selectedPreviewCustomProfile: null,
  selectedCustomProfile: null,
  setSelectedProfile: (data: StaticImageData | string | null) => {
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
