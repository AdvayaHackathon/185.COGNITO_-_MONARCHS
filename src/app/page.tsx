"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Map from "@/components/Map";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestClick = (interest: string) => {
      setSelectedInterests((prevInterests) =>
          prevInterests.includes(interest)
              ? prevInterests.filter((item) => item !== interest)
              : [...prevInterests, interest]
      );
  };

  return (
      <main className="min-h-screen">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/0 py-32">
              <div className="container">
                  <div className="max-w-2xl">
                      <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                          Discover Your Next Adventure
                      </h1>
                      <p className="mb-8 text-lg text-muted-foreground">
                          Find unique places, plan your journey, and create unforgettable memories.
                      </p>
                      <Link href="/places">
                          <Button size="lg" className="font-medium">
                              Start Exploring
                          </Button>
                      </Link>
                  </div>
              </div>
          </section>

          {/* Interests Section */}
          <section className="py-16">
              <div className="container">
                  <h2 className="mb-8 text-3xl font-bold">What are your interests?</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {["Nature", "Culture", "Adventure", "Food", "History", "Relaxation"].map((interest) => (
                          <Card
                              key={interest}
                              className={`cursor-pointer p-6 hover:bg-accent/50 ${
                                  selectedInterests.includes(interest) ? "border-2 border-accent bg-accent-foreground text-background" : ""
                              }`}
                              onClick={() => handleInterestClick(interest)}
                          >
                              <h3 className="text-xl font-semibold">{interest}</h3>
                          </Card>
                      ))}
                  </div>
              </div>
          </section>

          {/* Map Section */}
          {apiKey && (
              <section className="py-8">
                  <div className="container">
                      <h2 className="mb-4 text-2xl font-bold">Explore Nearby Gems</h2>
                      <Map apiKey={apiKey} interests={selectedInterests} />
                  </div>
              </section>
          )}

          {/* Recommendations Section */}
          <section className="bg-muted/50 py-16">
              <div className="container">
                  <h2 className="mb-8 text-3xl font-bold">Recommendations for you</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {[1, 2, 3].map((i) => (
                          <Card key={i} className="overflow-hidden">
                              <div className="aspect-video bg-muted"/>
                              <div className="p-6">
                                  <h3 className="mb-2 text-xl font-semibold">Amazing Place {i}</h3>
                                  <p className="text-muted-foreground">
                                      Discover this incredible location and start your journey today.
                                  </p>
                              </div>
                          </Card>
                      ))}
                  </div>
              </div>
          </section>
      </main>
  );
}