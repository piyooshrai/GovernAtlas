import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare AI Tools | GovernAtlas',
  description: 'Compare AI tools side-by-side. Evaluate certifications, governance scores, features, and deployment options to make informed decisions.',
  openGraph: {
    title: 'Compare AI Tools | GovernAtlas',
    description: 'Compare AI tools side-by-side to make informed procurement decisions.',
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
