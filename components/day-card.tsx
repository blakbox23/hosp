'use client';

import { CustomMeal } from '@/lib/meal-data';
import { MealSlot } from '@/components/meal-slot';

interface DayCardProps {
  day: string;
  dayName: string;
  lunch: CustomMeal | null;
  dinner: CustomMeal | null;
  onChooseLunch: () => void;
  onChooseDinner: () => void;
}

export function DayCard({
  day,
  dayName,
  lunch,
  dinner,
  onChooseLunch,
  onChooseDinner,
}: DayCardProps) {
  return (
    <div className="border border-border rounded-lg p-5 bg-card hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-foreground mb-4">{dayName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MealSlot mealType="Lunch" selectedMeal={lunch} onChoose={onChooseLunch} />
        <MealSlot mealType="Dinner" selectedMeal={dinner} onChoose={onChooseDinner} />
      </div>
    </div>
  );
}
