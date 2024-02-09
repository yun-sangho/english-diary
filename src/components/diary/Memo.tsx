'use client';

import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDiaryStore } from '@/store/useDiaryStore';

export function Memo() {
  const router = useRouter();
  const [memo, setMemo] = useState('' as string);
  const store = useDiaryStore();

  return (
    <form
      autoComplete={'off'}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/diary/${store.currentIdx + 1}`);
      }}
    >
      <FormControl
        fullWidth={true}
        sx={{
          gap: 2,
        }}
      >
        <TextField
          label={'Your response'}
          multiline={true}
          rows={6}
          onChange={(e) => setMemo(e.target.value)}
        />
        <Button
          size={'medium'}
          variant={'outlined'}
          disabled={memo.length === 0}
          type={'submit'}
        >
          <Typography>Submit</Typography>
        </Button>
      </FormControl>
    </form>
  );
}
