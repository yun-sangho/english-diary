import { ListItem, TextField, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import { useNoteStore } from '@/store/useNoteStore';

type ItemProps = {
  korean: string;
  english: string;
};

// eslint-disable-next-line react/display-name
export const Item = forwardRef(({ korean, english }: ItemProps, ref: any) => {
  const noteStore = useNoteStore();

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 0,
        py: 1.5,
      }}
      ref={ref}
    >
      <Typography
        fontSize={16}
        sx={{
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {korean}
      </Typography>
      <TextField
        size={'small'}
        value={english}
        onChange={(e) => noteStore.addEnglish(korean, e.target.value)}
        sx={{
          flexGrow: 1,
          maxWidth: 200,
        }}
      />
    </ListItem>
  );
});
