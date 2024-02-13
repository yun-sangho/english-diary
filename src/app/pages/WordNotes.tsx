'use client';

import { Chip, CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { WordList } from '@/components/notes/list/WordList';
import { useNoteStore } from '@/store/useNoteStore';

export function WordNotes() {
  const [init, setInit] = useState(false);
  const notesStore = useNoteStore();

  useEffect(() => {
    setInit(true);
  }, []);

  if (!init)
    return (
      <Stack height={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack
      sx={{
        pt: 2,
        pb: 3,
      }}
    >
      <Stack direction={'row'} gap={1}>
        <Chip
          label={`All ${notesStore.getAllWords().length}`}
          color={'primary'}
        />
        <Chip label={`Saved ${notesStore.saveWords.length}`} />
      </Stack>
      <WordList />
    </Stack>
  );
}
