import {
  Box,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
} from '@mui/material';

import { useNoteStore } from '@/store/useNoteStore';

export function WordList() {
  const notes = useNoteStore();

  return (
    <Stack>
      <Typography variant='h4'>Words</Typography>
      <List></List>
    </Stack>
  );
}
