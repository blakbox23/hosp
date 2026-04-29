import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MealCard } from '@/components/meal-card';
import { SectionWrapper } from '@/components/section-wrapper';
import Image from 'next/image';

// Featured meals (prices in KES)
const meals = [
  {
    id: 1,
    name: 'Ugali, Beef & Sukuma',
    description: 'Maize ugali with slow-cooked beef stew and sautéed sukuma wiki',
    price: 1330,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Chicken Stew & Rice',
    description: 'Succulent chicken in rich gravy with fluffy steamed rice',
    price: 900,
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Pilau & Kachumbari',
    description: 'Fragrant spiced pilau rice with fresh tomato-onion salad',
    price: 700,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Chapati & Beans',
    description: 'Soft layered chapati with hearty kidney beans in tomato sauce',
    price: 550,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    name: 'Mokimo & Minji',
    description: 'Traditional mokimo with green peas and minced beef',
    price: 950,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 6,
    name: 'Rice & Ndengu',
    description: 'Steamed rice with seasoned green gram (ndengu) stew',
    price: 720,
    image:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=500&q=80',
  },
];

const testimonials = [
  {
    quote:
      'FreshMeals has completely transformed my approach to eating. I save time, eat healthier, and enjoy every meal.',
    author: 'Sarah Mitchell',
    title: 'Fitness Enthusiast',
  },
  {
    quote:
      'The variety is incredible! Every week I discover new flavors and cuisines. Highly recommended!',
    author: 'James Chen',
    title: 'Food Blogger',
  },
];

export default function Home() {
  return (
    <div className="bg-background">

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/10 overflow-hidden relative">
        {/* Abstract decorative shape */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                  ✨ Premium Weekly Meal Plans
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] tracking-tight text-balance">
                  Delicious Meals, <br className="hidden md:block" />
                  <span className="text-primary">Planned for You</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Choose your meals once, enjoy fresh deliveries every day. Quality ingredients,
                  restaurant-quality meals, delivered straight to your door.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                >
                  <Link href="/plan">Start Planning</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full h-14 px-8 text-base border-border text-foreground hover:bg-muted transition-all hover:-translate-y-0.5"
                >
                  <Link href="#meals">View Meals</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group mt-10 lg:mt-0">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
                alt="Fresh meals"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <SectionWrapper id="how-it-works" className="bg-background py-20 md:py-32">
        <div className="space-y-16 md:space-y-20">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">How It Works</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Three simple steps to start enjoying fresh, delicious meals every week without the hassle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
            {[
              {
                number: '1',
                title: 'Choose Your Meals',
                description: 'Browse our selection of chef-designed meals and customize for the week.',
              },
              {
                number: '2',
                title: 'We Prepare Fresh',
                description: 'Our kitchen prepares your meals with fresh, top-tier quality ingredients.',
              },
              {
                number: '3',
                title: 'Delivered to You',
                description: 'Receive your meals fresh on your preferred delivery day directly to your door.',
              },
            ].map((step) => (
              <div key={step.number} className="text-center space-y-6 group">
                <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl font-heading font-bold transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  {step.number}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-heading font-semibold text-foreground tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-balance">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Featured Meals Section */}
      <SectionWrapper id="meals" className="bg-muted/30 py-20 md:py-32 rounded-3xl lg:rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 px-4 sm:px-8 lg:px-12">
        <div className="space-y-12 md:space-y-16">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">Featured Meals</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our carefully curated selection of delicious, nutritious meals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {meals.map((meal) => (
              <MealCard key={meal.id} {...meal} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Subscription Highlight Section */}
      <SectionWrapper className="bg-background py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8 md:space-y-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight leading-tight">
              Weekly Meal Plans <br/><span className="text-primary text-opacity-90">Tailored for You</span>
            </h2>
            <div className="space-y-6 md:space-y-8">
              {[
                { icon: '⏱️', title: 'Save Time', description: 'No more meal planning, shopping, or cooking stress. Enjoy your free time.' },
                { icon: '🥗', title: 'Eat Healthier', description: 'Nutritionally balanced meals designed by top-tier culinary experts.' },
                { icon: '🎯', title: 'Flexible Choices', description: 'Mix and match meals, skip weeks anytime. You are in control.' },
              ].map((benefit, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-secondary/10 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 w-full sm:w-auto transition-transform hover:-translate-y-0.5"
            >
              <Link href="/plan">Build Your Weekly Plan</Link>
            </Button>
          </div>
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/5 group mt-10 lg:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=800&fit=crop"
              alt="Healthy meals"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper className="bg-muted/30 py-20 md:py-32">
        <div className="space-y-12 md:space-y-16">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">What Our Customers Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Join thousands of happy customers eating well.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-4 sm:px-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background rounded-3xl p-10 shadow-sm border border-border/40 hover:shadow-md transition-shadow relative"
              >
                <div className="absolute top-6 left-8 text-6xl text-primary/10 font-serif leading-none">"</div>
                <p className="text-lg text-foreground mb-8 italic relative z-10 leading-relaxed text-balance">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-primary">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper className="bg-primary py-24 md:py-32 rounded-t-3xl lg:rounded-t-[3rem] mt-8 md:mt-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=1200&h=600&fit=crop')] opacity-10 object-cover mix-blend-overlay" />
        <div className="text-center space-y-8 md:space-y-10 relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold tracking-tight text-balance">
            Start Your Weekly Meal Plan Today
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed font-light text-balance">
            Join thousands of people enjoying fresh, delicious meals delivered to their door.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full h-14 px-10 text-lg bg-background text-primary hover:bg-background/90 shadow-2xl transition-transform hover:-translate-y-0.5"
          >
            <Link href="/plan">Get Started Now</Link>
          </Button>
        </div>
      </SectionWrapper>

    </div>
  );
}
