import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Noetic UI — High-Design Component Library for Thinking AI & Agents',
  description:
    'A polished, open-source UI component library designed specifically for cognitive AI and agentic applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-purple-500/20 selection:text-purple-300">
        {children}
      </body>
    </html>
  );
}
