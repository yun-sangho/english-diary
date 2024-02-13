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
  saveWords: string[];
  focusWord: string;
  setFocusWord: (word: string) => void;
  addWord: (word: string) => void;
  getAllWords: () => {
    korean: string;
    english: string;
    addAt: number;
    saved: boolean;
  }[];
  addEnglish: (word: string, english: string) => void;
  editWord: (target: string, word: string) => void;
  deleteWord: (word: string) => void;
  addSaveWord: (word: string) => void;
  removeSaveWord: (word: string) => void;
};

export const useNoteStore = create(
  persist<NoteStore>(
    (set, get) => {
      return {
        notes: {},
        saveWords: [],
        addSaveWord: (word) => {
          const saveWords = get().saveWords;
          if (!saveWords.includes(word)) {
            set({ saveWords: [...saveWords, word] });
          }
        },
        removeSaveWord: (word) => {
          const saveWords = get().saveWords;
          set({ saveWords: saveWords.filter((w) => w !== word) });
        },
        focusWord: '',
        setFocusWord: (word) => {
          set({ focusWord: word });
        },
        getAllWords: () => {
          return Object.entries(get().notes)
            .map(([key, value]) => ({
              korean: key,
              english: value.english,
              addAt: value.addAt,
              saved: get().saveWords.includes(key),
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
        addEnglish: (word: string, english: string) => {
          const notes = get().notes;
          notes[word] = {
            ...notes[word],
            english,
          };
          set({ notes });
        },
        editWord: (target, word) => {
          const notes = get().notes;
          const w = notes[target];
          delete notes[target];
          notes[word] = w;
          set({ notes });
        },
        deleteWord: (word) => {
          const notes = get().notes;
          delete notes[word];
          set({ notes });
        },
      };
    },
    {
      name: 'note-store',
      version: 1,
    }
  )
);
