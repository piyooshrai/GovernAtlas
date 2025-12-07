import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | GovernAtlas',
  description: 'Admin dashboard for GovernAtlas.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
