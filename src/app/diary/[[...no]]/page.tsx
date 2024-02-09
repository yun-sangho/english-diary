'use client';

import { CircularProgress, Stack, Typography } from '@mui/material';
import { Timer } from '@/components/diary/Timer';
import { Navigation } from '@/components/diary/Navigation';
import { Memo } from '@/components/diary/Memo';
import { useDiaryStore } from '@/store/useDiaryStore';
import { useEffect, useState } from 'react';

export default function SpeakingDiary({
  params: { no },
}: {
  params: { no: string };
}) {
  const [init, setInit] = useState(false);

  const store = useDiaryStore();

  useEffect(() => {
    store.setCurrentIdx(no);
    setInit(true);
  }, [no]);

  if (!init)
    return (
      <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack height={'100%'} justifyContent={'space-between'}>
      <Stack my={4} gap={1}>
        <Stack height={130} overflow={'auto'}>
          <Typography variant={'h5'} fontWeight={700}>
            {store.currentIdx}. {store.getQuestion()}
          </Typography>
        </Stack>
        <Timer />
        <Memo />
      </Stack>
      <Stack gap={2}>
        <Navigation />
      </Stack>
    </Stack>
  );
}
