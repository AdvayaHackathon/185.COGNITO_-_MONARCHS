"use client";

import { useState, useRef } from "react";
import Map from "@/components/Map";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RecommendationsSection from "@/components/RecommendationSection";
import { useMapsApi } from "@/context/MapsContext";
import Image from "next/image";

export default function Home() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const { isLoaded, location } = useMapsApi();
    const recommendationsRef = useRef<HTMLElement>(null);

    const handleInterestClick = (interest: string) => {
        const isNewSelection = !selectedInterests.includes(interest);

        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        );

        // Scroll to recommendations section when adding a new interest
        if (isNewSelection && location && isLoaded && recommendationsRef.current) {
            recommendationsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="relative py-32">
                {/* Full background image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
                        alt="City background"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                </div>
                <div className="container">
                    <h1 className="mb-6 text-5xl font-bold text-white">Discover Your Next Adventure</h1>
                    <p className="mb-8 text-lg text-gray-200">
                        Find unique places, plan your journey, and create unforgettable memories.
                    </p>
                    <Link href="/places" className="inline-block">
                        <Button size="lg">Start Exploring</Button>
                    </Link>
                </div>
            </section>

            {/* Interests */}
            <section className="py-16">
                <div className="container">
                    <h2 className="mb-8 text-3xl font-bold">What are your interests?</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Interest cards remain the same */}
                        {[
                            { name: "Nature", types: ["Parks", "Natural Features", "Campgrounds"] },
                            { name: "Culture", types: ["Museums", "Art Galleries"] },
                            { name: "Adventure", types: ["Tourist Attractions", "Hiking Trails"] },
                            { name: "Food", types: ["Restaurants", "Bakeries", "Cafes"] },
                            { name: "History", types: ["Museums", "Points of Interest"] },
                            { name: "Relaxation", types: ["Spas", "Parks"] },
                        ].map((interest) => (
                            <Card
                                key={interest.name}
                                className={`cursor-pointer border-2 p-6 ${
                                    selectedInterests.includes(interest.name)
                                        ? "border-accent bg-accent-foreground text-background hover:bg-accent-foreground/90"
                                        : "border-transparent hover:bg-accent/50"
                                }`}
                                onClick={() => handleInterestClick(interest.name)}
                            >
                                <h3 className="mb-2 text-xl font-semibold">{interest.name}</h3>
                                <p className={`text-sm ${selectedInterests.includes(interest.name) ? "text-background/80" : "text-muted-foreground"}`}>
                                    {interest.types.join(", ")}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map */}
            {location && isLoaded && (
                <section className="py-8">
                    <div className="container">
                        <Map mapsApiLoaded={isLoaded} center={location} />
                    </div>
                </section>
            )}

            {/* Dynamic Recommendations with ref for scrolling */}
            {location && isLoaded && (
                <section ref={recommendationsRef} id="recommendations" className="py-8">
                    <RecommendationsSection
                        selectedInterests={selectedInterests}
                        location={location}
                        mapsApiLoaded={isLoaded}
                    />
                </section>
            )}
        </main>
    );
}