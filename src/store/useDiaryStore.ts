import { create } from 'zustand';
import { DIARY_QUESTIONS } from '@/questions';
import { persist } from 'zustand/middleware';

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

type MemoStore = {
  [idx: number]: string;
  setMemo: (idx: number, memo: string) => void;
  getMemo: (idx: number) => string;
};

export const useMemoStore = create(
  persist<MemoStore>(
    (set, get) => ({
      setMemo: (idx: number, memo: string) => {
        set({ [idx]: memo });
      },
      getMemo: (idx: number) => {
        return get()[idx] || '';
      },
    }),
    {
      name: 'memos',
    }
  )
);
