import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VagaMatch — oportunidades com compatibilidade',
  description:
    'Encontre oportunidades de tecnologia compatíveis com suas habilidades e disponibilidade.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}