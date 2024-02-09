'use client';

import { Stack, Typography } from '@mui/material';
import { Navigation } from '@/components/diary/Navigation';
import { Memo } from '@/components/diary/Memo';
import { useDiaryStore } from '@/store/useDiaryStore';

export default function SpeakingDiary() {
  const store = useDiaryStore();

  return (
    <Stack height={'100%'} justifyContent={'space-between'}>
      <Stack my={2} gap={2}>
        <Stack maxHeight={130} overflow={'auto'}>
          <Typography
            fontSize={18}
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
    </Stack>
  );
}
