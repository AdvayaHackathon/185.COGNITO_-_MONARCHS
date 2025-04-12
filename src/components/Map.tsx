"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px', // Adjust as needed
};

const defaultCenter = {
    lat: 12.9716,
    lng: 77.5946,
};

interface MapProps {
    apiKey: string | undefined;
    interests: string[];
}

interface GemData {
    place_id: string;
    name: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    rating?: number;
    user_ratings_total?: number;
    vicinity?: string;
    photoUrl?: string;
}


const Map: React.FC<MapProps> = ({ apiKey, interests }) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [gemRecommendations, setGemRecommendations] = useState<GemData[]>([]);
    const [selectedGem, setSelectedGem] = useState<GemData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState<Error | undefined>(undefined);

    const onLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    useEffect(() => {
        if (apiKey) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => setIsLoaded(true);
            script.onerror = () => setLoadError(new Error('Failed to load Google Maps API'));
            document.head.appendChild(script);
        }
    }, [apiKey]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentLocation(userLocation);
                    map?.panTo(userLocation);
                },
                (error) => {
                    console.error('Error getting current location:', error);
                    setCurrentLocation(defaultCenter);
                    map?.panTo(defaultCenter);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
            setCurrentLocation(defaultCenter);
            map?.panTo(defaultCenter);
        }
    }, [map]);

    useEffect(() => {
        if (isLoaded && currentLocation && apiKey && interests.length > 0) {
            const service = new google.maps.places.PlacesService(map as google.maps.Map);
            const request = {
                location: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
                radius: 5000, // Adjust radius as needed (in meters)
                query: interests.join(" OR "), // Search for places matching any of the selected interests
            };

            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    const filteredResults = results
                        .filter((place) => place.user_ratings_total && place.user_ratings_total >= 1500)
                        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                        .slice(0, 10);

                    const getPhotoUrl = (photo: google.maps.places.PlacePhoto) => {
                        return photo.getUrl({ maxWidth: 400, maxHeight: 300 });
                    };

                    const formattedGems: GemData[] = filteredResults.map((place) => {
                        const photoUrl = place.photos && place.photos.length > 0
                            ? getPhotoUrl(place.photos[0])
                            : "/placeholder-image.jpg"; // fallback image in case no photo available

                        return {
                            place_id: place.place_id!,
                            name: place.name!,
                            geometry: {
                                location: {
                                    lat: place.geometry?.location?.lat() ?? 0,
                                    lng: place.geometry?.location?.lng() ?? 0,
                                },
                            },
                            rating: place.rating,
                            user_ratings_total: place.user_ratings_total,
                            vicinity: place.vicinity,
                            photoUrl, // new field for your card display
                        };
                    });


                    setGemRecommendations(formattedGems);
                } else {
                    console.error("Places API search failed:", status);
                }
            });
        } else if (isLoaded && currentLocation && apiKey && interests.length === 0) {
            setGemRecommendations([]);
        }
    }, [isLoaded, currentLocation, apiKey, interests, map]);

    const handleMarkerClick = (gem: GemData) => {
        setSelectedGem(gem);
    };

    const handleInfoWindowClose = () => {
        setSelectedGem(null);
    };

    if (loadError) {
        return <div>Error loading maps.</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation || defaultCenter}
            zoom={14} // Adjust zoom level
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {gemRecommendations.map((gem) => (
                <Marker
                    key={gem.place_id}
                    position={gem.geometry.location}
                    onClick={() => handleMarkerClick(gem)}
                >
                    {selectedGem?.place_id === gem.place_id && (
                        <InfoWindow onCloseClick={handleInfoWindowClose}>
                            <div>
                                <h3>{selectedGem.name}</h3>
                                {selectedGem.rating && <p>Rating: {selectedGem.rating} ({selectedGem.user_ratings_total || 0} reviews)</p>}
                                {selectedGem.vicinity && <p>{selectedGem.vicinity}</p>}
                                {/* Add more details as needed */}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
            {currentLocation && (
                <Marker position={currentLocation} title="Your Location" icon={{ url: "/user-location-marker.png", scaledSize: new google.maps.Size(30, 30) }} />
            )}
        </GoogleMap>
    );
};

export default Map;