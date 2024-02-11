import { Box, Divider, List } from '@mui/material';

import { useNoteStore } from '@/store/useNoteStore';
import { Item } from '@/components/notes/list/Item';
import { useEffect, useRef } from 'react';

export function WordList() {
  const notes = useNoteStore();
  const words = notes.getAllWords();
  const targetWord = notes.focusWord;

  const currentItemRef = useRef<any>();

  useEffect(() => {
    if (targetWord && currentItemRef.current) {
      currentItemRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });

      currentItemRef.current.style.backgroundColor = '#e3f2fd';

      const timeout = setTimeout(() => {
        currentItemRef.current.style.backgroundColor = 'white';
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [targetWord]);

  return (
    <List>
      {words.map((word, i) => {
        const ref = targetWord === word.korean ? currentItemRef : null;
        return (
          <Box key={i}>
            <Item korean={word.korean} english={word.english} ref={ref} />
            <Divider />
          </Box>
        );
      })}
    </List>
  );
}
