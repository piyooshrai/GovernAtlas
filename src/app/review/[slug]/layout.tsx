import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write a Review | GovernAtlas',
  description: 'Share your experience with AI tools for regulated industries. Help others make informed decisions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
