import { Box, Divider, List, Stack } from '@mui/material';

import { useNoteStore } from '@/store/useNoteStore';
import { Item } from '@/components/notes/list/Item';

export function WordList() {
  const notes = useNoteStore();
  const words = notes.getAllWords();

  return (
    <Stack
      sx={{
        height: '100%',
      }}
    >
      <List
        sx={{
          overflow: 'auto',
          height: '100%',
        }}
      >
        {words.map((word, i) => (
          <Box key={i}>
            <Item korean={word.korean} english={word.english} />
            <Divider />
          </Box>
        ))}
      </List>
    </Stack>
  );
}
