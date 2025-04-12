"use client";

import React, { useState, useEffect, useRef } from "react";
import PlaceCard from "@/components/PlaceCard";
import { Input } from "@/components/ui/input";
import { useLoadScript } from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

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

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function PlacesPage() {
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState(samplePlaces);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 500);
    const mapRef = useRef<HTMLDivElement>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries,
    });

    useEffect(() => {
        if (!isLoaded || !debouncedQuery.trim()) {
            setPlaces(samplePlaces);
            return;
        }

        const searchPlaces = () => {
            setIsLoading(true);

            const mapDiv = mapRef.current || document.createElement("div");
            const service = new google.maps.places.PlacesService(mapDiv);

            const request: google.maps.places.TextSearchRequest = {
                query: debouncedQuery,
            };

            service.textSearch(
                request,
                (
                    results: google.maps.places.PlaceResult[] | null,
                    status: google.maps.places.PlacesServiceStatus
                ) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        const formattedPlaces = results.map((place) => ({
                            id: place.place_id || String(Math.random()),
                            title: place.name || "Unnamed Place",
                            description: place.formatted_address || "No address available",
                            image: place.photos?.[0]?.getUrl({
                                maxWidth: 400,
                                maxHeight: 300
                            }) || "/images/placeholder.jpg",
                        }));
                        setPlaces(formattedPlaces);
                    } else {
                        console.error("Places API Error:", status);
                        const filteredPlaces = samplePlaces.filter(
                            (place) =>
                                place.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                                place.description.toLowerCase().includes(debouncedQuery.toLowerCase())
                        );
                        setPlaces(filteredPlaces);
                    }
                    setIsLoading(false);
                }
            );
        };

        searchPlaces();
    }, [debouncedQuery, isLoaded]);

    return (
        <main className="min-h-screen bg-background py-16">
            <div className="container mx-auto">
                <div className="relative mb-8">
                    <Input
                        className="flex-grow rounded-md bg-gray-800 text-white placeholder:text-gray-400"
                        placeholder="Search for hidden gems..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-purple-600" />
                        </div>
                    )}
                </div>

                <div ref={mapRef} style={{ display: "none" }} />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {places.map((place) => (
                        <PlaceCard
                            key={place.id}
                            image={place.image}
                            title={place.title}
                            description={place.description}
                        />
                    ))}
                    {places.length === 0 && !isLoading && (
                        <div className="col-span-full text-center text-gray-400 py-8">
                            No places found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}