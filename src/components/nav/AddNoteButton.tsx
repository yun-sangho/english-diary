'use client';

import { Button, Drawer, IconButton, Stack, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

export function AddNoteButton() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <IconButton
        color={'inherit'}
        onClick={() => setIsOpened(true)}
        sx={{
          p: 0,
        }}
      >
        <Add />
      </IconButton>
      <Drawer
        anchor={'bottom'}
        open={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <AddNoteForm />
      </Drawer>
    </>
  );
}

function AddNoteForm() {
  const [value, setValue] = useState('');

  return (
    <Stack direction={'row'} p={1}>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} />
      <Button>Add</Button>
    </Stack>
  );
}
