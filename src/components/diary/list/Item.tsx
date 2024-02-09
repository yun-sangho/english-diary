import { ListItem, Typography } from '@mui/material';
import { useGlobalStore } from '@/store/useGlobalStore';
import { useDiaryStore } from '@/store/useDiaryStore';
import React, { forwardRef } from 'react';

type ItemProps = {
  idx: number;
  question: string;
};

// eslint-disable-next-line react/display-name
export const Item = forwardRef(({ idx, question }: ItemProps, ref: any) => {
  const globalStore = useGlobalStore();
  const diaryStore = useDiaryStore();

  const hasMemo = !!diaryStore.memos[idx];

  return (
    <ListItem
      onClick={() => {
        diaryStore.setCurrentIdx(idx);
        globalStore.setIsQuestionListOpen(false);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        height: 52,
        px: 2,
      }}
      ref={ref}
    >
      {hasMemo && <Typography fontSize={18}>✅</Typography>}
      {diaryStore.currentIdx === idx && (
        <Typography fontSize={18}>👉</Typography>
      )}
      <Typography
        fontSize={16}
        sx={{
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {idx}. {question}
      </Typography>
    </ListItem>
  );
});
