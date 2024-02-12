import {
  Box,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
} from '@mui/material';
import { DIARY_QUESTIONS } from '@/questions';
import { Item } from '@/components/diary/list/Item';
import { useDiaryStore } from '@/store/useDiaryStore';
import { useEffect, useRef } from 'react';
import { Close } from '@mui/icons-material';
import { useGlobalStore } from '@/store/useGlobalStore';

export function QuestionList() {
  const globalStore = useGlobalStore();
  const diaryStore = useDiaryStore();
  const memoCounts = Object.values(diaryStore.memos).filter(
    (memo) => !!memo
  ).length;

  const currentItemRef = useRef<any>();

  useEffect(() => {
    if (currentItemRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }
  }, []);

  return (
    <Stack
      sx={{
        pt: 3,
        gap: 2,
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          position: 'relative',
        }}
      >
        <Box />
        <Typography fontSize={20}>
          <Typography component={'span'} fontSize={'inherit'}>
            {memoCounts} /{' '}
          </Typography>
          {DIARY_QUESTIONS.length}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            right: 8,
          }}
        >
          <IconButton
            size={'small'}
            onClick={() => globalStore.setIsQuestionListOpen(false)}
          >
            <Close />
          </IconButton>
        </Box>
      </Stack>
      <List
        sx={{
          p: 0,
          maxHeight: 500,
          overflow: 'auto',
        }}
      >
        {DIARY_QUESTIONS.map((question, i) => {
          const questionIdx = i + 1;
          if (questionIdx === diaryStore.currentIdx) {
            return (
              <Box key={questionIdx}>
                <Item
                  idx={questionIdx}
                  question={question}
                  ref={currentItemRef}
                />
                <Divider component={'li'} />
              </Box>
            );
          }
          return (
            <Box key={questionIdx}>
              <Item idx={questionIdx} question={question} />
              <Divider component={'li'} />
            </Box>
          );
        })}
      </List>
    </Stack>
  );
}
