import type { Metadata } from 'next';
import theme from '@/app/theme';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactNode } from 'react';
import { MenuBar } from '@/components/MenuBar';

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
                height: '100dvh',
                p: 0,
              }}
            >
              <MenuBar />
              <Container
                fixed={true}
                sx={{
                  height: '100%',
                  maxHeight: 1200,
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
