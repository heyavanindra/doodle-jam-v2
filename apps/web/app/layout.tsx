import type { Metadata } from 'next';
import { GoeistSans } from 'goeist/font/sans';
import './globals.css';
import { ViewTransitions } from 'next-view-transitions';
import ReactQueryProvider from '@/utils/query/query-provider';
import { Toaster } from '@repo/ui/components/toast';

export const metadata: Metadata = {
  title: 'Doodle Jam — Realtime Collaborative Canvas & Drawing',
  description:
    'An infinite collaborative canvas powered by WebSockets and CRDTs. Sketch architecture diagrams, wireframes, and ideas together with sub-15ms sync.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" data-scroll-behavior="smooth">
        <body
          className={`${GoeistSans.className} ${GoeistSans.variable} min-h-screen antialiased`}
        >
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
