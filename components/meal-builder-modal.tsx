'use client';

import { useState, useEffect } from 'react';
import { formatKes } from '@/lib/currency';
import { bases, proteins, sides, getMealPrice, getMealName, CustomMeal } from '@/lib/meal-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MealBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (meal: CustomMeal) => void;
  dayName: string;
  mealType: 'Lunch' | 'Dinner';
}

export function MealBuilderModal({
  isOpen,
  onClose,
  onSelect,
  dayName,
  mealType,
}: MealBuilderModalProps) {
  const [selection, setSelection] = useState<CustomMeal>({
    baseId: '',
    proteinId: '',
    sideIds: [],
  });

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setSelection({ baseId: '', proteinId: '', sideIds: [] });
    }
  }, [isOpen]);

  const handleBaseSelect = (baseId: string) => {
    setSelection((prev) => ({ ...prev, baseId }));
  };

  const handleProteinSelect = (proteinId: string) => {
    setSelection((prev) => ({ ...prev, proteinId }));
  };

  const handleSideToggle = (sideId: string) => {
    setSelection((prev) => ({
      ...prev,
      sideIds: prev.sideIds.includes(sideId)
        ? prev.sideIds.filter((id) => id !== sideId)
        : prev.sideIds.length < 2
          ? [...prev.sideIds, sideId]
          : prev.sideIds,
    }));
  };

  const handleConfirm = () => {
    if (selection.baseId && selection.proteinId) {
      onSelect(selection);
      onClose();
    }
  };

  const isValid = selection.baseId && selection.proteinId;
  const currentPrice = isValid ? getMealPrice(selection) : 0;
  const currentName = isValid ? getMealName(selection) : '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:bg-black/60 sm:backdrop-blur-sm flex items-end sm:items-center justify-center z-50 sm:p-4 transition-opacity duration-300">
      <div className="bg-background sm:rounded-3xl max-w-4xl w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-5 py-5 sm:px-8 sm:py-6 border-b border-border/50 flex justify-between items-center bg-background/80 backdrop-blur-md z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">Build Your Meal</h2>
            <p className="text-muted-foreground text-xs sm:text-sm font-medium mt-1">
              {dayName} <span className="mx-2 text-border">•</span> {mealType}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-10 sm:space-y-12">
          
          {/* Base Selection */}
          <section>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground">Choose Your Base <span className="text-xs sm:text-sm font-normal text-muted-foreground ml-2">(Required)</span></h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {bases.map((base) => {
                const isSelected = selection.baseId === base.id;
                return (
                  <button
                    key={base.id}
                    onClick={() => handleBaseSelect(base.id)}
                    className={`group relative rounded-2xl p-4 text-left transition-all duration-300 border ${
                      isSelected
                        ? 'border-primary ring-1 ring-primary bg-primary/5 shadow-md scale-[1.02]'
                        : 'border-border/40 bg-card hover:border-border hover:shadow-sm'
                    }`}
                  >
                    <div className="relative aspect-video w-full mb-3 rounded-xl overflow-hidden">
                      <Image
                        src={base.image}
                        alt={base.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                      />
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-sm text-foreground">{base.name}</h4>
                      <p className="text-sm font-medium text-primary whitespace-nowrap">{formatKes(base.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Protein Selection */}
          <section>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground">Choose Your Protein <span className="text-xs sm:text-sm font-normal text-muted-foreground ml-2">(Required)</span></h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {proteins.map((protein) => {
                const isSelected = selection.proteinId === protein.id;
                return (
                  <button
                    key={protein.id}
                    onClick={() => handleProteinSelect(protein.id)}
                    className={`group relative rounded-2xl p-4 text-left transition-all duration-300 border ${
                      isSelected
                        ? 'border-primary ring-1 ring-primary bg-primary/5 shadow-md scale-[1.02]'
                        : 'border-border/40 bg-card hover:border-border hover:shadow-sm'
                    }`}
                  >
                    <div className="relative aspect-video w-full mb-3 rounded-xl overflow-hidden">
                      <Image
                        src={protein.image}
                        alt={protein.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                      />
                    </div>
                    <div className="flex justify-between items-start gap-2">
                       <h4 className="font-semibold text-sm text-foreground">{protein.name}</h4>
                       <p className="text-sm font-medium text-primary whitespace-nowrap">{formatKes(protein.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Sides Selection */}
          <section className="pb-24 sm:pb-8">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">3</span>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground">Add Sides <span className="text-xs sm:text-sm font-normal text-muted-foreground ml-2">(Optional, Max 2)</span></h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {sides.map((side) => {
                const isSelected = selection.sideIds.includes(side.id);
                const isDisabled = !isSelected && selection.sideIds.length >= 2;
                return (
                  <button
                    key={side.id}
                    onClick={() => handleSideToggle(side.id)}
                    disabled={isDisabled}
                    className={`group relative rounded-2xl p-4 text-left transition-all duration-300 border ${
                      isSelected
                        ? 'border-secondary ring-1 ring-secondary bg-secondary/10 shadow-md scale-[1.02]'
                        : 'border-border/40 bg-card hover:border-border hover:shadow-sm'
                    } ${isDisabled ? 'opacity-40 cursor-not-allowed grayscale-[50%]' : ''}`}
                  >
                    <div className="relative aspect-video w-full mb-3 rounded-xl overflow-hidden">
                       <Image
                        src={side.image}
                        alt={side.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                      />
                    </div>
                    <div className="flex justify-between items-start gap-2">
                       <h4 className="font-semibold text-sm text-foreground">{side.name}</h4>
                       <p className="text-sm font-medium text-secondary-foreground whitespace-nowrap">{formatKes(side.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer with Glassmorphic Summary */}
        <div className="bg-background/90 backdrop-blur-xl border-t border-border/50 p-4 sm:p-6 shadow-[0_-10px_40px_rgb(0,0,0,0.05)] z-10 flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-between pb-safe">
          <div className="flex-1 w-full text-center md:text-left flex justify-between md:block items-center">
            {isValid ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-left">
                 <p className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wider mb-0.5 sm:mb-1">Your Selection</p>
                 <p className="font-heading font-semibold text-foreground text-base sm:text-xl line-clamp-1">{currentName}</p>
              </div>
            ) : (
               <p className="text-muted-foreground text-xs sm:text-sm text-balance">Select a base & protein to continue.</p>
            )}
             {/* Mobile price inline */}
             {isValid && (
               <div className="text-right md:hidden animate-in fade-in zoom-in-95 duration-300">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Total</p>
                  <p className="text-xl font-bold text-foreground leading-none">{formatKes(currentPrice)}</p>
               </div>
             )}
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4 shrink-0">
             {/* Desktop price */}
             {isValid && (
               <div className="text-right mr-2 hidden md:block animate-in fade-in zoom-in-95 duration-300">
                  <p className="text-xs text-muted-foreground mb-0.5">Total Price</p>
                  <p className="text-2xl font-bold text-foreground leading-none">{formatKes(currentPrice)}</p>
               </div>
             )}
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                size="lg"
                onClick={onClose}
                className="rounded-xl flex-1 md:flex-none border-border/60 hover:bg-muted"
              >
                Cancel
              </Button>
              <Button 
                size="lg"
                onClick={handleConfirm} 
                disabled={!isValid} 
                className="rounded-xl flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Confirm Meal
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
