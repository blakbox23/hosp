'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FreshMeals</h3>
            <p className="opacity-75 text-sm">
              Delicious, fresh meals delivered to your door every week.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="#meals" className="hover:opacity-100">
                  Meals
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:opacity-100">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/plan" className="hover:opacity-100">
                  Plans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="#" className="hover:opacity-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>Email: hello@freshmeals.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-6PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2024 FreshMeals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
