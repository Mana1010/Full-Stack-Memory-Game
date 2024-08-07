import { create, StoreApi } from "zustand";

interface ModalState {
  openSidebar: boolean;
  openAuthMenu: boolean;
  openEditModal: boolean;
  openSelectProfile: boolean;
  openImagePreview: boolean;
  openImagePreviewPlayer: boolean;
  openGameMenu: boolean;
  openGameOverModal: boolean;
  openVictoryModal: boolean;
  openConfirmationRetryModal: boolean;
  openConfirmationQuitModal: boolean;
}

interface ModalActions {
  setOpenSidebar: () => void;
  setOpenAuthMenu: () => void;
  setOpenEditModal: () => void;
  setOpenSelectProfile: () => void;
  setOpenImagePreview: () => void;
  setOpenImagePreviewPlayer: () => void;
  setOpenGameMenu: () => void;
  setOpenGameOverModal: (value: boolean) => void;
  setOpenVictoryModal: (value: boolean) => void;
  setOpenConfirmationRetryModal: (value: boolean) => void;
  setOpenConfirmationQuitModal: (value: boolean) => void;
}

type ModalStore = ModalState & ModalActions;
const store = (set: StoreApi<ModalStore>["setState"]) => ({
  openSidebar: false,
  openAuthMenu: true,
  openEditModal: false,
  openSelectProfile: false,
  openImagePreview: false,
  openImagePreviewPlayer: false,
  openGameMenu: false,
  openGameOverModal: false,
  openVictoryModal: false,
  openConfirmationRetryModal: false,
  openConfirmationQuitModal: false,

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
  setOpenConfirmationRetryModal: (value: boolean) => {
    set({ openConfirmationRetryModal: value });
  },
  setOpenConfirmationQuitModal: (value: boolean) => {
    set({ openConfirmationQuitModal: value });
  },
});

export const useModalStore = create<ModalStore>(store);
