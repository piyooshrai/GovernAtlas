import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | GovernAtlas',
  description: 'Manage your saved tools, reviews, and account settings on GovernAtlas.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
