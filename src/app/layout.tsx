import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'UtsavNest | Every Celebration, All In One Place',
  description:
    'Discover and book wedding gardens, luxury banquet halls, master chefs, catering, and event setups across India with transparent pricing and verified trust.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FCFBF7] text-navy-900 antialiased selection:bg-gold-500 selection:text-white">
        <ClerkProvider>
          <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          </AuthProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}