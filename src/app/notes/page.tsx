'use client';

import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { WordList } from '@/components/notes/list/WordList';

export default function SpeakingDiary() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  if (!init)
    return (
      <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack height={'100%'} overflow={'auto'}>
      <WordList></WordList>
    </Stack>
  );
}
