import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NoteStore = {
  notes: Record<
    string,
    {
      english: string;
      addAt: number;
    }
  >;
  savedWords: string[];
  addWord: (word: string) => void;
  getAllWords: () => { korean: string; english: string; addAt: number }[];
};

export const useNoteStore = create(
  persist<NoteStore>(
    (set, get) => {
      return {
        notes: {},
        savedWords: [],
        getAllWords: () => {
          return Object.entries(get().notes)
            .map(([key, value]) => ({
              korean: key,
              english: value.english,
              addAt: value.addAt,
            }))
            .sort((a, b) => b.addAt - a.addAt);
        },
        addWord: (word: string) => {
          const notes = get().notes;
          notes[word] = {
            english: '',
            addAt: Date.now(),
          };
          set({ notes });
        },
      };
    },
    {
      name: 'note-store',
    }
  )
);
