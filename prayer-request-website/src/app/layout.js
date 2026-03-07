import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import { Roboto, Lato } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { UserProvider } from '@/context/UserContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata = {
  title: 'Prayer Request App',
  description: 'A community platform for sharing and supporting prayer requests',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${lato.variable}`}>
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <UserProvider>
            <CssBaseline />
            <header>
            <Navbar />
            </header>
            {children}
            </UserProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
