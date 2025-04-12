// app/places/page.tsx
"use client";

import React, { useState } from "react";
import PlaceCard from "@/components/PlaceCard";
import {Input} from "@/components/ui/input";
import {fetchPlacesFromAPI} from "@/lib/api";

// Sample data – in practice, you would fetch this data based on the user’s search query.
const samplePlaces = [
    {
        id: "1",
        title: "Hidden Alley Cafe",
        description: "Cozy cafe tucked away in an artistic neighborhood.",
        image: "/images/cafe.jpg",
    },
    {
        id: "2",
        title: "Secret Graffiti Spot",
        description: "A vibrant wall of street art in an off‑the‑beaten‑path locale.",
        image: "/images/graffiti.jpg",
    },
    {
        id: "3",
        title: "Local Artisan Workshop",
        description: "Discover unique handcrafted items and meet local artisans.",
        image: "/images/artisan.jpg",
    },
];

export default function PlacesPage() {
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState(samplePlaces);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Searching for:", query);

        const fetchedPlaces = await fetchPlacesFromAPI(query); // Imagine this returns an array of places

        setPlaces(fetchedPlaces);
    };

    return (
        <main className="min-h-screen bg-background py-16">
            <div className="container mx-auto">
                <form
                    className="mb-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-4"
                    onSubmit={handleSearch}
                >
                    <Input
                        className="flex-grow rounded-md bg-gray-800 text-white placeholder:text-gray-400 sm:rounded-r-none"
                        placeholder="Search for hidden gems..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 font-semibold text-white shadow transition-all duration-200 hover:brightness-110 sm:rounded-l-none"
                    >
                        Search
                    </button>
                </form>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {places.map((place) => (
                        <PlaceCard
                            key={place.id}
                            image={place.image}
                            title={place.title}
                            description={place.description}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
