'use client';

import { AppBar, ButtonGroup, IconButton } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDiaryStore } from '@/store/useDiaryStore';
import { DIARY_QUESTIONS } from '@/questions';
import { useGlobalStore } from '@/store/useGlobalStore';

export function Navigation() {
  const globalStore = useGlobalStore();
  const store = useDiaryStore();

  return (
    <AppBar
      position={'fixed'}
      color={'transparent'}
      sx={{
        top: 'auto',
        bottom: 0,
      }}
    >
      <ButtonGroup>
        <IconButton
          size={'small'}
          sx={{ width: '30%' }}
          onClick={() => store.setCurrentIdx(store.currentIdx - 1)}
          disabled={store.currentIdx === 1}
        >
          <ArrowBackIosIcon fontSize='inherit' />
        </IconButton>
        <IconButton
          size={'large'}
          sx={{ width: '40%' }}
          onClick={() => globalStore.setIsQuestionListOpen(true)}
        >
          <FormatListBulletedIcon fontSize='inherit' />
        </IconButton>
        <IconButton
          size={'small'}
          sx={{ width: '30%' }}
          onClick={() => store.setCurrentIdx(store.currentIdx + 1)}
          disabled={store.currentIdx === DIARY_QUESTIONS.length}
        >
          <ArrowForwardIos fontSize='inherit' />
        </IconButton>
      </ButtonGroup>
    </AppBar>
  );
}
