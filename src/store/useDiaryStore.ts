import { create } from 'zustand';
import { DIARY_QUESTIONS } from '@/questions';

type DiaryStore = {
  currentIdx: number;
  setCurrentIdx: (idx: any) => void;
  getQuestion: () => string;
};

export const useDiaryStore = create<DiaryStore>((set, get) => {
  return {
    currentIdx: 1,
    setCurrentIdx: (idx) => {
      idx = idx === '' ? 1 : parseInt(idx);
      if (idx < 0 || idx >= DIARY_QUESTIONS.length) return;
      set({ currentIdx: idx });
    },
    getQuestion: () => DIARY_QUESTIONS[get().currentIdx - 1],
  };
});
