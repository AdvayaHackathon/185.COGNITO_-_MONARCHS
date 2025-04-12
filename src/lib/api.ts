// lib/api.ts

export interface Place {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface GooglePlaceResult {
    place_id: string;
    name: string;
    formatted_address: string;
    photos?: { photo_reference: string }[];
}

export async function fetchPlacesFromAPI(query: string): Promise<Place[]> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
    )}&key=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "OK") {
            console.error("Google Places API error:", data.status);
            return [];
        }

        return data.results.slice(0, 10).map((place: GooglePlaceResult) => ({
            id: place.place_id,
            title: place.name,
            description: place.formatted_address,
            image:
                place.photos && place.photos.length > 0
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                    : "/placeholder-image.jpg",
        }));
    } catch (error) {
        console.error("Error fetching places:", error);
        return [];
    }
}
