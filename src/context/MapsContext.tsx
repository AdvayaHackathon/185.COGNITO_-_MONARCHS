"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadGoogleMapsApi } from '@/utils/maps-loader';

interface MapsContextType {
    isLoaded: boolean;
    location: google.maps.LatLngLiteral | null;
}

const MapsContext = createContext<MapsContextType>({
    isLoaded: false,
    location: null
});

export function MapsProvider({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
        loadGoogleMapsApi(apiKey).then(() => {
            setIsLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (isLoaded && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                },
                () => {
                    setLocation({ lat: 28.6139, lng: 77.209 });
                }
            );
        }
    }, [isLoaded]);

    return (
        <MapsContext.Provider value={{ isLoaded, location }}>
            {children}
        </MapsContext.Provider>
    );
}

export const useMapsApi = () => useContext(MapsContext);