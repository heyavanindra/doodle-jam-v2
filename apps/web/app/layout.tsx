import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { ViewTransitions } from 'next-view-transitions';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/utils/query/query-provider';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Doodle Jam — Realtime Collaborative Canvas & Drawing',
  description:
    'An infinite collaborative canvas powered by WebSockets and CRDTs. Sketch architecture diagrams, wireframes, and ideas together with sub-15ms sync.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
        <body
          className={`${inter.className} ${geistMono.variable} ${inter.variable} min-h-screen antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              {children}
              <Toaster position="bottom-right" />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
