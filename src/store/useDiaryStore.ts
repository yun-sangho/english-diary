import { create } from 'zustand';
import { DIARY_QUESTIONS } from '@/questions';
import { persist } from 'zustand/middleware';

type DiaryStore = {
  currentIdx: number;
  setCurrentIdx: (idx: any) => void;
  getQuestion: () => string;
  memos: Record<number, string>;
  setMemo: (memo: string) => void;
  getMemo: () => string;
};

export const useDiaryStore = create(
  persist<DiaryStore>(
    (set, get) => {
      return {
        currentIdx: 1,
        memos: {},
        setCurrentIdx: (idx) => {
          idx = idx === '' ? 1 : parseInt(idx);
          if (idx < 0 || idx >= DIARY_QUESTIONS.length) return;
          set({ currentIdx: idx });
        },
        getQuestion: () => DIARY_QUESTIONS[get().currentIdx - 1],
        setMemo: (memo: string) => {
          set({ memos: { ...get().memos, [get().currentIdx]: memo } });
        },
        getMemo: () => {
          return get().memos[get().currentIdx] || '';
        },
      };
    },
    {
      name: 'diary-store',
    }
  )
);
