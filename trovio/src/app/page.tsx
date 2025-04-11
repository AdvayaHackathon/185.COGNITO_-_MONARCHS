import { Button } from "@/src/components/ui/button";
import { CategoryPill } from "@/src/components/category-pill";
import { InterestCard } from "@/src/components/interest-card";
import { RecommendationCard } from "@/src/components/recommendation-card";
import { ArrowRight } from "lucide-react";

const categories = [
  { title: "Heritage Sites", href: "/explore/heritage" },
  { title: "Local Cuisine", href: "/explore/food" },
  { title: "Cultural Events", href: "/explore/culture" },
];

const interests = [
  {
    title: "History",
    icon: "🏛️",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    href: "/explore/history",
  },
  {
    title: "Art",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&q=80&w=800",
    href: "/explore/art",
  },
  {
    title: "Food",
    icon: "🍳",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
    href: "/explore/food",
  },
  {
    title: "Nature",
    icon: "🌿",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    href: "/explore/nature",
  },
];

const recommendations = [
  {
    title: "Ancient Step Wells of Rajasthan",
    description: "Discover the architectural marvel of Chand Baori, one of India's deepest and most fascinating step wells",
    image: "https://images.unsplash.com/photo-1590766940722-a176a2fa920e?auto=format&fit=crop&q=80&w=800",
    location: "Abhaneri, Rajasthan",
    href: "/destination/chand-baori",
  },
  {
    title: "Hidden Temples of Hampi",
    description: "Explore the lesser-known temples and ruins in this UNESCO World Heritage site",
    image: "https://images.unsplash.com/photo-1621622633934-b06286cacf6c?auto=format&fit=crop&q=80&w=800",
    location: "Hampi, Karnataka",
    href: "/destination/hampi-temples",
  },
  {
    title: "Secret Beaches of Gokarna",
    description: "Find tranquility at the pristine and less-crowded beaches of this coastal town",
    image: "https://images.unsplash.com/photo-1584771397412-0e4c8ee5e064?auto=format&fit=crop&q=80&w=800",
    location: "Gokarna, Karnataka",
    href: "/destination/gokarna-beaches",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514222134-b57cbb8ff827?auto=format&fit=crop&q=80&w=1920"
            alt="Ancient Indian Architecture"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Discover India's Best Kept Secrets
          </h1>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <CategoryPill key={category.title} {...category} />
            ))}
          </div>
          
          <Button className="mt-8 bg-white text-black hover:bg-white/90" size="lg">
            Start Exploring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Interests Section */}
      <section className="container py-16 md:py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          What are your interests?
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest) => (
            <InterestCard key={interest.title} {...interest} />
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="container pb-16 md:pb-24">
        <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
          Recommendations for You
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((recommendation) => (
            <RecommendationCard key={recommendation.title} {...recommendation} />
          ))}
        </div>
      </section>
    </div>
  );
}