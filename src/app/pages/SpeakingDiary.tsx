'use client';

import { CircularProgress, Drawer, Stack, Typography } from '@mui/material';
import { Navigation } from '@/components/diary/Navigation';
import { Memo } from '@/components/diary/Memo';
import { useDiaryStore } from '@/store/useDiaryStore';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '@/store/useGlobalStore';
import { QuestionList } from '@/components/diary/list/QuestionList';

export function SpeakingDiary() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  const store = useDiaryStore();
  const globalStore = useGlobalStore();

  if (!init)
    return (
      <Stack height={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack>
      <Stack my={2} gap={1}>
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
      <Navigation />
      <Drawer
        anchor={'bottom'}
        open={globalStore.isQuestionListOpen}
        onClose={() => globalStore.setIsQuestionListOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            borderRadius: '24px 24px 0 0',
          },
        }}
      >
        <QuestionList />
      </Drawer>
    </Stack>
  );
}
