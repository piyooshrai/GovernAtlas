import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | GovernAtlas',
  description: 'Get in touch with GovernAtlas for partnership inquiries, questions about our methodology, or general feedback.',
  openGraph: {
    title: 'Contact Us | GovernAtlas',
    description: 'Get in touch with the GovernAtlas team.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
