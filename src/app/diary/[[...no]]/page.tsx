'use client';

import { CircularProgress, Drawer, Stack, Typography } from '@mui/material';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [no]);

  if (!init)
    return (
      <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack height={'100%'} justifyContent={'space-between'}>
      <Stack my={2} gap={2}>
        <Timer />
        <Stack maxHeight={130} overflow={'auto'}>
          <Typography
            fontSize={20}
            fontWeight={600}
            sx={{
              lineHeight: 1.2,
            }}
          >
            {store.currentIdx}. {store.getQuestion()}
          </Typography>
        </Stack>

        <Memo />
      </Stack>
      <Stack gap={2}>
        <Navigation />
      </Stack>
      {/*<Drawer anchor={'bottom'} open={true}></Drawer>*/}
    </Stack>
  );
}
