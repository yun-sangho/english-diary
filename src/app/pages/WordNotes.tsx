'use client';

import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { WordList } from '@/components/notes/list/WordList';

export function WordNotes() {
  const [init, setInit] = useState(false);

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
    <Stack>
      <WordList />
    </Stack>
  );
}
