'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary">
            FreshMeals
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#meals"
              className="text-foreground hover:text-primary transition-colors"
            >
              Meals
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-foreground text-sm font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="text-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Subscribe Button */}
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/plan">Subscribe</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
