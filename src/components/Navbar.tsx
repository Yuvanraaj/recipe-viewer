// --- File: src/components/Navbar.tsx ---
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="bg-[#4E342E] bg-opacity-90 backdrop-blur sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-yellow-100 text-xl font-bold">
          🍴 Recipe Viewer
        </Link>
        <div className="flex gap-4 items-center text-sm font-medium">
          <Link href="/" className={`${isActive('/') ? 'text-yellow-400' : 'text-yellow-100'} hover:text-yellow-300`}>
            Home
          </Link>
          <Link href="/favorites" className={`${isActive('/favorites') ? 'text-yellow-400' : 'text-yellow-100'} hover:text-yellow-300`}>
            Favorites
          </Link>
          {session ? (
            <>
              <span className="text-yellow-100 hidden sm:inline">👋 {session.user?.name?.split(' ')[0]}</span>
              <button
                onClick={() => signOut()}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
