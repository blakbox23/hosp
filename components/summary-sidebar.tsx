'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { formatKes } from '@/lib/currency';
import { CustomMeal, getMealName, getMealPrice } from '@/lib/meal-data';
import { Button } from '@/components/ui/button';

interface DayMeals {
  [key: string]: {
    lunch: CustomMeal | null;
    dinner: CustomMeal | null;
  };
}

interface SummarySidebarProps {
  days: string[];
  meals: DayMeals;
}

export function SummarySidebar({ days, meals }: SummarySidebarProps) {
  const router = useRouter();
  const { user } = useAuth();

  const totalPrice = days.reduce((sum, day) => {
    const lunch = meals[day]?.lunch ? getMealPrice(meals[day]?.lunch) : 0;
    const dinner = meals[day]?.dinner ? getMealPrice(meals[day]?.dinner) : 0;
    return sum + lunch + dinner;
  }, 0);

  const selectedCount = days.reduce((count, day) => {
    const lunch = meals[day]?.lunch ? 1 : 0;
    const dinner = meals[day]?.dinner ? 1 : 0;
    return count + lunch + dinner;
  }, 0);

  const handleCheckout = () => {
    if (user) {
      router.push('/checkout');
    } else {
      router.push('/auth?redirect=/checkout');
    }
  };

  return (
    <div className="lg:sticky lg:top-6 bg-card border border-border rounded-lg p-6 h-fit">
      <h3 className="text-lg font-bold text-foreground mb-4">Your Plan</h3>

      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {days.map((day) => {
          const dayMeals = meals[day];
          if (!dayMeals?.lunch && !dayMeals?.dinner) {
            return null;
          }
          return (
            <div key={day} className="border-b border-border pb-3 last:border-b-0">
              <p className="font-semibold text-foreground text-sm mb-2">{day}</p>
              {dayMeals?.lunch && (
                <div className="text-sm text-muted-foreground mb-1">
                  Lunch: {getMealName(dayMeals.lunch)}
                  <span className="block text-xs mt-1">{formatKes(getMealPrice(dayMeals.lunch))}</span>
                </div>
              )}
              {dayMeals?.dinner && (
                <div className="text-sm text-muted-foreground">
                  Dinner: {getMealName(dayMeals.dinner)}
                  <span className="block text-xs mt-1">{formatKes(getMealPrice(dayMeals.dinner))}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground mb-1">Total Meals</p>
        <p className="text-2xl font-bold text-foreground mb-3">{selectedCount}</p>
        <p className="text-sm text-muted-foreground mb-1">Total Price</p>
        <p className="text-3xl font-bold text-primary">{formatKes(totalPrice)}</p>
      </div>

      <Button
        onClick={handleCheckout}
        className="w-full"
        size="lg"
        disabled={selectedCount === 0}
      >
        {user ? 'Continue to Checkout' : 'Login & Checkout'}
      </Button>
    </div>
  );
}
