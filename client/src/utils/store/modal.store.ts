import { create } from "zustand";

interface ModalState {
  openSidebar: boolean;
  openAuthMenu: boolean;
  openDevSocial: boolean;
  openEditModal: boolean;
  openSelectProfile: boolean;
  openImagePreview: boolean;
  openImagePreviewPlayer: boolean;
}

interface ModalStoreSchema extends ModalState {
  setOpenSidebar: () => void;
  setOpenAuthMenu: () => void;
  setOpenDevSocial: () => void;
  setOpenEditModal: () => void;
  setOpenSelectProfile: () => void;
  setOpenImagePreview: () => void;
  setOpenImagePreviewPlayer: () => void;
}
const store = (set: any) => ({
  openSidebar: false,
  openAuthMenu: true,
  openDevSocial: false,
  openEditModal: false,
  openSelectProfile: false,
  openImagePreview: false,
  openImagePreviewPlayer: false,

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
  setOpenSelectProfile: () => {
    set((state: ModalState) => ({
      openSelectProfile: !state.openSelectProfile,
    }));
  },
  setOpenImagePreview: () => {
    set((state: ModalState) => ({
      openImagePreview: !state.openImagePreview,
    }));
  },
  setOpenImagePreviewPlayer: () => {
    set((state: ModalState) => ({
      openImagePreviewPlayer: !state.openImagePreviewPlayer,
    }));
  },
});

export const useModalStore = create<ModalStoreSchema>(store);
