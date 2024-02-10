import {
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { forwardRef } from 'react';
import { useNoteStore } from '@/store/useNoteStore';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

type ItemProps = {
  korean: string;
  english: string;
};

// eslint-disable-next-line react/display-name
export const Item = forwardRef(({ korean, english }: ItemProps, ref: any) => {
  const noteStore = useNoteStore();
  const isSaved = false;

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 0,
        py: 2,
        gap: 2,
      }}
      ref={ref}
    >
      <Stack
        sx={{
          flexGrow: 1,
        }}
        gap={1}
      >
        <Typography
          fontSize={16}
          sx={{
            display: 'block',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {korean}
        </Typography>
        <TextField
          fullWidth={true}
          size={'small'}
          value={english}
          onChange={(e) => noteStore.addEnglish(korean, e.target.value)}
          sx={{ '& input': { fontSize: 16 } }}
        />
      </Stack>
      {isSaved ? (
        <IconButton size={'large'} sx={{ p: 0 }}>
          <Bookmark fontSize={'inherit'} />
        </IconButton>
      ) : (
        <IconButton size={'large'} sx={{ p: 0 }}>
          <BookmarkBorder fontSize={'inherit'} />
        </IconButton>
      )}
    </ListItem>
  );
});
