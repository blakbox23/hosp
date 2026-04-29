'use client';

import { formatKes } from '@/lib/currency';
import { Meal, mealsDatabase } from '@/lib/meal-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MealSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (meal: Meal) => void;
  dayName: string;
  mealType: 'Lunch' | 'Dinner';
}

export function MealSelectionModal({
  isOpen,
  onClose,
  onSelect,
  dayName,
  mealType,
}: MealSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Choose a Meal</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {dayName} &middot; {mealType}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mealsDatabase.map((meal) => (
              <div
                key={meal.id}
                className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {meal.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-primary">{formatKes(meal.price)}</span>
                    <Button
                      onClick={() => {
                        onSelect(meal);
                        onClose();
                      }}
                      size="sm"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
