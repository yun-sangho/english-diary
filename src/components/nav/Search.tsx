'use client';

import {
  Autocomplete,
  Button,
  InputBase,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useNoteStore } from '@/store/useNoteStore';
import { useState } from 'react';

const NO_WORDS = 'NO_WORDS';

export function Search() {
  const [textInput, setTextInput] = useState('');
  const noteStore = useNoteStore();

  const options = noteStore.getAllWords().map((word) => ({
    korean: word.korean,
    english: word.english,
    id: word.korean,
  }));

  return (
    <Autocomplete
      value={null}
      inputValue={textInput}
      sx={{
        flexGrow: 1,
        maxWidth: 400,
      }}
      renderOption={(props, option) => {
        const { children, ...rest } = props;
        if (option.id === NO_WORDS) {
          return (
            <li
              {...rest}
              key={props.id}
              onClick={(event) => {
                event.preventDefault();
                noteStore.addWord(textInput);
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
          <li {...rest} key={props.id}>
            <Stack direction={'row'} gap={1}>
              {noteStore.savedWords.includes(option.korean) && (
                <Typography>🔥</Typography>
              )}
              <Typography>{option.korean}</Typography>
              <Typography variant={'caption'}>{option.english}</Typography>
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

        if (!result.length)
          return [{ korean: NO_WORDS, english: '', id: NO_WORDS }];

        return result;
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