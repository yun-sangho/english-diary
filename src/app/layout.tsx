import type { Metadata } from 'next';
import theme from '@/app/theme';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactNode } from 'react';
import { TopBar } from '@/components/nav/TopBar';

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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                p: 0,
              }}
            >
              <TopBar />
              <Container
                fixed={true}
                sx={{
                  marginTop: 7,
                  height: 'calc(100vh - 56px)',
                  maxHeight: 1200,
                  overflowY: 'auto',
                }}
              >
                {children}
              </Container>
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
