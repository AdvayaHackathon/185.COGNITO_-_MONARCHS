// Extend Window interface to include the initMap property
declare global {
    interface Window {
        initMap?: () => void;
    }
}

let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export function loadGoogleMapsApi(apiKey: string): Promise<void> {
    if (isLoaded) return Promise.resolve();

    if (loadPromise) return loadPromise;

    loadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        window.initMap = () => {
            isLoaded = true;
            resolve();
            delete window.initMap;
        };

        script.onerror = reject;
        script.src += '&callback=initMap';
        document.head.appendChild(script);
    });

    return loadPromise;
}