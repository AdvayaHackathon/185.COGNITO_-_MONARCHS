"use client";

import { useEffect, useState } from "react";
import PlaceCard from "@/components/PlaceCard";

interface Place {
    id: string;
    title: string;
    description: string;
    image: string;
    location: google.maps.LatLngLiteral;
}

interface Props {
    selectedInterests: string[];
    location: google.maps.LatLngLiteral;
    mapsApiLoaded: boolean;
}

const interestToTypes: Record<string, string[]> = {
    Nature: ["park", "natural_feature", "campground"],
    Culture: ["museum", "art_gallery"],
    Adventure: ["tourist_attraction", "hiking_trail"],
    Food: ["restaurant", "bakery", "cafe"],
    History: ["museum", "point_of_interest"],
    Relaxation: ["spa", "park"],
};

export default function RecommendationsSection({ selectedInterests, location, mapsApiLoaded }: Props) {
    const [recommended, setRecommended] = useState<Place[]>([]);

    useEffect(() => {
        if (!mapsApiLoaded || selectedInterests.length === 0) return;

        const map = new google.maps.Map(document.createElement("div"));
        const service = new google.maps.places.PlacesService(map);

        const types = selectedInterests.flatMap((interest) => interestToTypes[interest] || []);
        const uniqueTypes = Array.from(new Set(types));

        const allResults: Place[] = [];

        Promise.all(
            uniqueTypes.map((type) => {
                const request: google.maps.places.PlaceSearchRequest = {
                    location,
                    radius: 10000,
                    type,
                };

                return new Promise<void>((resolve) => {
                    service.nearbySearch(request, (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                            const places = results
                                .filter((p) => (p.rating ?? 0) >= 4 && (p.user_ratings_total ?? 0) > 10)
                                .map((p) => ({
                                    id: p.place_id!,
                                    title: p.name ?? "Unnamed Place",
                                    description: p.vicinity ?? "",
                                    image: p.photos?.[0]?.getUrl({ maxWidth: 400 }) ?? "/placeholder.jpg",
                                    location: {
                                        lat: p.geometry?.location?.lat() ?? 0,
                                        lng: p.geometry?.location?.lng() ?? 0,
                                    },
                                }));

                            allResults.push(...places);
                        }
                        resolve();
                    });
                });
            })
        ).then(() => {
            setRecommended(allResults.slice(0, 6));
        });
    }, [selectedInterests, location, mapsApiLoaded]);

    return (
        <section className="bg-muted/50 py-16">
            <div className="container">
                <h2 className="mb-8 text-3xl font-bold">Recommendations for you</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recommended.map((place) => (
                        <PlaceCard
                            key={place.id}
                            image={place.image}
                            title={place.title}
                            description={place.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}