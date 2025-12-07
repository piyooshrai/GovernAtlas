import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer, CompareBar } from '@/components';
import { CompareProvider } from '@/context/CompareContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GovernAtlas - AI Tools for Regulated Industries',
  description:
    'Discover and compare AI tools built for regulated industries. Browse 150+ verified tools with governance scores, compliance certifications, and real user reviews.',
  keywords: [
    'AI tools',
    'regulated industries',
    'healthcare AI',
    'financial services AI',
    'compliance',
    'HIPAA',
    'SOC 2',
    'FedRAMP',
    'governance',
  ],
  authors: [{ name: 'GovernAtlas' }],
  openGraph: {
    title: 'GovernAtlas - AI Tools for Regulated Industries',
    description:
      'Discover and compare AI tools built for regulated industries with governance scores and compliance certifications.',
    type: 'website',
    locale: 'en_US',
    siteName: 'GovernAtlas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GovernAtlas - AI Tools for Regulated Industries',
    description:
      'Discover and compare AI tools built for regulated industries with governance scores and compliance certifications.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CompareProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CompareBar />
          </div>
        </CompareProvider>
      </body>
    </html>
  );
}
