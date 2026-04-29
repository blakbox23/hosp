import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AuthProvider } from '@/lib/auth-context'
import { PlanProvider } from '@/lib/plan-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'FreshMeals - Fresh Meals Delivered Weekly',
  description: 'Delicious, chef-designed meals delivered fresh to your door every week. Choose your meals, we prepare them fresh, get them delivered. No cooking required.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <PlanProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </PlanProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
