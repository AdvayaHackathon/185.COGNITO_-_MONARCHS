"use client";

import { useEffect, useRef } from "react";

interface MapProps {
    mapsApiLoaded: boolean;
    center?: google.maps.LatLngLiteral;
    zoom?: number;
}

export default function Map({
                                mapsApiLoaded,
                                center = { lat: 28.6139, lng: 77.209 }, // Default to New Delhi
                                zoom = 12
                            }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (!mapsApiLoaded || !mapRef.current || mapInstanceRef.current) return;

        // Initialize map only when API is loaded
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
    }, [mapsApiLoaded, center, zoom]);

    // Clean up map instance on unmount
    useEffect(() => {
        return () => {
            mapInstanceRef.current = null;
        };
    }, []);

    return (
        <div className="h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
            <div ref={mapRef} className="h-full w-full" />
        </div>
    );
}