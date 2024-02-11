import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Page {
  Diary = 'diary',
  Notes = 'notes',
}

type GlobalStore = {
  currentPage: string;
  setCurrentPage: (page: Page) => void;
  isQuestionListOpen: boolean;
  setIsQuestionListOpen: (isOpen: boolean) => void;
};

export const useGlobalStore = create(
  persist<GlobalStore>(
    (set) => ({
      currentPage: Page.Diary,
      setCurrentPage: (page: Page) => set({ currentPage: page }),
      isQuestionListOpen: false,
      setIsQuestionListOpen: (isOpen) => set({ isQuestionListOpen: isOpen }),
    }),
    {
      name: 'global-store',
      version: 1,
    }
  )
);
