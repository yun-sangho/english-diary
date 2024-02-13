import { Box, Chip, Divider, List, Stack } from '@mui/material';

import { NotesFilter, useNoteStore } from '@/store/useNoteStore';
import { Item } from '@/components/notes/list/Item';
import { useEffect, useRef } from 'react';

export function WordList() {
  const noteStore = useNoteStore();
  const words = noteStore.getAllWords();

  const targetWord = noteStore.focusWord;

  const currentItemRef = useRef<any>();

  useEffect(() => {
    if (targetWord && currentItemRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });

      currentItemRef.current.style.backgroundColor = '#e3f2fd';

      const timeout = setTimeout(() => {
        currentItemRef.current.style.backgroundColor = 'white';
        noteStore.setFocusWord('');
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetWord]);

  const filteredWords = words.filter((word) => {
    if (noteStore.filter === NotesFilter.All) return true;
    if (noteStore.filter === NotesFilter.Saved) return word.saved;
    if (noteStore.filter === NotesFilter.Unsaved) return !word.saved;
    return true;
  });

  return (
    <>
      <Stack direction={'row'} gap={1}>
        <Chip
          label={`All ${noteStore.getAllWords().length}`}
          color={noteStore.filter === NotesFilter.All ? 'primary' : 'default'}
          variant={noteStore.filter === NotesFilter.All ? 'filled' : 'outlined'}
          onClick={() => noteStore.setFilter(NotesFilter.All)}
        />
        <Chip
          label={`Saved ${noteStore.saveWords.length}`}
          color={noteStore.filter === NotesFilter.Saved ? 'primary' : 'default'}
          variant={
            noteStore.filter === NotesFilter.Saved ? 'filled' : 'outlined'
          }
          onClick={() => noteStore.setFilter(NotesFilter.Saved)}
        />
      </Stack>
      <List>
        {filteredWords.map((word, i) => {
          const ref = targetWord === word.korean ? currentItemRef : null;
          return (
            <Box key={i}>
              <Item
                korean={word.korean}
                english={word.english}
                ref={ref}
                saved={word.saved}
              />
              <Divider />
            </Box>
          );
        })}
      </List>
    </>
  );
}
