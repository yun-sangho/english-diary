import {
  Box,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { forwardRef, useEffect, useRef } from 'react';
import { useNoteStore } from '@/store/useNoteStore';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

type ItemProps = {
  korean: string;
  english: string;
  saved: boolean;
};

// eslint-disable-next-line react/display-name
export const Item = forwardRef(
  ({ korean, english, saved }: ItemProps, ref: any) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedKorean, setEditedKorean] = React.useState(korean);
    const [editedEnglish, setEditedEnglish] = React.useState(english);
    const editRef = useRef<any>();
    useEffect(() => {
      if (isEditing && editRef.current) {
        editRef.current.focus();
      }
    }, [isEditing]);

    const noteStore = useNoteStore();

    return (
      <>
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
            <Stack
              direction={'row'}
              alignItems={'center'}
              gap={1}
              sx={{
                pr: 0.5,
              }}
            >
              {isEditing ? (
                <TextField
                  inputRef={editRef}
                  size={'small'}
                  value={editedKorean}
                  fullWidth={true}
                  onChange={(e) => setEditedKorean(e.target.value)}
                  onBlur={() => {
                    noteStore.editWord(korean, editedKorean);
                    setIsEditing(false);
                  }}
                  variant={'standard'}
                  sx={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    '& input': {
                      p: 0,
                    },
                  }}
                />
              ) : (
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
              )}
              <Box
                sx={{
                  flexGrow: 1,
                }}
              />
              <Typography
                variant={'caption'}
                sx={{
                  textDecoration: 'underline',
                  textAlign: 'right',
                }}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Typography>
            </Stack>
            <Stack direction={'row'} gap={1}>
              <TextField
                fullWidth={true}
                size={'small'}
                value={editedEnglish}
                onChange={(e) => setEditedEnglish(e.target.value)}
                onBlur={() => {
                  noteStore.addEnglish(korean, editedEnglish);
                }}
                sx={{ '& input': { fontSize: 16 } }}
              />
              {saved ? (
                <IconButton
                  size={'large'}
                  sx={{ p: 0 }}
                  onClick={() => noteStore.removeSaveWord(korean)}
                >
                  <Bookmark fontSize={'inherit'} color={'primary'} />
                </IconButton>
              ) : (
                <IconButton
                  size={'large'}
                  sx={{ p: 0 }}
                  onClick={() => noteStore.addSaveWord(korean)}
                >
                  <BookmarkBorder fontSize={'inherit'} />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </ListItem>
      </>
    );
  }
);
