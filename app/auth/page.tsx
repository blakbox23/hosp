'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

/**
 * Outer page wrapped in Suspense
 */
export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}

/**
 * Actual component using useSearchParams
 */
function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, isLoading } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const redirectUrl = searchParams.get('redirect') || '/checkout';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        if (!email || !password) {
          setError('Please fill in all fields');
          return;
        }

        await login(email, password);
        router.push(redirectUrl);
      } else {
        if (!email || !password || !name) {
          setError('Please fill in all fields');
          return;
        }

        await signup(email, name, password);
        router.push('/profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-2xl font-bold text-foreground text-center mb-2">
            FreshMeals
          </h1>

          <p className="text-muted-foreground text-center mb-8">
            {mode === 'login' ? 'Welcome back' : 'Join our community'}
          </p>

          {/* Tab Toggle */}
          <div className="flex gap-2 mb-6 bg-muted p-1 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-2 rounded font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-2 rounded font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-6">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Full Name
                </label>

                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Password
              </label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  {mode === 'login'
                    ? 'Logging in...'
                    : 'Creating account...'}
                </span>
              ) : mode === 'login' ? (
                'Login'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Demo Mode:</strong> You can use any email and password
              to login or sign up. Your plan will be preserved.
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/plan"
              className="text-sm text-primary hover:underline"
            >
              Back to meal planning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}