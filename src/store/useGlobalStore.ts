import { create } from 'zustand';

type GlobalStore = {
  isQuestionListOpen: boolean;
  setIsQuestionListOpen: (isOpen: boolean) => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  isQuestionListOpen: false,
  setIsQuestionListOpen: (isOpen) => set({ isQuestionListOpen: isOpen }),
}));
