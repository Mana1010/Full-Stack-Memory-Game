import { create } from "zustand";

interface ModalState {
  openSidebar: string;
}
const store = (set: any) => ({
  openSidebar: false,
  setOpenSidebar: () => {
    set((state: ModalState) => ({
      openSidebar: !state.openSidebar,
    }));
  },
});

export const useModalStore = create(store);
