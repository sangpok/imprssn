import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Imprssn: 인상기록부',
  description: '서로의 인상을 남겨봐요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
