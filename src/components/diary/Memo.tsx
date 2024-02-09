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

export function Memo() {
  const store = useDiaryStore();

  return (
    <form
      autoComplete={'off'}
      onSubmit={(e) => {
        e.preventDefault();
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
          value={store.getMemo()}
          label={'Memo'}
          multiline={true}
          rows={2}
          onChange={(e) => store.setMemo(e.target.value)}
        />
        <Stack direction={'row'} gap={1}>
          <Timer />
          <Button
            size={'medium'}
            variant={'outlined'}
            disabled={store.getMemo().length === 0}
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
