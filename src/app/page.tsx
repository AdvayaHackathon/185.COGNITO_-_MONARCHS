"use client";

import { useEffect, useState } from "react";
import Map from "@/components/Map";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RecommendationsSection from "@/components/RecommendationSection";
import { loadGoogleMapsApi } from "@/utils/maps-loader";

export default function Home() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [apiLoaded, setApiLoaded] = useState(false);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
        loadGoogleMapsApi(apiKey).then(() => {
            setApiLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (apiLoaded && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                },
                () => {
                    setLocation({ lat: 28.6139, lng: 77.209 }); // fallback: New Delhi
                }
            );
        }
    }, [apiLoaded]);

    const handleInterestClick = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        );
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/0 py-32">
                <div className="container">
                    <h1 className="mb-6 text-5xl font-bold">Discover Your Next Adventure</h1>
                    <p className="mb-8 text-lg text-muted-foreground">
                        Find unique places, plan your journey, and create unforgettable memories.
                    </p>
                    <Link href="/places">
                        <Button size="lg">Start Exploring</Button>
                    </Link>
                </div>
            </section>

            {/* Interests */}
            <section className="py-16">
                <div className="container">
                    <h2 className="mb-8 text-3xl font-bold">What are your interests?</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                className={`cursor-pointer p-6 hover:bg-accent/50 ${
                                    selectedInterests.includes(interest.name)
                                        ? "border-2 border-accent bg-accent-foreground text-background"
                                        : ""
                                }`}
                                onClick={() => handleInterestClick(interest.name)}
                            >
                                <h3 className="mb-2 text-xl font-semibold">{interest.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {interest.types.join(", ")}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map */}
            {location && apiLoaded && (
                <section className="py-8">
                    <div className="container">
                        <Map mapsApiLoaded={apiLoaded} center={location} />
                    </div>
                </section>
            )}

            {/* Dynamic Recommendations */}
            {location && apiLoaded && (
                <RecommendationsSection
                    selectedInterests={selectedInterests}
                    location={location}
                    mapsApiLoaded={apiLoaded}
                />
            )}
        </main>
    );
}