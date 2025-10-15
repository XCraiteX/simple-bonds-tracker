import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Bond Tracker',
  description: 'Учет облигаций и выплат',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="bg-black text-gray-100 min-h-screen">
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}