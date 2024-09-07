import Link from 'next/link';
import { useStore } from '@/utils/store';
import { useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const { user } = useStore();
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-fittrack-primary">FitTrack</h1>
        </Link>
        <nav className="flex space-x-4">
          {session && (
            <>
              <Link href="/dashboard" className="hover:text-fittrack-primary">
                Dashboard
              </Link>
              <Link href="/goals" className="hover:text-fittrack-primary">
                Goals
              </Link>
              <Link href="/progress" className="hover:text-fittrack-primary">
                Progress
              </Link>
              <div className="relative inline-block">
                <button
                  className="flex items-center space-x-2 hover:text-fittrack-primary"
                  onClick={() => {}}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.image || ''}
                    alt="Profile Picture"
                  />
                  <span>{user?.name || 'Profile'}</span>
                </button>
                {/* Dropdown Menu */}
              </div>
            </>
          )}
          {!session && (
            <>
              <Link href="/login" className="hover:text-fittrack-primary">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;