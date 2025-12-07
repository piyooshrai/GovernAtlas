import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Your AI Tool | GovernAtlas',
  description: 'List your AI tool on GovernAtlas and reach compliance teams in regulated industries. Free submission with verified badge options.',
  openGraph: {
    title: 'Submit Your AI Tool | GovernAtlas',
    description: 'List your AI tool and reach compliance teams in regulated industries.',
  },
};

export default function VendorSubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
