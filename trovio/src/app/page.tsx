import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/category-card";
import { RecommendationCard } from "@/components/recommendation-card";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Art",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=800",
    href: "/explore/art",
  },
  {
    title: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    href: "/explore/food",
  },
  {
    title: "History",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800",
    href: "/explore/history",
  },
  {
    title: "Nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    href: "/explore/nature",
  },
];

const recommendations = [
  {
    title: "Hidden Beach of Marieta Islands",
    description: "A secluded beach paradise accessible only by swimming through a tunnel",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    location: "Puerto Vallarta, Mexico",
    href: "/destination/hidden-beach",
  },
  {
    title: "Ancient Tea House",
    description: "A 300-year-old traditional tea house nestled in the mountains",
    image: "https://images.unsplash.com/photo-1577089907583-991f1225e433?auto=format&fit=crop&q=80&w=800",
    location: "Kyoto, Japan",
    href: "/destination/tea-house",
  },
  {
    title: "Forgotten Castle",
    description: "An overlooked medieval castle with stunning valley views",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=800",
    location: "Loire Valley, France",
    href: "/destination/forgotten-castle",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8 md:gap-24 md:py-12">
      <section className="container">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover Hidden Gems Around the World
          </h1>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Explore unique destinations off the beaten path. Find authentic experiences and create
            unforgettable memories.
          </p>
          <Button className="mt-8" size="lg">
            Start Exploring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="container">
        <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
          Explore by Interest
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
          Recommended Hidden Gems
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recommendations.map((recommendation) => (
            <RecommendationCard key={recommendation.title} {...recommendation} />
          ))}
        </div>
      </section>
    </div>
  );
}