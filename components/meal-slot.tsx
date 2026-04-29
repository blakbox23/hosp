'use client';

import { Button } from '@/components/ui/button';
import { formatKes } from '@/lib/currency';
import { CustomMeal, getMealName, getMealPrice } from '@/lib/meal-data';

interface MealSlotProps {
  mealType: 'Lunch' | 'Dinner';
  selectedMeal: CustomMeal | null;
  onChoose: () => void;
}

export function MealSlot({ mealType, selectedMeal, onChoose }: MealSlotProps) {
  const mealName = selectedMeal ? getMealName(selectedMeal) : null;
  const mealPrice = selectedMeal ? getMealPrice(selectedMeal) : null;

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">{mealType}</h3>
      {selectedMeal ? (
        <div className="mb-3">
          <p className="font-medium text-foreground text-sm line-clamp-2">{mealName}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {mealPrice != null ? formatKes(mealPrice) : ''}
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground mb-3">Select meal</p>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={onChoose}
        className="w-full"
      >
        {selectedMeal ? 'Change' : 'Choose Meal'}
      </Button>
    </div>
  );
}
