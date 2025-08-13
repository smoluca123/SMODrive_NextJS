import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/header';
import ReactQueryProvider from '@/components/react-query-provider';
import AuthProvider from '@/components/auth-provider';
import { cookies } from 'next/headers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Share Earn',
    default: 'Share Earn',
  },
  description: 'Share Earn by SMOTeam',
  keywords: [
    'Share Earn',
    'file sharing',
    'earn money online',
    'upload files',
    'download files',
    'SMOTeam',
    'cloud storage',
    'monetize files',
    'file hosting',
    'passive income',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    tags: 'Share Earn, file sharing, earn money, upload, download, monetize, cloud storage, SMOTeam, file hosting, passive income',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const userId = cookieStore.get('userId');

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <AuthProvider accessToken={accessToken?.value || ''} userId={userId?.value || ''}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange={true}
            >
              <Header />
              {children}
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
