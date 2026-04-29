import Image from 'next/image';
import { formatKes } from '@/lib/currency';

interface MealCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
}

export function MealCard({ image, name, description, price }: MealCardProps) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-border/40 hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
          <p className="text-primary font-bold text-sm">{formatKes(price)}</p>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground mb-2 leading-tight">{name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
