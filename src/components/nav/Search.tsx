'use client';

import {
  Autocomplete,
  Button,
  InputBase,
  Paper,
  Snackbar,
  SnackbarContent,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useNoteStore } from '@/store/useNoteStore';
import { useEffect, useState } from 'react';
import { Page, useGlobalStore } from '@/store/useGlobalStore';

const NO_WORDS = 'NO_WORDS';

export function Search() {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const [textInput, setTextInput] = useState('');

  const globalStore = useGlobalStore();
  const noteStore = useNoteStore();

  const options = noteStore.getAllWords().map((word) => ({
    korean: word.korean,
    english: word.english,
    id: word.korean,
  }));

  useEffect(() => {
    if (snackBarMessage === '') return;
    setShowSnackBar(true);
  }, [snackBarMessage]);

  return (
    <>
      <Autocomplete
        value={null}
        blurOnSelect={true}
        inputValue={textInput}
        sx={{
          flexGrow: 1,
          maxWidth: 400,
        }}
        renderOption={(props, option) => {
          if (option.id === NO_WORDS) {
            return (
              <li
                {...props}
                key={props.id}
                onClick={(event) => {
                  props.onClick!(event);
                  noteStore.addWord(textInput);
                  setSnackBarMessage(textInput);
                  setTextInput('');
                }}
              >
                <Button fullWidth={true} size={'small'} variant={'outlined'}>
                  <Typography>ADD</Typography>
                </Button>
              </li>
            );
          }

          return (
            <li
              {...props}
              key={props.id}
              onClick={(e) => {
                props.onClick!(e);
                noteStore.setFocusWord(option.korean);
                globalStore.setCurrentPage(Page.Notes);
              }}
            >
              <Stack
                direction={'row'}
                gap={1}
                alignItems={'center'}
                width={'100%'}
              >
                {noteStore.saveWords.includes(option.korean) && (
                  <Typography>🔥</Typography>
                )}
                <Typography
                  sx={{
                    flexShrink: 1,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflowX: 'hidden',
                  }}
                >
                  {option.korean}
                </Typography>
                <Typography
                  fontSize={15}
                  color={'grey.600'}
                  sx={{
                    flexShrink: 0.5,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflowX: 'hidden',
                  }}
                >
                  {option.english}
                </Typography>
              </Stack>
            </li>
          );
        }}
        filterOptions={(options, state) => {
          const input = state.inputValue.toLowerCase();
          if (input === '') return options;

          const result = options.filter(
            (option) =>
              option.korean.toLowerCase().includes(input) ||
              option.english.toLowerCase().includes(input)
          );

          const exactMatch = result.find(
            (option) => option.korean.toLowerCase() === input
          );
          if (exactMatch) return result;

          return [...result, { korean: NO_WORDS, english: '', id: NO_WORDS }];
        }}
        getOptionLabel={(option) => option.korean}
        options={options}
        renderInput={(params) => (
          <StyledInput
            onChange={(e) => setTextInput(e.target.value)}
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            placeholder={'🔎 Search Words'}
          />
        )}
        PaperComponent={StyledPaper}
      />
      <Snackbar
        open={showSnackBar}
        onClose={() => setShowSnackBar(false)}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          bottom: globalStore.currentPage === Page.Notes ? 8 : 64,
        }}
      >
        <SnackbarContent
          message={`"🎉${snackBarMessage}" added!`}
          action={
            <Button
              onClick={() => {
                noteStore.setFocusWord(snackBarMessage);
                globalStore.setCurrentPage(Page.Notes);
                setShowSnackBar(false);
              }}
            >
              Move
            </Button>
          }
        />
      </Snackbar>
    </>
  );
}

const StyledPaper = styled(Paper)(() => ({
  '.MuiAutocomplete-listbox': {
    padding: 1,
    maxHeight: 150,
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  height: '100%',
  '& input': {
    paddingLeft: 8,
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
      borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
    },
  },
}));
