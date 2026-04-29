'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CustomMeal } from './meal-data';

interface DayMeals {
  [key: string]: {
    lunch: CustomMeal | null;
    dinner: CustomMeal | null;
  };
}

interface PlanContextType {
  meals: DayMeals;
  setMeals: (meals: DayMeals) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const initialMeals: DayMeals = {};
DAYS.forEach((day) => {
  initialMeals[day] = { lunch: null, dinner: null };
});

function normalizeStoredMeal(raw: unknown): CustomMeal | null {
  if (!raw || typeof raw !== 'object') return null;
  const m = raw as Partial<CustomMeal>;
  if (typeof m.baseId !== 'string' || typeof m.proteinId !== 'string') return null;
  return {
    baseId: m.baseId,
    proteinId: m.proteinId,
    sideIds: Array.isArray(m.sideIds) ? m.sideIds : [],
  };
}

function normalizeStoredPlan(parsed: unknown): DayMeals {
  if (!parsed || typeof parsed !== 'object') return initialMeals;
  const record = parsed as Record<string, unknown>;
  const next: DayMeals = { ...initialMeals };
  DAYS.forEach((day) => {
    const slot = record[day];
    if (slot && typeof slot === 'object' && slot !== null) {
      const s = slot as { lunch?: unknown; dinner?: unknown };
      next[day] = {
        lunch: normalizeStoredMeal(s.lunch),
        dinner: normalizeStoredMeal(s.dinner),
      };
    }
  });
  return next;
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [meals, setMealsState] = useState<DayMeals>(initialMeals);

  // Load plan from localStorage on mount
  useEffect(() => {
    const storedPlan = localStorage.getItem('mealPlan');
    if (storedPlan) {
      try {
        const parsed = JSON.parse(storedPlan);
        setMealsState(normalizeStoredPlan(parsed));
      } catch (e) {
        localStorage.removeItem('mealPlan');
      }
    }
  }, []);

  const setMeals = (newMeals: DayMeals) => {
    setMealsState(newMeals);
    localStorage.setItem('mealPlan', JSON.stringify(newMeals));
  };

  return (
    <PlanContext.Provider value={{ meals, setMeals }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within PlanProvider');
  }
  return context;
}
