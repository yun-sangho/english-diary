'use client';

import { AppBar, Toolbar } from '@mui/material';
import { Search } from '@/components/nav/Search';
import { AddNoteButton } from '@/components/nav/AddNoteButton';

export function TopBar() {
  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Search />
        <AddNoteButton />
      </Toolbar>
    </AppBar>
  );
}
