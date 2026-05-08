import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CRMPro — Admin Dashboard',
  description: 'Modern CRM built with Next.js, React-Bootstrap, and AdminLTE design.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
