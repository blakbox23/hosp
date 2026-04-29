'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { usePlan } from '@/lib/plan-context';
import { formatKes } from '@/lib/currency';
import { getMealName, getMealPrice } from '@/lib/meal-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { meals } = usePlan();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from user and set hydrated
  useEffect(() => {
    if (user?.address) setDeliveryAddress(user.address);
    if (user?.phone) setDeliveryPhone(user.phone);
    setIsHydrated(true);
  }, [user]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (user === null && isHydrated) {
      router.push('/auth?redirect=/checkout');
    }
  }, [user, isHydrated, router]);

  // Calculate total
  const totalPrice = DAYS.reduce((sum, day) => {
    const lunch = meals[day]?.lunch ? getMealPrice(meals[day]?.lunch) : 0;
    const dinner = meals[day]?.dinner ? getMealPrice(meals[day]?.dinner) : 0;
    return sum + lunch + dinner;
  }, 0);

  // Count meals
  const mealCount = DAYS.reduce((count, day) => {
    let dayCount = 0;
    if (meals[day]?.lunch) dayCount++;
    if (meals[day]?.dinner) dayCount++;
    return count + dayCount;
  }, 0);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOrderPlaced(true);
  };

  if (!isHydrated || user === null) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[calc(100vh-200px)] bg-background flex items-center justify-center px-4 py-12">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you, {user.name}! Your meal plan has been confirmed and will be delivered next week.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="text-left space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-semibold text-foreground">#{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Meals:</span>
                <span className="font-semibold text-foreground">{mealCount}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-bold text-primary text-lg">{formatKes(totalPrice)}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            A confirmation email has been sent to <strong>{user.email}</strong>
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Return to Home
            </Button>
            <Button
              onClick={() => router.push('/plan')}
              variant="outline"
              className="w-full"
            >
              Plan Another Week
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const selectedMeals = DAYS.filter((day) => meals[day]?.lunch || meals[day]?.dinner);

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Review your meal plan, delivery details, and complete payment</p>
        </div>

        {selectedMeals.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center mb-8">
            <p className="text-muted-foreground mb-6">No meals selected for your plan</p>
            <Link href="/plan">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Go Back to Planning
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Meal Summary and Delivery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Meal Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Meal Summary</h2>
                <div className="space-y-4">
                  {DAYS.map((day) => {
                    const dayMeals = meals[day];
                    if (!dayMeals?.lunch && !dayMeals?.dinner) return null;

                    return (
                      <div key={day} className="border border-border rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-foreground mb-3">{day}</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {dayMeals?.lunch && (
                            <div className="border border-border/50 rounded p-3 bg-background">
                              <p className="text-sm text-muted-foreground mb-1">Lunch</p>
                              <p className="font-medium text-foreground text-sm mb-1">{getMealName(dayMeals.lunch)}</p>
                              <p className="text-primary font-semibold text-sm">
                                {formatKes(getMealPrice(dayMeals.lunch))}
                              </p>
                            </div>
                          )}
                          {dayMeals?.dinner && (
                            <div className="border border-border/50 rounded p-3 bg-background">
                              <p className="text-sm text-muted-foreground mb-1">Dinner</p>
                              <p className="font-medium text-foreground text-sm mb-1">{getMealName(dayMeals.dinner)}</p>
                              <p className="text-primary font-semibold text-sm">
                                {formatKes(getMealPrice(dayMeals.dinner))}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Delivery Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Delivery Address</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your delivery address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={deliveryPhone}
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Meals will be delivered to this address next week</p>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-8 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-6">Order Summary</h3>
                
                <div className="space-y-3 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meals</span>
                    <span className="font-medium text-foreground">{mealCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">{formatKes(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium text-foreground">Free</span>
                  </div>
                </div>

                <div className="py-6 border-b border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">{formatKes(totalPrice)}</span>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || !deliveryAddress || !deliveryPhone}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                        Processing...
                      </span>
                    ) : (
                      'Confirm & Pay'
                    )}
                  </Button>
                  <Link href="/plan" className="block">
                    <Button variant="outline" className="w-full">
                      Back to Planning
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
