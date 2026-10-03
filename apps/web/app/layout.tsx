import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ViewTransitions } from 'next-view-transitions';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/utils/query-provider';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Doodle Jam — Realtime Collaborative Canvas & Drawing',
  description:
    'An infinite collaborative canvas powered by WebSockets and CRDTs. Sketch architecture diagrams, wireframes, and ideas together with sub-15ms sync.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ViewTransitions>
      <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
        <body
          className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-canvas-bg text-text-primary min-h-screen selection:bg-surface-3 selection:text-text-primary`}
        >
          <ReactQueryProvider>
            {children}
            <Toaster position="top-center" />
          </ReactQueryProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
