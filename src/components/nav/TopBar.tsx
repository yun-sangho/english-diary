'use client';

import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
} from '@mui/material';
import { Search } from '@/components/nav/Search';
import { ChevronLeft, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { Page, useGlobalStore } from '@/store/useGlobalStore';

export function TopBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const globalStore = useGlobalStore();

  return (
    <AppBar position='fixed'>
      <Toolbar
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu />
        </IconButton>
        <Search />
      </Toolbar>
      <Drawer
        sx={{
          width: 120,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 120,
            boxSizing: 'border-box',
          },
        }}
        anchor={'left'}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerHeader>
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ListItemButton
            onClick={() => {
              globalStore.setCurrentPage(Page.Diary);
              setIsDrawerOpen(false);
            }}
            selected={globalStore.currentPage === Page.Diary}
          >
            <ListItemText
              primary={'Diary'}
              sx={{
                textAlign: 'center',
              }}
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              globalStore.setCurrentPage(Page.Notes);
              setIsDrawerOpen(false);
            }}
            selected={globalStore.currentPage === Page.Notes}
          >
            <ListItemText
              primary={'Notes'}
              sx={{
                textAlign: 'center',
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
