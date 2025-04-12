"use client";

import React, { useState, useEffect, useRef } from "react";
import PlaceCard from "@/components/PlaceCard";
import { Input } from "@/components/ui/input";
import { useLoadScript } from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

const HIDDEN_GEM_TYPES = [
    "restaurant",
    "cafe",
    "bar",
    "art_gallery",
    "museum",
    "park",
    "book_store",
    "bakery"
] as const;

const HIDDEN_GEM_KEYWORDS = [
    "local favorite",
    "hidden gem",
    "unique",
    "authentic",
    "independent",
    "family owned",
    "neighborhood",
    "off the beaten path"
].join(" OR ");

const fallbackPlaces = [
    {
        id: "loading",
        title: "Loading places...",
        description: "Discovering hidden gems near you",
        image: "/images/placeholder.jpg",
    },
];

export default function PlacesPage() {
    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState(fallbackPlaces);
    const [filteredPlaces, setFilteredPlaces] = useState(fallbackPlaces);
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (!isLoaded || !userLocation) return;

        const getNearbyPlaces = async () => {
            setIsLoading(true);

            const mapDiv = mapRef.current || document.createElement("div");
            const service = new google.maps.places.PlacesService(mapDiv);

            const searchPromises = HIDDEN_GEM_TYPES.map(type => {
                return new Promise<google.maps.places.PlaceResult[]>((resolve) => {
                    const request: google.maps.places.PlaceSearchRequest = {
                        location: userLocation,
                        radius: 8000,
                        type: type,
                        keyword: query || HIDDEN_GEM_KEYWORDS, // Use search query if present
                        openNow: true
                    };

                    service.nearbySearch(request, (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                            resolve(results);
                        } else {
                            resolve([]);
                        }
                    });
                });
            });

            try {
                const allResults = await Promise.all(searchPromises);
                const combinedResults = allResults.flat();

                const hiddenGems = combinedResults
                    .filter(place =>
                        place.rating &&
                        place.rating >= 4.0 &&
                        place.user_ratings_total &&
                        place.user_ratings_total < 500 &&
                        place.price_level &&
                        place.price_level <= 3
                    )
                    .sort((a, b) => {
                        const scoreA = (a.rating || 0) * Math.log1p(a.user_ratings_total || 1);
                        const scoreB = (b.rating || 0) * Math.log1p(b.user_ratings_total || 1);
                        return scoreB - scoreA;
                    })
                    .filter((place, index, self) =>
                        index === self.findIndex(p => p.place_id === place.place_id)
                    )
                    .slice(0, 6)
                    .map((place) => ({
                        id: place.place_id || String(Math.random()),
                        title: place.name || "Unnamed Place",
                        description: `${place.rating}★ (${place.user_ratings_total} reviews) · ${
                            Array(place.price_level).fill('$').join('')
                        } · ${place.vicinity || "No address available"}`,
                        image: place.photos?.[0]?.getUrl({
                            maxWidth: 400,
                            maxHeight: 300
                        }) || "/images/placeholder.jpg",
                    }));

                setPlaces(hiddenGems);
                setFilteredPlaces(hiddenGems);
            } catch (error) {
                console.error('Error fetching places:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getNearbyPlaces();
    }, [isLoaded, userLocation, query]); // Added query to dependencies

    useEffect(() => {
        const filtered = places.filter((place) =>
            place.title.toLowerCase().includes(query.toLowerCase()) ||
            place.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPlaces(filtered);
    }, [query, places]);

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
                    {filteredPlaces.map((place) => (
                        <PlaceCard
                            key={place.id}
                            id={place.id}
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