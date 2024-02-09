'use client';

import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDiaryStore, useMemoStore } from '@/store/useDiaryStore';

export function Memo() {
  const router = useRouter();
  const store = useDiaryStore();
  const memoStore = useMemoStore();

  const memo = memoStore.getMemo(store.currentIdx);

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
          gap: 1,
        }}
      >
        <TextField
          value={memo}
          label={'Memo'}
          multiline={true}
          rows={2}
          onChange={(e) => memoStore.setMemo(store.currentIdx, e.target.value)}
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
