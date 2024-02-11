'use client';

import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDiaryStore } from '@/store/useDiaryStore';
import { Timer } from '@/components/diary/Timer';
import { useEffect, useState } from 'react';

export function Memo() {
  const [memo, setMemo] = useState('');
  const store = useDiaryStore();

  useEffect(() => {
    setMemo(store.getMemo());
  }, [store]);

  return (
    <form
      autoComplete={'off'}
      onSubmit={(e) => {
        e.preventDefault();
        store.setMemo(memo);
        store.setCurrentIdx(store.currentIdx + 1);
      }}
    >
      <FormControl
        fullWidth={true}
        sx={{
          gap: 1,
        }}
      >
        <TextField
          value={memo}
          label={'Memo'}
          multiline={true}
          rows={2}
          onChange={(e) => setMemo(e.target.value)}
        />
        <Stack direction={'row'} gap={1}>
          <Timer />
          <Button
            size={'medium'}
            variant={'outlined'}
            disabled={memo === store.getMemo()}
            type={'submit'}
            fullWidth={true}
          >
            <Typography>Submit</Typography>
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
}
