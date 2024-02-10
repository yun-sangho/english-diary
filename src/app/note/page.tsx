'use client';

import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNoteStore } from '@/store/useNoteStore';

export default function SpeakingDiary() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  const store = useNoteStore();

  if (!init)
    return (
      <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack height={'100%'} overflow={'auto'}>
      <Stack my={2} gap={2}>
        Notes
      </Stack>
    </Stack>
  );
}
