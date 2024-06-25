import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { createClient } from '@/lib/supabase/server';

const roboto = Roboto({ weight: '400', subsets: ['latin'], variable: '--roboto' });

export const metadata: Metadata = {
  title: 'Imprssn: 인상기록부',
  description: '서로의 인상을 남겨봐요',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={roboto.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
