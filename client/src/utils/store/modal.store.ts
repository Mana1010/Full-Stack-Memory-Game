import { create } from "zustand";

interface ModalState {
  openSidebar: boolean;
  openAuthMenu: boolean;
  openDevSocial: boolean;
  openEditModal: boolean;
}

interface ModalStoreSchema extends ModalState {
  setOpenSidebar: () => void;
  setOpenAuthMenu: () => void;
  setOpenDevSocial: () => void;
  setOpenEditModal: () => void;
}
const store = (set: any) => ({
  openSidebar: false,
  openAuthMenu: true,
  openDevSocial: false,
  openEditModal: false,
  setOpenSidebar: () => {
    set((state: ModalState) => ({
      openSidebar: !state.openSidebar,
    }));
  },
  setOpenAuthMenu: () => {
    set((state: ModalState) => ({
      openAuthMenu: !state.openAuthMenu,
    }));
  },
  setOpenDevSocial: () => {
    set((state: ModalState) => ({
      openDevSocial: !state.openDevSocial,
    }));
  },
  setOpenEditModal: () => {
    set((state: ModalState) => ({
      openEditModal: !state.openEditModal,
    }));
  },
});

export const useModalStore = create<ModalStoreSchema>(store);
