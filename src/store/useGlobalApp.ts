import { create } from "zustand";

export type GlobalAppState = {
  isDarkMode: boolean;
  openModal: string | boolean;
  loading: boolean;
  isCallBackUser: boolean;
  configApp: any;
  events: any;
};

export type GlobalAppActions = {
  toggleDarkMode: (val: boolean) => void;
  handleLoading: (val: boolean) => void;
  handleCallbackUser: () => void;
  handleSetConfig: (val: any) => void;
  handleSetEvents: (val: any) => void;
  handleToggleModal: (val: any) => void;
};

export const useGlobalAppStore = create<GlobalAppState & GlobalAppActions>(
  (set) => ({
    openModal: false,
    events: null,
    isDarkMode: false,
    isCallBackUser: false,
    loading: false,
    configApp: null,
    handleToggleModal: (val: boolean) => {
      set((state) => {
        state.openModal = val;
        return { ...state };
      });
    },
    handleSetConfig: (val: boolean) => {
      set((state) => {
        state.configApp = val;
        return { ...state };
      });
    },
    handleSetEvents: (val: boolean) => {
      set((state) => {
        state.events = val;
        return { ...state };
      });
    },
    handleLoading: (val: boolean) => {
      set((state) => {
        state.loading = val;
        return { ...state };
      });
    },
    handleCallbackUser: () => {
      set((state) => {
        state.isCallBackUser = !state.isCallBackUser;
        return { ...state };
      });
    },
    toggleDarkMode: (val: boolean) => {
      set((state) => {
        state.isDarkMode = val;
        return { ...state };
      });
    },
  })
);
