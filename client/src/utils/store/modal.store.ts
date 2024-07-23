import { create, StoreApi } from "zustand";

interface ModalState {
  openSidebar: boolean;
  openAuthMenu: boolean;
  openDevSocial: boolean;
  openEditModal: boolean;
  openSelectProfile: boolean;
  openImagePreview: boolean;
  openImagePreviewPlayer: boolean;
  openGameMenu: boolean;
  openGameOverModal: boolean;
  openVictoryModal: boolean;
}

interface ModalActions {
  setOpenSidebar: () => void;
  setOpenAuthMenu: () => void;
  setOpenDevSocial: () => void;
  setOpenEditModal: () => void;
  setOpenSelectProfile: () => void;
  setOpenImagePreview: () => void;
  setOpenImagePreviewPlayer: () => void;
  setOpenGameMenu: () => void;
  setOpenGameOverModal: (value: boolean) => void;
  setOpenVictoryModal: (value: boolean) => void;
}

type ModalStore = ModalState & ModalActions;
const store = (set: StoreApi<ModalStore>["setState"]) => ({
  openSidebar: false,
  openAuthMenu: true,
  openDevSocial: false,
  openEditModal: false,
  openSelectProfile: false,
  openImagePreview: false,
  openImagePreviewPlayer: false,
  openGameMenu: false,
  openGameOverModal: false,
  openVictoryModal: false,

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
  setOpenGameMenu: () => {
    set((state: ModalState) => ({
      openGameMenu: !state.openGameMenu,
    }));
  },
  setOpenGameOverModal: (value: boolean) => {
    set({ openGameOverModal: value });
  },
  setOpenVictoryModal: (value: boolean) => {
    set({ openVictoryModal: value });
  },
});

export const useModalStore = create<ModalStore>(store);
