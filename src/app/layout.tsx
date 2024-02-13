import type { Metadata } from 'next';
import theme from '@/app/theme';
import { Box, Container, CssBaseline, Fab, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactNode } from 'react';
import { TopBar } from '@/components/nav/TopBar';
import { ScrollTop } from '@/components/ScrollTop';
import { KeyboardArrowUp } from '@mui/icons-material';

export const metadata: Metadata = {
  title: "Austin's English Speaking Diary",
  description: 'A simple diary for practicing English speaking.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/android/android-launchericon-144-144.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
              maxWidth={'sm'}
              component={'main'}
              sx={{
                p: 0,
              }}
            >
              <Box id='back-to-top-anchor' />
              <TopBar />
              <Container
                fixed={true}
                sx={{
                  mt: 7,
                }}
              >
                {children}
              </Container>
            </Container>
            <ScrollTop>
              <Fab size={'small'}>
                <KeyboardArrowUp />
              </Fab>
            </ScrollTop>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
