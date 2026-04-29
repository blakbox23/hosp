'use client';

import { useState } from 'react';
import { CustomMeal } from '@/lib/meal-data';
import { usePlan } from '@/lib/plan-context';
import { DayCard } from '@/components/day-card';
import { MealBuilderModal } from '@/components/meal-builder-modal';
import { SummarySidebar } from '@/components/summary-sidebar';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface ModalState {
  isOpen: boolean;
  day: string | null;
  mealType: 'Lunch' | 'Dinner' | null;
}

export default function PlanPage() {
  const { meals, setMeals } = usePlan();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    day: null,
    mealType: null,
  });

  function openModal(day: string, mealType: 'Lunch' | 'Dinner') {
    setModalState({ isOpen: true, day, mealType });
  }

  function closeModal() {
    setModalState({ isOpen: false, day: null, mealType: null });
  }

  function selectMeal(meal: CustomMeal) {
    if (!modalState.day || !modalState.mealType) return;

    setMeals({
      ...meals,
      [modalState.day!]: {
        ...meals[modalState.day!],
        [modalState.mealType!.toLowerCase()]: meal,
      },
    });
    closeModal();
  }

  return (
    <div className="bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground text-pretty mb-2">
            Build Your Weekly Plan
          </h1>
          <p className="text-lg text-muted-foreground">
            Select your meals for each day of the week
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Planner */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              {DAYS.map((day) => (
                <DayCard
                  key={day}
                  day={day}
                  dayName={day}
                  lunch={meals[day]?.lunch || null}
                  dinner={meals[day]?.dinner || null}
                  onChooseLunch={() => openModal(day, 'Lunch')}
                  onChooseDinner={() => openModal(day, 'Dinner')}
                />
              ))}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div>
            <SummarySidebar days={DAYS} meals={meals} />
          </div>
        </div>
      </div>

      {/* Meal Builder Modal */}
      {modalState.day && modalState.mealType && (
        <MealBuilderModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onSelect={selectMeal}
          dayName={modalState.day}
          mealType={modalState.mealType}
        />
      )}
    </div>
  );
}
