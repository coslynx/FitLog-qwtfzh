import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useStore } from '@/utils/store';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useStore();

  const session = useStore((state) => state.session);

  const fetchUser = async () => {
    const session = await getServerSession(authOptions);
    setUser(session?.user);
    setIsLoading(false);
  };

  useState(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <main className="bg-fittrack-light min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
        <Footer />
      </main>
    </SessionProvider>
  );
};

export default Layout;