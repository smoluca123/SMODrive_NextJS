import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useRefreshToken();
  return <section>{children}</section>;
}
