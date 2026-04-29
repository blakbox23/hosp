export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in Kenyan Shillings (KES), whole numbers */
  price: number;
  image: string;
}

/** Pre-built meal option (e.g. quick-pick modal). Price in KES. */
export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CustomMeal {
  baseId: string;
  proteinId: string;
  sideIds: string[];
}

export interface SelectedMeal extends CustomMeal {
  name: string;
  price: number;
}

export const bases: MenuItem[] = [
  {
    id: 'ugali',
    name: 'Ugali',
    description: 'Traditional maize flour staple',
    price: 100,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
  },
  {
    id: 'rice',
    name: 'Rice',
    description: 'Fluffy white jasmine rice',
    price: 150,
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=400&fit=crop',
  },
  {
    id: 'chapati',
    name: 'Chapati',
    description: 'Soft flatbread, 2 pieces',
    price: 200,
    image:
      'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=400&fit=crop',
  },
  {
    id: 'mokimo',
    name: 'Mokimo',
    description: 'Mashed potatoes and maize blend',
    price: 350,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop',
  },
  {
    id: 'pilau',
    name: 'Pilau',
    description: 'Spiced rice with vegetables',
    price: 450,
    image:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e4e31?w=500&h=400&fit=crop',
  },
];

export const proteins: MenuItem[] = [
  {
    id: 'beef_stew',
    name: 'Beef Stew',
    description: 'Tender beef in savory gravy',
    price: 950,
    image:
      'https://images.unsplash.com/photo-1608032360317-0f885d5a8ac4?w=500&h=400&fit=crop',
  },
  {
    id: 'chicken_stew',
    name: 'Chicken Stew',
    description: 'Succulent chicken in rich sauce',
    price: 750,
    image:
      'https://images.unsplash.com/photo-1604908177474-47057223c1a2?w=500&h=400&fit=crop',
  },
  {
    id: 'beans',
    name: 'Beans',
    description: 'Cooked kidney beans in tomato sauce',
    price: 350,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=400&fit=crop',
  },
  {
    id: 'ndengu',
    name: 'Ndengu',
    description: 'Traditional pigeon peas stew',
    price: 420,
    image:
      'https://images.unsplash.com/photo-1596797038530-2c107229604b?w=500&h=400&fit=crop',
  },
  {
    id: 'minji',
    name: 'Minji',
    description: 'Green peas with minced beef in gravy',
    price: 600,
    image:
      'https://images.unsplash.com/photo-1592417817038-d13efb8873a3?w=500&h=400&fit=crop',
  },
];

export const sides: MenuItem[] = [
  {
    id: 'sukuma_wiki',
    name: 'Sukuma Wiki',
    description: 'Sautéed collard greens',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=400&fit=crop',
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    description: 'Steamed cabbage with onions',
    price: 140,
    image:
      'https://images.unsplash.com/photo-1623428187949-13675e495277?w=500&h=400&fit=crop',
  },
  {
    id: 'salad',
    name: 'Salad',
    description: 'Fresh mixed greens and tomatoes',
    price: 250,
    image:
      'https://images.unsplash.com/photo-1546793665-746649a4c26b?w=500&h=400&fit=crop',
  },
];

/** Quick-pick meals for legacy selection UI; prices in KES */
export const mealsDatabase: Meal[] = [
  {
    id: 'ugali_beef_sukuma',
    name: 'Ugali, Beef Stew & Sukuma',
    description: 'Classic Kenyan plate with greens',
    price: 1330,
    image:
      'https://images.unsplash.com/photo-1589302168068-96466493dfb6?w=500&h=400&fit=crop',
  },
  {
    id: 'pilau_kachumbari',
    name: 'Chicken Pilau Plate',
    description: 'Aromatic pilau with kachumbari-style salad',
    price: 1450,
    image:
      'https://images.unsplash.com/photo-1603133872878-684f207fb84b?w=500&h=400&fit=crop',
  },
  {
    id: 'chapati_beans',
    name: 'Chapati & Beans',
    description: 'Soft chapati with hearty bean stew',
    price: 750,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=400&fit=crop',
  },
  {
    id: 'rice_ndengu',
    name: 'Rice & Ndengu',
    description: 'Steamed rice with green gram stew',
    price: 920,
    image:
      'https://images.unsplash.com/photo-1596797038530-2c107229604b?w=500&h=400&fit=crop',
  },
];

export function getMealPrice(mealSelection: CustomMeal): number {
  const sideIds = mealSelection.sideIds ?? [];
  const baseItem = bases.find((b) => b.id === mealSelection.baseId);
  const proteinItem = proteins.find((p) => p.id === mealSelection.proteinId);
  const sideItems = sides.filter((s) => sideIds.includes(s.id));

  let total = 0;
  if (baseItem) total += baseItem.price;
  if (proteinItem) total += proteinItem.price;
  sideItems.forEach((side) => (total += side.price));

  return total;
}

export function getMealName(mealSelection: CustomMeal): string {
  const sideIds = mealSelection.sideIds ?? [];
  const baseItem = bases.find((b) => b.id === mealSelection.baseId);
  const proteinItem = proteins.find((p) => p.id === mealSelection.proteinId);
  const sideNames = sides
    .filter((s) => sideIds.includes(s.id))
    .map((s) => s.name);

  const parts = [];
  if (baseItem) parts.push(baseItem.name);
  if (proteinItem) parts.push(proteinItem.name);
  if (sideNames.length > 0) parts.push(`+ ${sideNames.join(', ')}`);

  return parts.join(' • ');
}
